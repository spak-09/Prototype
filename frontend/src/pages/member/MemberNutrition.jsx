import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Apple, Flame, Beef, Wheat, Cookie } from 'lucide-react';
import { PageHeader, StatCard, Button } from '../../components/shared/UIComponents';

const macros = [
  { name: 'Protein', value: 120, target: 150, unit: 'g', color: 'bg-red-500', icon: Beef },
  { name: 'Carbs', value: 200, target: 250, unit: 'g', color: 'bg-amber-500', icon: Wheat },
  { name: 'Fats', value: 55, target: 70, unit: 'g', color: 'bg-blue-500', icon: Cookie },
];

const meals = [
  { name: 'Breakfast', time: '7:00 AM', items: 'Oats + Banana + Protein Shake', calories: 450, icon: '🥣' },
  { name: 'Mid-Morning Snack', time: '10:00 AM', items: 'Apple + Almonds (15)', calories: 200, icon: '🍎' },
  { name: 'Lunch', time: '1:00 PM', items: 'Brown Rice + Chicken Breast + Salad', calories: 600, icon: '🍱' },
  { name: 'Pre-Workout', time: '4:30 PM', items: 'Banana + Black Coffee', calories: 150, icon: '☕' },
  { name: 'Dinner', time: '7:30 PM', items: 'Grilled Fish + Sweet Potato + Veggies', calories: 500, icon: '🍽️' },
];

export default function MemberNutrition() {
  const [waterIntake, setWaterIntake] = useState(5);
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Nutrition" subtitle="Track your daily nutrition and hydration" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Flame} label="Total Calories" value={`${totalCalories}`} change="Target: 2,200" color="primary" />
        {macros.map((m, i) => <StatCard key={i} icon={m.icon} label={m.name} value={`${m.value}${m.unit}`} change={`Target: ${m.target}${m.unit}`} color={['red', 'amber', 'blue'][i]} />)}
      </div>

      {/* Macros Progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
        <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Daily Macros</h3>
        <div className="space-y-4">
          {macros.map((macro, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[#A8A29E]">{macro.name}</span>
                <span className="text-sm text-[#6B7280]">{macro.value}/{macro.target}{macro.unit}</span>
              </div>
              <div className="w-full bg-[#222] rounded-full h-3">
                <div className={`${macro.color} h-3 rounded-full transition-all duration-1000`} style={{ width: `${(macro.value / macro.target) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Meals */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Today's Meals</h3>
          <div className="space-y-3">
            {meals.map((meal, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#1A1A1A] rounded-xl">
                <span className="text-2xl">{meal.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[#F0EDE8]">{meal.name}</p>
                    <span className="text-xs text-[#6B7280]">{meal.time}</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">{meal.items}</p>
                </div>
                <span className="text-sm font-semibold text-[#F0EDE8]">{meal.calories} cal</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Water Intake */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#181818] rounded-2xl p-6 shadow-card">
          <h3 className="text-lg font-semibold text-[#F0EDE8] mb-4">Water Intake</h3>
          <div className="text-center mb-4">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-10 h-10 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-[#F0EDE8]">{waterIntake}</p>
            <p className="text-sm text-[#6B7280]">of 8 glasses</p>
          </div>
          <div className="w-full bg-[#222] rounded-full h-3 mb-4">
            <div className="bg-blue-500 h-3 rounded-full transition-all" style={{ width: `${(waterIntake / 8) * 100}%` }} />
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1" onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}>- Glass</Button>
            <Button size="sm" className="flex-1" onClick={() => setWaterIntake(Math.min(8, waterIntake + 1))}>+ Glass</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
