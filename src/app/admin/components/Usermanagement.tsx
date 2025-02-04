'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  createdAt: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    name: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching users...');
      
      const response = await axios.get('/api/admin', {
        params: { type: 'users' }
      });
      
      console.log('Response data:', response.data);

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data.message) {
        // Handle error message
        toast.error(response.data.message);
      } else {
        console.error('Invalid response format:', response.data);
        toast.error('Invalid data format received');
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.post("/api/admin", {
        type: 'user',
        username: newUser.username.trim(),
        email: newUser.email.trim(),
        password: newUser.password,
        role: newUser.role,
        name: newUser.name.trim()
      });

      await fetchUsers();
      setShowModal(false);
      setNewUser({ username: '', email: '', password: '', role: '', name: '' });
      toast.success("User created successfully");
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/admin?type=user&id=${userId}`);
      await fetchUsers();
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <>
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-white">Users</h2>
          <Button 
            onClick={() => setShowModal(true)}
            className="bg-white/10 hover:bg-white/20 text-white"
          >
            Add New User
          </Button>
        </div>
        <div className="overflow-x-auto">
          {isFetching ? (
            <div className="p-4 text-center text-zinc-400">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-4 text-center text-zinc-400">No users found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-zinc-900/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm text-zinc-400">Name</th>
                  <th className="px-4 py-3 text-left text-sm text-zinc-400">Username</th>
                  <th className="px-4 py-3 text-left text-sm text-zinc-400">Email</th>
                  <th className="px-4 py-3 text-left text-sm text-zinc-400">Role</th>
                  <th className="px-4 py-3 text-left text-sm text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-zinc-800">
                    <td className="px-4 py-3 text-sm text-zinc-300">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-zinc-300">{user.username}</td>
                    <td className="px-4 py-3 text-sm text-zinc-300">{user.email}</td>
                    <td className="px-4 py-3 text-sm text-zinc-300">{user.role}</td>
                    <td className="px-4 py-3">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-zinc-900 rounded-lg shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Add New User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-zinc-400">Full Name</label>
                      <Input
                        placeholder="Enter full name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-zinc-400">Username</label>
                      <Input
                        placeholder="Enter username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-400">Email</label>
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-400">Password</label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500"
                      disabled={isLoading}
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-400">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full rounded-md bg-zinc-800/50 border border-zinc-700 px-3 py-2 text-white placeholder:text-zinc-500"
                      disabled={isLoading}
                      required
                    >
                      <option value="" className="bg-zinc-900">Select role</option>
                      <option value="ADMIN" className="bg-zinc-900">Admin</option>
                      <option value="TEACHER" className="bg-zinc-900">Teacher</option>
                      <option value="STUDENT" className="bg-zinc-900">Student</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-zinc-800">
                    <Button
                      type="button"
                      onClick={() => setShowModal(false)}
                      variant="outline"
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-white/10 hover:bg-white/20 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 border-2 border-white/30 border-t-white/90 rounded-full animate-spin" />
                          Creating...
                        </span>
                      ) : (
                        "Add User"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagement;
