const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Workout = require('../models/Workout');
const Attendance = require('../models/Attendance');
const Payment = require('../models/Payment');
const CommunityPost = require('../models/CommunityPost');
const Challenge = require('../models/Challenge');

dotenv.config();

const trainers = [
  { name: 'Rajesh Kumar', email: 'rajesh@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543210', specialty: 'Strength Training', experience: '8 years', certifications: ['NSCA-CPT', 'ACE Certified'], rating: 4.8, availability: 'Mon-Sat 6AM-2PM' },
  { name: 'Priya Sharma', email: 'priya@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543211', specialty: 'Yoga & Flexibility', experience: '6 years', certifications: ['RYT-200', 'Yoga Alliance'], rating: 4.9, availability: 'Mon-Sat 7AM-3PM' },
  { name: 'Vikram Singh', email: 'vikram@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543212', specialty: 'Cardio & HIIT', experience: '5 years', certifications: ['ACE-CPT', 'CrossFit Level 1'], rating: 4.7, availability: 'Mon-Sat 5AM-1PM' },
  { name: 'Ananya Reddy', email: 'ananya@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543213', specialty: 'Weight Loss', experience: '7 years', certifications: ['ISSA-CPT', 'Nutrition Certified'], rating: 4.6, availability: 'Mon-Sat 6AM-4PM' },
  { name: 'Suresh Patel', email: 'suresh@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543214', specialty: 'Bodybuilding', experience: '10 years', certifications: ['IFBB Certified', 'NSCA-CSCS'], rating: 4.9, availability: 'Mon-Sat 5AM-11AM' },
  { name: 'Deepika Nair', email: 'deepika@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543215', specialty: 'Pilates & Core', experience: '4 years', certifications: ['PMA-CPT', 'ACE-GFI'], rating: 4.5, availability: 'Mon-Sat 8AM-4PM' },
  { name: 'Arjun Mehta', email: 'arjun@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543216', specialty: 'Functional Training', experience: '6 years', certifications: ['ACE-CPT', 'TRX Certified'], rating: 4.7, availability: 'Mon-Sat 6AM-2PM' },
  { name: 'Kavitha Iyer', email: 'kavitha@elevatefit.com', password: 'password123', role: 'trainer', phone: '9876543217', specialty: 'Kickboxing', experience: '5 years', certifications: ['ISSA-CPT', 'Kickboxing Instructor'], rating: 4.8, availability: 'Mon-Sat 7AM-3PM' },
];

const memberNames = [
  'Aarav Gupta', 'Vivaan Sharma', 'Aditya Verma', 'Vihaan Patel', 'Arjun Reddy',
  'Sai Krishna', 'Reyansh Kumar', 'Ayaan Singh', 'Krishna Das', 'Ishaan Nair',
  'Ananya Gupta', 'Diya Sharma', 'Saanvi Verma', 'Myra Patel', 'Sara Reddy',
  'Aisha Khan', 'Priyanka Das', 'Nisha Kumar', 'Riya Singh', 'Pooja Nair',
  'Rahul Verma', 'Amit Patel', 'Sanjay Kumar', 'Rajesh Singh', 'Manish Reddy',
  'Karthik Nair', 'Suresh Gupta', 'Vikash Sharma', 'Deepak Verma', 'Ravi Patel',
  'Sneha Gupta', 'Neha Sharma', 'Pallavi Verma', 'Meena Patel', 'Lakshmi Reddy',
  'Sunita Das', 'Geeta Kumar', 'Rekha Singh', 'Aarti Nair', 'Suman Gupta',
  'Pradeep Sharma', 'Nitin Verma', 'Ashok Patel', 'Mohan Reddy', 'Sathish Nair',
  'Vinod Gupta', 'Ajay Sharma', 'Rajiv Verma', 'Sunil Patel', 'Ganesh Reddy',
  'Swathi Nair', 'Padma Gupta', 'Usha Sharma', 'Kamala Verma', 'Saroj Patel',
  'Bharat Reddy', 'Chetan Nair', 'Dinesh Gupta', 'Eknath Sharma', 'Farhan Verma',
  'Girish Patel', 'Hitesh Reddy', 'Indrajeet Nair', 'Jatin Gupta', 'Kishore Sharma',
  'Lokesh Verma', 'Mahesh Patel', 'Naveen Reddy', 'Om Prakash Nair', 'Pankaj Gupta',
  'Quinton Sharma', 'Rakesh Verma', 'Sachin Patel', 'Tilak Reddy', 'Umesh Nair',
  'Vasu Gupta', 'Wahid Sharma', 'Yogesh Verma', 'Zubair Patel', 'Aakash Reddy',
  'Brijesh Nair', 'Chirag Gupta', 'Darshan Sharma', 'Eshaan Verma', 'Falguni Patel',
  'Gaurav Reddy', 'Harish Nair', 'Imran Gupta', 'Jagdish Sharma', 'Kapil Verma',
  'Lalit Patel', 'Milind Reddy', 'Nikhil Nair', 'Onkar Gupta', 'Prakash Sharma',
  'Raghav Verma', 'Sameer Patel', 'Tanmay Reddy', 'Ujjwal Nair', 'Vishal Gupta',
  'Wasim Sharma', 'Xavier Verma', 'Yash Patel', 'Zeeshan Reddy', 'Abhishek Nair',
  'Bhavana Gupta', 'Chhavi Sharma', 'Divya Verma', 'Ekta Patel', 'Fiza Reddy',
  'Garima Nair', 'Himani Gupta', 'Ishita Sharma', 'Juhi Verma', 'Kriti Patel',
  'Mamta Reddy', 'Namrata Nair', 'Oviya Gupta', 'Poonam Sharma', 'Rachna Verma',
  'Shreya Patel', 'Tanvi Reddy', 'Urmila Nair', 'Vandana Gupta', 'Yamini Sharma',
];

