import React, { useEffect, useState } from 'react';
import { Settings, Trash2, Globe2 } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
];

const SettingsPanel = ({ onClearAll }) => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem('challenge_lang') || 'en');

  useEffect(() => {
    localStorage.setItem('challenge_lang', lang);
  }, [lang]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/80 border border-slate-200 text-slate-700 hover:bg-white shadow-sm"
      >
        <Settings className="w-4 h-4" /> Settings
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-lg p-3 z-20">
          <div className="flex items-center gap-2 text-slate-700 font-medium mb-2">
            <Globe2 className="w-4 h-4" /> Language
          </div>
          <div className="flex gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 rounded-lg border text-sm ${
                  lang === l.code
                    ? 'bg-indigo-100 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="h-px bg-slate-200 my-3" />
          <button
            onClick={onClearAll}
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
          >
            <Trash2 className="w-4 h-4" /> Clear all data
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
