'use client'

import React, { useState } from 'react';
import UserManagement from './components/Usermanagement';
import CourseManagement from './components/CourseManagement';
import SystemActivity from './components/SystemActivity';
import { SparklesCore } from "@/components/sparkles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      className="p-6"
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <main className="min-h-screen bg-black antialiased">
      {/* Background effects */}
      <div className="h-full w-full absolute inset-0 bg-grid-white/[0.02]">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <div className="flex space-x-1 p-4 border-b border-zinc-800">
          {['User Management', 'Course Management', 'System Activity'].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setTabValue(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${tabValue === index 
                  ? 'bg-white/10 text-white' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4">
          {tabValue === 0 && <UserManagement />}
          {tabValue === 1 && <CourseManagement />}
          {tabValue === 2 && <SystemActivity />}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