const fitnessGoals = ['Weight Loss', 'Muscle Gain', 'General Fitness', 'Endurance', 'Flexibility', 'Body Recomposition', 'Athletic Performance'];
const plans = ['monthly', 'quarterly', 'half-yearly', 'annual'];

const memberEmails = (name) => name.toLowerCase().replace(/\s+/g, '.') + '@gmail.com';

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Workout.deleteMany({});
    await Attendance.deleteMany({});
    await Payment.deleteMany({});
    await CommunityPost.deleteMany({});
    await Challenge.deleteMany({});
    console.log('Cleared existing data');

    // Create owner
    const owner = await User.create({
      name: 'Kiran Kumar',
      email: 'owner@elevatefit.com',
      password: 'password123',
      role: 'owner',
      phone: '9876543200',
      gymName: 'EliteFit Gym',
    });
    console.log('Owner created');

    // Create trainers
    const createdTrainers = await User.insertMany(trainers);
    console.log(`${createdTrainers.length} trainers created`);

    // Create members
    const members = memberNames.map((name, i) => ({
      name,
      email: memberEmails(name),
      password: 'password123',
      role: 'member',
      phone: `987654${(4000 + i).toString().padStart(4, '0')}`,
      membershipPlan: plans[i % 4],
      memberId: `EF-${(1001 + i).toString()}`,
      joinDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      expiryDate: new Date(2025, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1),
      trainerAssigned: createdTrainers[i % 8]._id,
      attendanceCount: Math.floor(Math.random() * 180) + 10,
      rewardPoints: Math.floor(Math.random() * 2000) + 100,
      streak: Math.floor(Math.random() * 30),
      height: Math.floor(Math.random() * 30) + 155,
      weight: Math.floor(Math.random() * 40) + 50,
      fitnessGoal: fitnessGoals[Math.floor(Math.random() * fitnessGoals.length)],
      paymentStatus: Math.random() > 0.1 ? 'paid' : (Math.random() > 0.5 ? 'pending' : 'overdue'),
      isActive: Math.random() > 0.05,
    }));

    const createdMembers = await User.insertMany(members);
    console.log(`${createdMembers.length} members created`);

    // Assign members to trainers
    for (let i = 0; i < createdTrainers.length; i++) {
      const assignedMemberIds = createdMembers
        .filter((_, idx) => idx % 8 === i)
        .map((m) => m._id);
      await User.findByIdAndUpdate(createdTrainers[i]._id, { assignedMembers: assignedMemberIds });
    }

    // Create workouts
    const workouts = [
      { title: 'Morning Power HIIT', muscleGroup: 'Full Body', duration: 45, calories: 400, difficulty: 'advanced', exercises: [
        { name: 'Burpees', sets: 4, reps: 15, duration: 0 },
        { name: 'Mountain Climbers', sets: 3, reps: 20, duration: 0 },
        { name: 'Jump Squats', sets: 4, reps: 12, duration: 0 },
        { name: 'Push-ups', sets: 3, reps: 15, duration: 0 },
        { name: 'Plank Jacks', sets: 3, reps: 20, duration: 0 },
      ]},
      { title: 'Chest & Triceps Blast', muscleGroup: 'Chest', duration: 60, calories: 350, difficulty: 'intermediate', exercises: [
        { name: 'Bench Press', sets: 4, reps: 10, weight: 60 },
        { name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: 20 },
        { name: 'Cable Flyes', sets: 3, reps: 15, weight: 10 },
        { name: 'Tricep Dips', sets: 3, reps: 12, duration: 0 },
        { name: 'Tricep Pushdown', sets: 3, reps: 15, weight: 15 },
      ]},
      { title: 'Leg Day Destroyer', muscleGroup: 'Legs', duration: 55, calories: 450, difficulty: 'advanced', exercises: [
        { name: 'Barbell Squats', sets: 4, reps: 10, weight: 80 },
        { name: 'Romanian Deadlift', sets: 4, reps: 8, weight: 70 },
        { name: 'Leg Press', sets: 3, reps: 15, weight: 120 },
        { name: 'Walking Lunges', sets: 3, reps: 12, duration: 0 },
        { name: 'Calf Raises', sets: 4, reps: 20, weight: 40 },
      ]},
      { title: 'Back & Biceps', muscleGroup: 'Back', duration: 50, calories: 320, difficulty: 'intermediate', exercises: [
        { name: 'Deadlift', sets: 4, reps: 8, weight: 80 },
        { name: 'Pull-ups', sets: 4, reps: 10, duration: 0 },
        { name: 'Barbell Rows', sets: 3, reps: 12, weight: 50 },
        { name: 'Lat Pulldown', sets: 3, reps: 12, weight: 40 },
        { name: 'Bicep Curls', sets: 3, reps: 15, weight: 12 },
      ]},
      { title: 'Core Crusher', muscleGroup: 'Abs', duration: 30, calories: 200, difficulty: 'beginner', exercises: [
        { name: 'Crunches', sets: 3, reps: 20, duration: 0 },
        { name: 'Leg Raises', sets: 3, reps: 15, duration: 0 },
        { name: 'Russian Twists', sets: 3, reps: 20, duration: 0 },
        { name: 'Plank Hold', sets: 3, reps: 1, duration: 60 },
        { name: 'Bicycle Crunches', sets: 3, reps: 20, duration: 0 },
      ]},
      { title: 'Shoulder Sculpt', muscleGroup: 'Shoulders', duration: 45, calories: 280, difficulty: 'intermediate', exercises: [
        { name: 'Overhead Press', sets: 4, reps: 10, weight: 30 },
        { name: 'Lateral Raises', sets: 3, reps: 15, weight: 8 },
        { name: 'Front Raises', sets: 3, reps: 12, weight: 8 },
        { name: 'Face Pulls', sets: 3, reps: 15, weight: 10 },
        { name: 'Shrugs', sets: 3, reps: 15, weight: 20 },
      ]},
      { title: 'Yoga Flow', muscleGroup: 'Flexibility', duration: 60, calories: 180, difficulty: 'beginner', exercises: [
        { name: 'Sun Salutation', sets: 3, reps: 1, duration: 300 },
        { name: 'Warrior Pose', sets: 2, reps: 1, duration: 120 },
        { name: 'Tree Pose', sets: 2, reps: 1, duration: 60 },
        { name: 'Downward Dog', sets: 3, reps: 1, duration: 60 },
        { name: 'Cobra Stretch', sets: 3, reps: 1, duration: 60 },
      ]},
      { title: 'Cardio Kickboxing', muscleGroup: 'Full Body', duration: 40, calories: 500, difficulty: 'advanced', exercises: [
        { name: 'Jab-Cross Combo', sets: 4, reps: 20, duration: 0 },
        { name: 'Front Kicks', sets: 3, reps: 15, duration: 0 },
        { name: 'Roundhouse Kicks', sets: 3, reps: 12, duration: 0 },
        { name: 'Uppercuts', sets: 3, reps: 20, duration: 0 },
        { name: 'Speed Bag', sets: 3, reps: 1, duration: 60 },
      ]},
      { title: 'Arms & Abs', muscleGroup: 'Arms', duration: 40, calories: 250, difficulty: 'beginner', exercises: [
        { name: 'Hammer Curls', sets: 3, reps: 12, weight: 10 },
        { name: 'Tricep Extensions', sets: 3, reps: 12, weight: 12 },
        { name: 'Preacher Curls', sets: 3, reps: 10, weight: 15 },
        { name: 'Skull Crushers', sets: 3, reps: 10, weight: 15 },
        { name: 'Ab Rollouts', sets: 3, reps: 12, duration: 0 },
      ]},
      { title: 'Full Body Strength', muscleGroup: 'Full Body', duration: 50, calories: 380, difficulty: 'intermediate', exercises: [
        { name: 'Barbell Squats', sets: 3, reps: 10, weight: 60 },
        { name: 'Bench Press', sets: 3, reps: 10, weight: 50 },
        { name: 'Barbell Rows', sets: 3, reps: 10, weight: 50 },
        { name: 'Overhead Press', sets: 3, reps: 10, weight: 30 },
        { name: 'Deadlift', sets: 3, reps: 8, weight: 70 },
      ]},
    ];

    const createdWorkouts = await Workout.insertMany(
      workouts.map((w, i) => ({
        ...w,
        assignedTrainer: createdTrainers[i % 8]._id,
        assignedMembers: createdMembers.slice(i * 15, i * 15 + 15).map((m) => m._id),
      }))
    );
    console.log(`${createdWorkouts.length} workouts created`);

    // Create attendance records
    const attendanceRecords = [];
    const today = new Date();
    for (let dayOffset = 30; dayOffset >= 0; dayOffset--) {
      const date = new Date(today);
      date.setDate(date.getDate() - dayOffset);
      date.setHours(0, 0, 0, 0);

      const numPresent = Math.floor(Math.random() * 30) + 40;
      const presentMembers = createdMembers
        .sort(() => Math.random() - 0.5)
        .slice(0, numPresent);

      for (const member of presentMembers) {
        const checkInHour = 5 + Math.floor(Math.random() * 14);
        const checkIn = new Date(date);
        checkIn.setHours(checkInHour, Math.floor(Math.random() * 60));

        const checkOut = new Date(checkIn);
        checkOut.setHours(checkInHour + 1 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));

        attendanceRecords.push({
          member: member._id,
          date: date,
          checkInTime: checkIn,
          checkOutTime: checkOut,
          status: checkInHour > 8 ? 'late' : 'present',
        });
      }
    }
    await Attendance.insertMany(attendanceRecords);
    console.log(`${attendanceRecords.length} attendance records created`);

    // Create payments
    const payments = [];
    const planPrices = { monthly: 1500, quarterly: 4000, 'half-yearly': 7500, annual: 14000 };
    for (const member of createdMembers) {
      const numPayments = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < numPayments; i++) {
        const plan = plans[Math.floor(Math.random() * plans.length)];
        const payDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
        payments.push({
          member: member._id,
          amount: planPrices[plan],
          membershipPlan: plan,
          date: payDate,
          status: Math.random() > 0.15 ? 'completed' : 'pending',
          transactionId: `TXN-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`,
          paymentMethod: Math.random() > 0.3 ? 'qr' : 'cash',
        });
      }
    }
    await Payment.insertMany(payments);
    console.log(`${payments.length} payments created`);

    // Create community posts
    const posts = [
      { caption: 'Just hit a new personal record on deadlift! 💪 140kg! Hard work pays off!', type: 'achievement' },
      { caption: 'Morning yoga session was amazing today. Feeling so refreshed! 🧘‍♀️', type: 'post' },
      { caption: 'Congratulations to all participants of the 30-Day Transformation Challenge! 🏆', type: 'announcement' },
      { caption: 'New batch starting next Monday for Kickboxing classes. Limited spots! 🥊', type: 'announcement' },
      { caption: 'Lost 5kg in the last month with consistent training and clean eating! 🎉', type: 'achievement' },
      { caption: 'Great energy at the gym today! Love the community vibes here! 🔥', type: 'post' },
      { caption: 'Reminder: Gym is closed on Republic Day. Happy holidays! 🇮🇳', type: 'announcement' },
      { caption: 'Just completed my first 5K run! Never thought I could do it! 🏃‍♂️', type: 'achievement' },
      { caption: 'Protein shake recipe: Banana + Oats + Peanut Butter + Milk. Perfect post-workout! 🥤', type: 'post' },
      { caption: 'Trainer Rajesh is a legend! Best strength training sessions! 💪', type: 'post' },
    ];

    const createdPosts = await CommunityPost.insertMany(
      posts.map((p) => ({
        ...p,
        author: createdMembers[Math.floor(Math.random() * createdMembers.length)]._id,
        likes: createdMembers.slice(0, Math.floor(Math.random() * 30) + 5).map((m) => m._id),
        comments: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => ({
          author: createdMembers[Math.floor(Math.random() * createdMembers.length)]._id,
          text: ['Great work! 🎉', 'Keep it up! 💪', 'Inspiring!', 'Amazing progress!', 'Love this!'][Math.floor(Math.random() * 5)],
        })),
      }))
    );
    console.log(`${createdPosts.length} community posts created`);

    // Create challenges
    const challenges = [
      { title: '30-Day Transformation Challenge', description: 'Transform your body in 30 days with daily workouts and clean eating. Complete all workouts to earn rewards!', startDate: new Date(2025, 0, 1), endDate: new Date(2025, 0, 30), rewardPoints: 500, goalTarget: 30 },
      { title: 'Push-up Challenge', description: 'Complete 100 push-ups daily for 2 weeks. Track your progress and earn points!', startDate: new Date(2025, 1, 1), endDate: new Date(2025, 1, 14), rewardPoints: 300, goalTarget: 14 },
      { title: '10K Steps Daily', description: 'Walk 10,000 steps every day for a month. Use any fitness tracker to log your steps.', startDate: new Date(2025, 2, 1), endDate: new Date(2025, 2, 31), rewardPoints: 400, goalTarget: 31 },
      { title: 'Plank Master', description: 'Hold plank for increasing duration each day. Start at 30 seconds and reach 5 minutes!', startDate: new Date(2025, 3, 1), endDate: new Date(2025, 3, 30), rewardPoints: 350, goalTarget: 30 },
      { title: 'Yoga Challenge', description: 'Complete 20 yoga sessions in 30 days. Any style counts! 🧘‍♀️', startDate: new Date(2024, 10, 1), endDate: new Date(2024, 10, 30), rewardPoints: 250, goalTarget: 20 },
      { title: 'Squat September', description: 'Do 50 squats daily throughout September. Bonus points for weighted squats!', startDate: new Date(2024, 8, 1), endDate: new Date(2024, 8, 30), rewardPoints: 300, goalTarget: 30 },
      { title: 'Hydration Hero', description: 'Drink 3 liters of water daily for 21 days. Log your intake daily!', startDate: new Date(2025, 4, 1), endDate: new Date(2025, 4, 21), rewardPoints: 200, goalTarget: 21 },
      { title: 'No Sugar November', description: 'Cut out all added sugar for the entire month. Share your progress!', startDate: new Date(2024, 10, 1), endDate: new Date(2024, 10, 30), rewardPoints: 450, goalTarget: 30 },
      { title: 'Early Bird Challenge', description: 'Check in before 7 AM for 21 consecutive days. Build that morning routine!', startDate: new Date(2025, 5, 1), endDate: new Date(2025, 5, 21), rewardPoints: 350, goalTarget: 21 },
      { title: 'Summer Shred', description: 'Complete HIIT workouts 5x a week for 6 weeks. Get summer ready! 🔥', startDate: new Date(2025, 3, 1), endDate: new Date(2025, 4, 12), rewardPoints: 600, goalTarget: 30 },
      { title: 'Marathon Prep', description: 'Build up to running 10K with progressive training over 8 weeks.', startDate: new Date(2025, 5, 1), endDate: new Date(2025, 6, 31), rewardPoints: 500, goalTarget: 56 },
      { title: 'Flexibility Fiesta', description: 'Complete daily stretching routines for 30 days. Improve your range of motion!', startDate: new Date(2025, 6, 1), endDate: new Date(2025, 6, 30), rewardPoints: 250, goalTarget: 30 },
    ];

    const createdChallenges = await Challenge.insertMany(
      challenges.map((c) => ({
        ...c,
        participants: createdMembers
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 40) + 10)
          .map((m) => ({
            member: m._id,
            joinedAt: new Date(c.startDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000),
            progress: Math.floor(Math.random() * 100),
            completed: Math.random() > 0.6,
          })),
      }))
    );
    console.log(`${createdChallenges.length} challenges created`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\nLogin credentials:');
    console.log('Owner:    owner@elevatefit.com / password123');
    console.log('Trainer:  rajesh@elevatefit.com / password123');
    console.log('Member:   aarav.gupta@gmail.com / password123');
    console.log('\nAll members use password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
