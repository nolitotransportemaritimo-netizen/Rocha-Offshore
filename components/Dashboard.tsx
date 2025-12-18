
import React from 'react';
import { UserProfile, RotationType } from '../types';

interface DashboardProps {
  profile: UserProfile;
  rotation: RotationType;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, rotation }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600">
            <i className="fas fa-calendar-check text-2xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Current Rotation</p>
            <p className="text-xl font-bold text-slate-900">{rotation}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-emerald-100 p-4 rounded-xl text-emerald-600">
            <i className="fas fa-anchor text-2xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Sea Time</p>
            <p className="text-xl font-bold text-slate-900">{profile.totalSeaTimeMonths} Months</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="bg-amber-100 p-4 rounded-xl text-amber-600">
            <i className="fas fa-certificate text-2xl"></i>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Certs Active</p>
            <p className="text-xl font-bold text-slate-900">{profile.certifications.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <i className="fas fa-history mr-3 text-blue-500"></i>
            Schedule Status
          </h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Current Hitch
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  75% Complete
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
              <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Next Disembarkation</span>
              <span className="font-bold text-slate-800">Oct 30, 2023</span>
            </div>
            <div className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Next Mobilization</span>
              <span className="font-bold text-slate-800">Nov 14, 2023</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <i className="fas fa-briefcase mr-3 text-purple-500"></i>
            Suggested for You
          </h2>
          <div className="space-y-4">
            <div className="group border border-slate-100 hover:border-blue-200 hover:bg-blue-50 p-4 rounded-xl transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-blue-700">Master Mariner</h3>
                  <p className="text-xs text-slate-500">Global Energy Fleet • Tanker</p>
                </div>
                <span className="bg-white px-2 py-1 rounded border text-[10px] font-bold text-blue-600">95% Match</span>
              </div>
            </div>
            <div className="group border border-slate-100 hover:border-blue-200 hover:bg-blue-50 p-4 rounded-xl transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-blue-700">Captain (Relief)</h3>
                  <p className="text-xs text-slate-500">Polar Expeditions • Research</p>
                </div>
                <span className="bg-white px-2 py-1 rounded border text-[10px] font-bold text-blue-600">82% Match</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 text-sm text-blue-600 font-semibold hover:underline">
            View All Vacancies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
