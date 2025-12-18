
import React, { useState, useMemo } from 'react';
import { RotationType, ScheduleEvent } from '../types';

interface SchedulerProps {
  rotation: RotationType;
  onRotationChange: (rot: RotationType) => void;
}

const Scheduler: React.FC<SchedulerProps> = ({ rotation, onRotationChange }) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduleEvents = useMemo(() => {
    const events: ScheduleEvent[] = [];
    const start = new Date(startDate);
    const daysInCycle = rotation === RotationType.SEVEN_SEVEN ? 7 : 
                       rotation === RotationType.FOURTEEN_FOURTEEN ? 14 : 28;

    // Generate 4 cycles (8 blocks)
    for (let cycle = 0; cycle < 4; cycle++) {
      const onStart = new Date(start);
      onStart.setDate(start.getDate() + (cycle * daysInCycle * 2));
      
      const offStart = new Date(onStart);
      offStart.setDate(onStart.getDate() + daysInCycle);

      events.push({
        id: `on-${cycle}`,
        date: onStart.toISOString().split('T')[0],
        type: 'ON'
      });
      events.push({
        id: `off-${cycle}`,
        date: offStart.toISOString().split('T')[0],
        type: 'OFF'
      });
    }
    return events;
  }, [startDate, rotation]);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Work Rotation Planner</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Select Cycle Pattern</label>
            <div className="grid grid-cols-3 gap-3">
              {[RotationType.SEVEN_SEVEN, RotationType.FOURTEEN_FOURTEEN, RotationType.TWENTY_EIGHT_TWENTY_EIGHT].map((rot) => (
                <button
                  key={rot}
                  onClick={() => onRotationChange(rot)}
                  className={`py-3 px-2 rounded-xl text-sm font-bold border-2 transition-all ${
                    rotation === rot 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-100 hover:border-slate-200 text-slate-600'
                  }`}
                >
                  {rot}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Next Crew Change Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 focus:border-blue-500 outline-none font-medium text-slate-700"
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center text-lg">
            <i className="fas fa-stream mr-3 text-blue-500"></i>
            Timeline for Next 4 Months
          </h3>
          
          <div className="space-y-4">
            {scheduleEvents.map((event, idx) => {
              const dateObj = new Date(event.date);
              const endDate = new Date(dateObj);
              const days = rotation === RotationType.SEVEN_SEVEN ? 7 : rotation === RotationType.FOURTEEN_FOURTEEN ? 14 : 28;
              endDate.setDate(dateObj.getDate() + days - 1);

              return (
                <div key={event.id} className="flex items-stretch group">
                  <div className="w-16 flex flex-col items-center">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-lg font-black text-slate-800 leading-none">
                      {dateObj.getDate()}
                    </div>
                    <div className="flex-1 w-0.5 bg-slate-200 my-2 group-last:bg-transparent"></div>
                  </div>
                  
                  <div className={`flex-1 ml-4 mb-4 p-4 rounded-2xl border-l-4 shadow-sm transition-transform hover:scale-[1.01] cursor-default ${
                    event.type === 'ON' 
                    ? 'bg-blue-50 border-blue-500' 
                    : 'bg-slate-50 border-slate-300'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                            event.type === 'ON' ? 'bg-blue-200 text-blue-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {event.type === 'ON' ? 'On Watch' : 'Shore Leave'}
                          </span>
                          <span className="text-sm font-bold text-slate-800">
                            {dateObj.toLocaleDateString('en-US', { weekday: 'long' })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          Period: {dateObj.toLocaleDateString()} to {endDate.toLocaleDateString()}
                        </p>
                      </div>
                      <i className={`fas ${event.type === 'ON' ? 'fa-ship text-blue-400' : 'fa-home text-slate-400'} text-xl opacity-20`}></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
