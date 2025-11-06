import React, { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import Hero from './components/Hero';
import ChallengeForm from './components/ChallengeForm';
import ChallengeGrid from './components/ChallengeGrid';
import SettingsPanel from './components/SettingsPanel';

const STORAGE_KEY = 'challenges_v1';

function App() {
  const [challenges, setChallenges] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(challenges));
  }, [challenges]);

  const completedCount = useMemo(() =>
    challenges.filter((c) => {
      const start = new Date(c.startDate);
      return (new Date() - start) / (1000 * 60 * 60 * 24) >= 29; // 30th day
    }).length,
  [challenges]);

  const handleAdd = (challenge) => {
    setChallenges((prev) => [
      { ...challenge, progress: [] },
      ...prev,
    ]);
    setShowForm(false);
  };

  const handleToggleDay = (id, day) => {
    setChallenges((prev) => prev.map((c) => {
      if (c.id !== id) return c;
      const has = (c.progress || []).includes(day);
      const progress = has
        ? c.progress.filter((d) => d !== day)
        : [...(c.progress || []), day].sort((a, b) => a - b);
      return { ...c, progress };
    }));
  };

  const handleDelete = (id) => {
    setChallenges((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearAll = () => {
    if (confirm('Clear all challenges and progress?')) {
      setChallenges([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-indigo-50 to-teal-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-6 md:space-y-8">
        <Hero />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Your Challenges</h2>
            <p className="text-slate-500 text-sm">{completedCount} completed</p>
          </div>
          <div className="flex items-center gap-3">
            <SettingsPanel onClearAll={handleClearAll} />
            <button
              onClick={() => setShowForm((s) => !s)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-400 text-white shadow hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" /> Add Challenge
            </button>
          </div>
        </div>

        {showForm && (
          <ChallengeForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
        )}

        <ChallengeGrid
          challenges={challenges}
          onToggleDay={handleToggleDay}
          onDelete={handleDelete}
        />
      </div>

      <footer className="py-8 text-center text-slate-400 text-sm">
        Made with pastel vibes • Keep going daily ✨
      </footer>
    </div>
  );
}

export default App;
