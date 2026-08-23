import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Clock, Flame, ChevronRight, CheckCircle } from 'lucide-react';
import { PageHeader, Badge } from '../../components/shared/UIComponents';
import { api } from '../../services/api';

const workoutsData = [
  { id: 1, title: 'Morning Power HIIT', muscleGroup: 'Full Body', duration: 45, calories: 400, difficulty: 'advanced', exercises: [
    { name: 'Burpees', sets: 4, reps: 15 }, { name: 'Mountain Climbers', sets: 3, reps: 20 },
    { name: 'Jump Squats', sets: 4, reps: 12 }, { name: 'Push-ups', sets: 3, reps: 15 },
  ]},
  { id: 2, title: 'Chest & Triceps', muscleGroup: 'Chest', duration: 60, calories: 350, difficulty: 'intermediate', exercises: [
    { name: 'Bench Press', sets: 4, reps: 10, weight: '60kg' }, { name: 'Incline DB Press', sets: 3, reps: 12, weight: '20kg' },
    { name: 'Cable Flyes', sets: 3, reps: 15, weight: '10kg' }, { name: 'Tricep Dips', sets: 3, reps: 12 },
  ]},
  { id: 3, title: 'Leg Day Destroyer', muscleGroup: 'Legs', duration: 55, calories: 450, difficulty: 'advanced', exercises: [
    { name: 'Barbell Squats', sets: 4, reps: 10, weight: '80kg' }, { name: 'Romanian Deadlift', sets: 4, reps: 8, weight: '70kg' },
    { name: 'Leg Press', sets: 3, reps: 15, weight: '120kg' }, { name: 'Walking Lunges', sets: 3, reps: 12 },
  ]},
  { id: 4, title: 'Core Crusher', muscleGroup: 'Abs', duration: 30, calories: 200, difficulty: 'beginner', exercises: [
    { name: 'Crunches', sets: 3, reps: 20 }, { name: 'Leg Raises', sets: 3, reps: 15 },
    { name: 'Russian Twists', sets: 3, reps: 20 }, { name: 'Plank Hold', sets: 3, reps: 1, duration: '60s' },
  ]},
  { id: 5, title: 'Yoga Flow', muscleGroup: 'Flexibility', duration: 60, calories: 180, difficulty: 'beginner', exercises: [
    { name: 'Sun Salutation', sets: 3, reps: 1, duration: '5min' }, { name: 'Warrior Pose', sets: 2, reps: 1, duration: '2min' },
    { name: 'Tree Pose', sets: 2, reps: 1, duration: '1min' },
  ]},
  { id: 6, title: 'Back & Biceps', muscleGroup: 'Back', duration: 50, calories: 320, difficulty: 'intermediate', exercises: [
    { name: 'Deadlift', sets: 4, reps: 8, weight: '80kg' }, { name: 'Pull-ups', sets: 4, reps: 10 },
    { name: 'Barbell Rows', sets: 3, reps: 12, weight: '50kg' }, { name: 'Bicep Curls', sets: 3, reps: 15, weight: '12kg' },
  ]},
];

export default function MyWorkouts() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [completedExercises, setCompletedExercises] = useState({});

  const toggleExercise = (workoutId, exIdx) => {
    const key = `${workoutId}-${exIdx}`;
    setCompletedExercises(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const diffColors = { beginner: 'success', intermediate: 'warning', advanced: 'danger' };

  return (
    <div className="space-y-6">
      <PageHeader title="My Workouts" subtitle={`${workoutsData.length} workout plans available`} />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Workout List */}
        <div className={`space-y-3 ${selectedWorkout ? 'hidden lg:block lg:col-span-2' : 'lg:col-span-5 lg:grid lg:grid-cols-3'}`}>
          {workoutsData.map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedWorkout(w)}
              className={`bg-[#181818] rounded-2xl p-5 shadow-card cursor-pointer transition-all hover:shadow-card-hover ${
                selectedWorkout?.id === w.id ? 'ring-2 ring-primary-500' : ''
              }`}>
              <div className="flex items-start justify-between mb-3">
                <Badge variant={diffColors[w.difficulty]}>{w.difficulty}</Badge>
                <Badge variant="primary">{w.muscleGroup}</Badge>
              </div>
              <h3 className="text-base font-bold text-[#F0EDE8] mb-2">{w.title}</h3>
              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {w.duration} min</span>
                <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> {w.calories} cal</span>
              </div>
              <p className="text-xs text-[#6B7280] mt-2">{w.exercises.length} exercises</p>
            </motion.div>
          ))}
        </div>

        {/* Workout Details */}
        <AnimatePresence>
          {selectedWorkout && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
              className="lg:col-span-3 bg-[#181818] rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#F0EDE8]">{selectedWorkout.title}</h2>
                  <p className="text-sm text-[#6B7280]">{selectedWorkout.muscleGroup} • {selectedWorkout.duration} min • {selectedWorkout.calories} cal</p>
                </div>
                <button onClick={() => setSelectedWorkout(null)} className="lg:hidden p-2 rounded-lg hover:bg-[#222]">✕</button>
              </div>
              <div className="space-y-3">
                {selectedWorkout.exercises.map((ex, i) => {
                  const key = `${selectedWorkout.id}-${i}`;
                  const completed = completedExercises[key];
                  return (
                    <div key={i} onClick={() => toggleExercise(selectedWorkout.id, i)}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                        completed ? 'bg-emerald-50 border border-emerald-200' : 'bg-[#1A1A1A] hover:bg-[#222]'
                      }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        completed ? 'bg-emerald-500 text-white' : 'bg-[#181818] text-[#6B7280] border border-[rgba(255,255,255,0.08)]'
                      }`}>
                        {completed ? <CheckCircle className="w-5 h-5" /> : <span className="text-sm font-bold">{i + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${completed ? 'text-emerald-700 line-through' : 'text-[#F0EDE8]'}`}>{ex.name}</p>
                        <p className="text-xs text-[#6B7280]">
                          {ex.sets} sets × {ex.reps} reps {ex.weight ? `• ${ex.weight}` : ''} {ex.duration ? `• ${ex.duration}` : ''}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
