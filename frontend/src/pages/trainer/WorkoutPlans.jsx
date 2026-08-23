import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Dumbbell, Clock, Flame, Trash2, Eye } from 'lucide-react';
import { PageHeader, Badge, Button, Modal } from '../../components/shared/UIComponents';
import { api } from '../../services/api';
import toast from 'react-hot-toast';

const muscleGroups = ['Full Body', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Abs', 'Cardio', 'Flexibility'];
const difficulties = ['beginner', 'intermediate', 'advanced'];

export default function WorkoutPlans() {
  const [workouts, setWorkouts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', muscleGroup: 'Full Body', duration: 45, calories: 300, difficulty: 'intermediate', exercises: [{ name: '', sets: 3, reps: 10, weight: 0 }] });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await api.trainer.getWorkouts();
        setWorkouts(res.workouts);
      } catch (error) { console.error(error); }
    };
    fetchWorkouts();
  }, []);

  const addExercise = () => setForm({ ...form, exercises: [...form.exercises, { name: '', sets: 3, reps: 10, weight: 0 }] });
  const removeExercise = (i) => setForm({ ...form, exercises: form.exercises.filter((_, idx) => idx !== i) });
  const updateExercise = (i, field, val) => {
    const ex = [...form.exercises];
    ex[i] = { ...ex[i], [field]: val };
    setForm({ ...form, exercises: ex });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.trainer.createWorkout(form);
      toast.success('Workout plan created!');
      setShowCreate(false);
      setForm({ title: '', muscleGroup: 'Full Body', duration: 45, calories: 300, difficulty: 'intermediate', exercises: [{ name: '', sets: 3, reps: 10, weight: 0 }] });
      const res = await api.trainer.getWorkouts();
      setWorkouts(res.workouts);
    } catch (error) { toast.error(error.message); }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Workout Plans" subtitle="Create and manage workout plans"
        actions={<Button onClick={() => setShowCreate(true)}><Plus className="w-4 h-4" /> Create Plan</Button>} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((w, i) => (
          <motion.div key={w._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#181818] rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between mb-3">
              <Badge variant={w.difficulty === 'advanced' ? 'danger' : w.difficulty === 'intermediate' ? 'warning' : 'success'}>{w.difficulty}</Badge>
              <Badge variant="primary">{w.muscleGroup}</Badge>
            </div>
            <h3 className="text-base font-bold text-[#F0EDE8] mb-2">{w.title}</h3>
            <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-3">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {w.duration} min</span>
              <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> {w.calories} cal</span>
            </div>
            <p className="text-xs text-[#6B7280] mb-3">{w.exercises?.length || 0} exercises</p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1"><Eye className="w-3.5 h-3.5" /> View</Button>
              <Button variant="ghost" size="sm" className="text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Workout Plan" size="lg">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Title</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Muscle Group</label>
              <select value={form.muscleGroup} onChange={(e) => setForm({ ...form, muscleGroup: e.target.value })} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm">
                {muscleGroups.map(g => <option key={g} value={g}>{g}</option>)}
              </select></div>
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm">
                {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select></div>
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Duration (min)</label>
              <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: +e.target.value })} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
            <div><label className="text-sm font-medium text-[#A8A29E] mb-1 block">Calories</label>
              <input type="number" value={form.calories} onChange={(e) => setForm({ ...form, calories: +e.target.value })} className="w-full bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-2.5 text-sm" /></div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-[#A8A29E]">Exercises</label>
              <Button type="button" variant="ghost" size="sm" onClick={addExercise}><Plus className="w-3.5 h-3.5" /> Add</Button>
            </div>
            {form.exercises.map((ex, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 mb-2">
                <input placeholder="Exercise name" value={ex.name} onChange={(e) => updateExercise(i, 'name', e.target.value)} className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm col-span-2" />
                <input type="number" placeholder="Sets" value={ex.sets} onChange={(e) => updateExercise(i, 'sets', +e.target.value)} className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm" />
                <input type="number" placeholder="Reps" value={ex.reps} onChange={(e) => updateExercise(i, 'reps', +e.target.value)} className="bg-[#1A1A1A] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm" />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={() => setShowCreate(false)} className="flex-1">Cancel</Button>
            <Button type="submit" className="flex-1">Create Plan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
