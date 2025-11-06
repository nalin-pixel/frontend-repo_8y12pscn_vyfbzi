import React, { useState } from 'react';
import { Plus, Calendar, Badge, FileText, Image as ImageIcon } from 'lucide-react';

const defaultForm = {
  name: '',
  icon: '🔥',
  description: '',
  startDate: ''
};

const ChallengeForm = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState(defaultForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.startDate) return;
    onAdd({ ...form, id: crypto.randomUUID() });
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 md:p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3 py-2">
          <Badge className="w-4 h-4 text-slate-500" />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Challenge name (e.g., No Sugar, Daily Run)"
            className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
          />
        </label>
        <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3 py-2">
          <ImageIcon className="w-4 h-4 text-slate-500" />
          <input
            name="icon"
            value={form.icon}
            onChange={handleChange}
            placeholder="Icon (emoji like 🔥, 🌿, 💪)"
            className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
          />
        </label>
      </div>
      <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3 py-2">
        <FileText className="w-4 h-4 text-slate-500" />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description"
          className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
        />
      </label>
      <label className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 px-3 py-2 w-full md:w-1/2">
        <Calendar className="w-4 h-4 text-slate-500" />
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
        />
      </label>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-indigo-400 text-white shadow hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Challenge
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ChallengeForm;
