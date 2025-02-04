'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Activity {
  id: string;
  user: {
    username: string;
  };
  action: string;
  details?: string;
  createdAt: string;
}

const SystemActivity = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get('/api/admin', {
        params: { type: 'activities' }
      });
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-800 overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-semibold text-white">System Activity</h2>
      </div>
      <table className="w-full">
        <thead className="bg-zinc-900/50">
          <tr>
            <th className="px-4 py-3 text-left text-sm text-zinc-400">User</th>
            <th className="px-4 py-3 text-left text-sm text-zinc-400">Action</th>
            <th className="px-4 py-3 text-left text-sm text-zinc-400">Details</th>
            <th className="px-4 py-3 text-left text-sm text-zinc-400">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="px-4 py-3 text-center text-zinc-400">
                Loading activities...
              </td>
            </tr>
          ) : activities.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-3 text-center text-zinc-400">
                No activities found
              </td>
            </tr>
          ) : (
            activities.map((activity) => (
              <tr key={activity.id} className="border-t border-zinc-800">
                <td className="px-4 py-3 text-sm text-zinc-300">{activity.user.username}</td>
                <td className="px-4 py-3 text-sm text-zinc-300">{activity.action}</td>
                <td className="px-4 py-3 text-sm text-zinc-300">{activity.details}</td>
                <td className="px-4 py-3 text-sm text-zinc-300">
                  {new Date(activity.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SystemActivity;

