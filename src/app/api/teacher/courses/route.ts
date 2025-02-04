import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { z } from 'zod'

// Validation schema
const CourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
})

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    // Debug session
    console.log('Session:', session)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized - No user ID' },
        { status: 401 }
      )
    }

    // Debug teacher creation
    let teacher = await db.teacher.findFirst({
      where: { userId: session.user.id }
    })
    
    console.log('Existing teacher:', teacher)

    if (!teacher) {
      teacher = await db.teacher.create({
        data: {
          userId: session.user.id,
          name: session.user.name || '',
        }
      })
      console.log('Created teacher:', teacher)
    }

    const body = await request.json()
    console.log('Request body:', body)

    const validatedData = CourseSchema.parse(body)
    console.log('Validated data:', validatedData)

    const course = await db.course.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        teacherId: teacher.id,
      }
    })

    console.log('Created course:', course)
    return NextResponse.json(course, { status: 201 })

  } catch (error) {
    console.error('Detailed error:', error)
    return NextResponse.json(
      { error: 'Failed to create course', details: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    let teacher = await db.teacher.findFirst({
      where: { userId: session.user.id }
    })

    if (!teacher) {
      teacher = await db.teacher.create({
        data: {
          userId: session.user.id,
          name: session.user.name || '',
        }
      })
    }

    const courses = await db.course.findMany({
      where: {
        teacherId: teacher.id,
        deletedAt: null,
      },
      include: {
        enrollments: {
          include: {
            student: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(courses)

  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}
