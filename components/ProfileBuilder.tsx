
import React, { useState } from 'react';
import { UserProfile, MaritimeRank } from '../types';
import { COMMON_CERTIFICATIONS, VESSEL_TYPES } from '../constants';
import { geminiService } from '../services/geminiService';

interface ProfileBuilderProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ProfileBuilder: React.FC<ProfileBuilderProps> = ({ profile, setProfile }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleCert = (cert: string) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  const handleAISummary = async () => {
    setIsGenerating(true);
    const summary = await geminiService.generateResumeSummary(profile);
    setProfile(prev => ({ ...prev, bio: summary }));
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-slate-900 h-32 relative">
          <div className="absolute -bottom-12 left-8 h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
            <div className="h-full w-full rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-black border border-blue-200">
              {profile.name.charAt(0)}
            </div>
          </div>
        </div>
        
        <div className="pt-16 px-8 pb-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Primary Rank</label>
              <select 
                value={profile.rank}
                onChange={(e) => setProfile({...profile, rank: e.target.value as MaritimeRank})}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              >
                {Object.values(MaritimeRank).map(rank => <option key={rank} value={rank}>{rank}</option>)}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-700">Professional Summary</label>
              <button 
                onClick={handleAISummary}
                disabled={isGenerating}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center disabled:opacity-50"
              >
                <i className={`fas fa-magic mr-1 ${isGenerating ? 'animate-spin' : ''}`}></i>
                Improve with AI
              </button>
            </div>
            <textarea 
              rows={4}
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              placeholder="Tell us about your sea service..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Certifications & Tickets</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_CERTIFICATIONS.map(cert => (
                <button
                  key={cert}
                  onClick={() => toggleCert(cert)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                    profile.certifications.includes(cert)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {cert}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Total Sea Experience (Months)</label>
              <input 
                type="number" 
                value={profile.totalSeaTimeMonths}
                onChange={(e) => setProfile({...profile, totalSeaTimeMonths: parseInt(e.target.value) || 0})}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Availability Date</label>
              <input 
                type="date" 
                value={profile.availabilityDate}
                onChange={(e) => setProfile({...profile, availabilityDate: e.target.value})}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
              Save Professional Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBuilder;
