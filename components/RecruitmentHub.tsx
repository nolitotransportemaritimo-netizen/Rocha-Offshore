
import React, { useState } from 'react';
import { JobVacancy, UserProfile } from '../types';
import { MOCK_JOBS } from '../constants';
import { geminiService } from '../services/geminiService';

interface RecruitmentHubProps {
  profile: UserProfile;
}

const RecruitmentHub: React.FC<RecruitmentHubProps> = ({ profile }) => {
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (job: JobVacancy) => {
    setSelectedJob(job);
    setIsAnalyzing(true);
    const result = await geminiService.analyzeProfileMatch(profile, job);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="lg:col-span-1 space-y-4">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Live Vacancies</h2>
            <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-1 rounded-full">{MOCK_JOBS.length} New</span>
          </div>
          
          <div className="space-y-4">
            {MOCK_JOBS.map((job) => (
              <div 
                key={job.id}
                onClick={() => handleAnalyze(job)}
                className={`p-4 rounded-2xl cursor-pointer border-2 transition-all ${
                  selectedJob?.id === job.id 
                  ? 'bg-white border-blue-500 shadow-md ring-4 ring-blue-50' 
                  : 'bg-slate-50 border-transparent hover:border-slate-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-800 leading-tight">{job.title}</h3>
                  <span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 uppercase font-black">
                    {job.rotation}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">{job.companyName} • {job.vesselType}</p>
                <div className="flex items-center text-[10px] text-slate-400 font-bold space-x-3">
                  <span><i className="fas fa-map-marker-alt mr-1"></i>{job.location}</span>
                  <span><i className="fas fa-clock mr-1"></i>{job.postedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedJob ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-8 min-h-[600px] animate-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
              <div>
                <h2 className="text-3xl font-black text-slate-900">{selectedJob.title}</h2>
                <p className="text-blue-600 font-bold text-lg">{selectedJob.companyName}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-700">{selectedJob.rotation} Rotation</span>
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-700">{selectedJob.salary}</span>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all transform active:scale-95 shadow-lg shadow-blue-200">
                Apply Now
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <section>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedJob.description}</p>
                </section>
                <section>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-600">
                        <i className="fas fa-check-circle text-blue-500 mr-2"></i>
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h4 className="text-sm font-black text-slate-800 mb-4 flex items-center">
                  <i className="fas fa-robot mr-2 text-blue-500"></i>
                  AI Match Analysis
                </h4>
                
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-xs text-slate-500 font-bold animate-pulse">Consulting Crew Data...</p>
                  </div>
                ) : analysis ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center p-4 bg-white rounded-xl border border-slate-200">
                      <div className="text-center">
                        <div className="text-4xl font-black text-blue-600">{analysis.matchScore}%</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Match Score</div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Strengths</p>
                      <div className="space-y-1">
                        {analysis.strengths.map((s: string, i: number) => (
                          <div key={i} className="text-xs text-emerald-700 font-medium flex items-center">
                            <i className="fas fa-plus-circle mr-2 opacity-50"></i> {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {analysis.missingRequirements.length > 0 && (
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Gaps to fill</p>
                        <div className="space-y-1">
                          {analysis.missingRequirements.map((m: string, i: number) => (
                            <div key={i} className="text-xs text-amber-700 font-medium flex items-center">
                              <i className="fas fa-exclamation-triangle mr-2 opacity-50"></i> {m}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <button 
                      onClick={() => handleAnalyze(selectedJob)}
                      className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-all"
                    >
                      Run AI Analysis
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center min-h-[600px] text-slate-400">
            <i className="fas fa-anchor text-5xl mb-4 opacity-20"></i>
            <p className="font-bold">Select a vacancy to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruitmentHub;
