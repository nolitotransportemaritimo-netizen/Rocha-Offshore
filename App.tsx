
import React, { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Scheduler from './components/Scheduler';
import ProfileBuilder from './components/ProfileBuilder';
import RecruitmentHub from './components/RecruitmentHub';
import { UserProfile, MaritimeRank, RotationType } from './types';

const INITIAL_PROFILE: UserProfile = {
  name: 'Capt. James Morgan',
  email: 'j.morgan@oceanic.com',
  rank: MaritimeRank.CAPTAIN,
  certifications: ['STCW Basic Safety', 'Medical Care', 'GMDSS'],
  totalSeaTimeMonths: 120,
  vesselTypes: ['Oil Tanker', 'Container Ship'],
  bio: 'Dedicated Master Mariner with over 10 years of experience in global commercial shipping.',
  availabilityDate: new Date().toISOString().split('T')[0]
};

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'fa-chart-line' },
    { path: '/scheduler', label: 'Schedule', icon: 'fa-calendar-alt' },
    { path: '/recruitment', label: 'Job Board', icon: 'fa-anchor' },
    { path: '/profile', label: 'My Profile', icon: 'fa-id-card' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:top-0 lg:bottom-auto lg:h-screen lg:w-64 bg-slate-900 text-white z-50 transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="hidden lg:flex p-6 items-center space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <i className="fas fa-ship text-2xl"></i>
          </div>
          <span className="text-xl font-bold tracking-tight">SeaShift</span>
        </div>
        
        <div className="flex lg:flex-col lg:mt-8 justify-around lg:justify-start flex-1 overflow-x-auto lg:overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col lg:flex-row items-center p-3 lg:px-6 lg:py-4 transition-colors relative group
                  ${isActive ? 'text-blue-400 bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 hidden lg:block"></div>
                )}
                <i className={`fas ${item.icon} text-lg lg:mr-4`}></i>
                <span className="text-[10px] lg:text-base font-medium mt-1 lg:mt-0">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [rotation, setRotation] = useState<RotationType>(RotationType.FOURTEEN_FOURTEEN);

  return (
    <MemoryRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
        <Navigation />
        
        <main className="flex-1 pb-24 lg:pb-0 lg:pl-64 transition-all duration-300">
          <header className="sticky top-0 glass border-b border-slate-200 px-6 py-4 flex justify-between items-center z-40">
            <div>
              <h1 className="text-lg font-bold text-slate-800">Maritime Crew Portal</h1>
              <p className="text-xs text-slate-500">Welcome back, {profile.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
                <i className="far fa-bell text-xl"></i>
              </button>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                <span className="text-blue-700 font-bold">JM</span>
              </div>
            </div>
          </header>

          <div className="p-6 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard profile={profile} rotation={rotation} />} />
              <Route path="/scheduler" element={<Scheduler rotation={rotation} onRotationChange={setRotation} />} />
              <Route path="/recruitment" element={<RecruitmentHub profile={profile} />} />
              <Route path="/profile" element={<ProfileBuilder profile={profile} setProfile={setProfile} />} />
            </Routes>
          </div>
        </main>
      </div>
    </MemoryRouter>
  );
};

export default App;
