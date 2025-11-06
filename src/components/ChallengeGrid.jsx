import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const daysArray = Array.from({ length: 30 }, (_, i) => i + 1);

const getDayIndex = (startDateStr) => {
  if (!startDateStr) return 0;
  const start = new Date(startDateStr);
  const now = new Date();
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff + 1, 0), 30);
};

const ChallengeCard = ({ challenge, onToggleDay, onDelete }) => {
  const currentDay = getDayIndex(challenge.startDate);
  const isComplete = currentDay >= 30;

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{challenge.icon || '🏁'}</div>
          <div>
            <h3 className="font-semibold text-slate-800">{challenge.name}</h3>
            <p className="text-sm text-slate-500">{challenge.description}</p>
          </div>
        </div>
        {isComplete && (
          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
            <CheckCircle2 className="w-5 h-5" /> Complete
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-10 gap-2">
        {daysArray.map((d) => {
          const done = (challenge.progress || []).includes(d);
          const locked = d > currentDay;
          return (
            <button
              key={d}
              onClick={() => !locked && onToggleDay(challenge.id, d)}
              className={`aspect-square rounded-lg text-xs font-medium border transition ${
                done
                  ? 'bg-emerald-200 border-emerald-300 text-emerald-800'
                  : locked
                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              aria-label={`Day ${d}`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <span>
          Day {Math.min(currentDay, 30)} of 30
        </span>
        <button
          onClick={() => onDelete(challenge.id)}
          className="text-rose-500 hover:text-rose-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const ChallengeGrid = ({ challenges, onToggleDay, onDelete }) => {
  if (!challenges.length) {
    return (
      <div className="text-center text-slate-500 py-12">
        No challenges yet. Add one to get started!
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {challenges.map((c) => (
        <ChallengeCard
          key={c.id}
          challenge={c}
          onToggleDay={onToggleDay}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ChallengeGrid;
