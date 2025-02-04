import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

let isConnected = false;

async function connectDB() {
  try {
    if (!isConnected) {
      await db.$connect();
      isConnected = true;
    }
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection failed');
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    
    if (type === 'users') {
      try {
        const users = await db.user.findMany({
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            roleId: true
          },
          where: {
            deletedAt: null
          }
        });

        const roles = await db.role.findMany({
          select: {
            id: true,
            name: true
          }
        });

        const roleMap = new Map(roles.map(role => [role.id, role.name]));

        const formattedUsers = users.map(user => ({
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.username,
          role: roleMap.get(user.roleId) || 'Unknown',
          createdAt: user.createdAt.toISOString()
        }));

        console.log('Users fetched successfully:', formattedUsers.length);
        return NextResponse.json(formattedUsers);

      } catch (error) {
        console.error('Database query error:', error);
        return NextResponse.json(
          { message: "Database query failed", error: error instanceof Error ? error.message : 'Unknown error' },
          { status: 500 }
        );
      }
    }

    if (type === 'teachers') {
      try {
        const teachers = await db.user.findMany({
          where: {
            deletedAt: null,
            role: {
              name: 'TEACHER'
            }
          },
          select: {
            id: true,
            username: true,
            email: true,
            teacher: {
              select: {
                name: true
              }
            }
          }
        });

        const formattedTeachers = teachers.map(user => ({
          id: user.id,
          name: user.teacher?.name || user.username,
          email: user.email,
          username: user.username
        }));

        return NextResponse.json(formattedTeachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
        return NextResponse.json(
          { message: "Failed to fetch teachers" },
          { status: 500 }
        );
      }
    }

    if (type === 'courses') {
      const courses = await db.course.findMany({
        where: {
          deletedAt: null
        },
        include: {
          teacher: {
            include: {
              user: true
            }
          }
        }
      });

      return NextResponse.json(courses);
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, ...data } = body;

    if (type === 'user') {
      const { username, email, password, role, name } = data;

      const roleRecord = await db.role.findFirst({
        where: { name: role }
      });

      if (!roleRecord) {
        return NextResponse.json(
          { message: `Role not found: ${role}` }, 
          { status: 400 }
        );
      }

      const hashedPassword = await hash(password, 10);

      const user = await db.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            roleId: roleRecord.id,
          },
        });

        switch (role) {
          case 'ADMIN':
            await tx.admin.create({
              data: { userId: newUser.id, name }
            });
            break;
          case 'TEACHER':
            await tx.teacher.create({
              data: { userId: newUser.id, name }
            });
            break;
          case 'STUDENT':
            await tx.student.create({
              data: { userId: newUser.id, name }
            });
            break;
        }

        return newUser;
      });

      const createdUser = await db.user.findUnique({
        where: { id: user.id },
        include: {
          role: true,
          admin: true,
          teacher: true,
          student: true
        }
      });

      if (!createdUser) {
        throw new Error("Failed to fetch created user");
      }

      const formattedUser = {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        name: createdUser.admin?.name || createdUser.teacher?.name || createdUser.student?.name || name,
        role: createdUser.role.name,
        createdAt: createdUser.createdAt.toISOString()
      };

      return NextResponse.json(formattedUser);
    }

    if (type === 'course') {
      const course = await db.course.create({
        data: {
          title: data.title,
          description: data.description,
          teacherId: data.teacherId
        },
        include: {
          teacher: {
            include: {
              user: true
            }
          }
        }
      });

      return NextResponse.json(course);
    }

    return NextResponse.json({ message: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    console.error("[POST] Error:", error);
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: "Email or username already exists" }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: error.message || "Failed to create user" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (type === 'user' && id) {
      await db.user.update({
        where: { id },
        data: { deletedAt: new Date() }
      });
      return NextResponse.json({ message: "User deleted successfully" });
    }

    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("[DELETE]", error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
}
