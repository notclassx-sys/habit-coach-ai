export const motivationalQuotes = [
  "The secret of getting ahead is getting started. — Mark Twain",
  "Small daily improvements are the key to staggering long-term results.",
  "Discipline is the bridge between goals and accomplishment. — Jim Rohn",
  "Success is the sum of small efforts repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going. — Sam Levenson",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Motivation gets you started. Habit keeps you going. — Jim Ryun",
  "Your habits shape your identity, and your identity shapes your habits.",
  "Excellence is not a singular act, but a habit. You are what you repeatedly do.",
  "The difference between who you are and who you want to be is what you do.",
  "Progress, not perfection, is what we should be asking of ourselves.",
  "Every action you take is a vote for the type of person you wish to become.",
  "Champions don't show up to get everything they want; they show up to give everything they have.",
  "The pain of discipline is far less than the pain of regret.",
  "You don't have to be extreme, just consistent.",
];

export const getRandomQuote = () => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

export const coachResponses = [
  "That's a great mindset! Remember, consistency beats intensity. Keep showing up every day.",
  "You've got this! Focus on progress, not perfection. Every small step counts.",
  "I believe in you! The fact that you're here working on your habits shows real commitment.",
  "Excellent question! The key to building habits is making them so easy you can't say no.",
  "Remember: You're not just building habits, you're building the person you want to become.",
  "Stay focused on your 'why'. When you know your purpose, discipline becomes easier.",
  "Don't break the chain! Your streak is your superpower. Protect it.",
  "Celebrate small wins! Each completed task is proof that you can do hard things.",
  "The best time to start was yesterday. The second best time is now. Let's go!",
  "Your future self will thank you for the discipline you show today.",
];

export const getCoachResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('motivat') || lowerMessage.includes('inspir')) {
    return "Here's some motivation for you: " + getRandomQuote() + "\n\nRemember, every champion was once a beginner. Keep pushing!";
  }
  
  if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('give up')) {
    return "I hear you. Rest is part of the journey, not the opposite of productivity. Take a break if you need it, but don't quit. Tomorrow is a new opportunity to show up stronger. 💪";
  }
  
  if (lowerMessage.includes('fail') || lowerMessage.includes('mess')) {
    return "Failure isn't the opposite of success—it's part of it. Every setback is a setup for a comeback. What matters is that you're still here, still trying. That takes courage.";
  }
  
  if (lowerMessage.includes('habit') || lowerMessage.includes('routine')) {
    return "Great habits are built one day at a time. Start small—so small it feels almost too easy. Stack new habits onto existing ones. And most importantly, never miss twice in a row.";
  }
  
  if (lowerMessage.includes('procrastinat')) {
    return "Procrastination often comes from feeling overwhelmed. Try the 2-minute rule: if a task takes less than 2 minutes, do it now. For bigger tasks, just commit to starting for 5 minutes. Action creates motivation!";
  }
  
  if (lowerMessage.includes('focus') || lowerMessage.includes('distract')) {
    return "Focus is a muscle—it gets stronger with practice. Try time-blocking your day, remove distractions, and work in focused sprints with breaks in between. Your environment shapes your behavior.";
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hey there, champion! 🌟 I'm your FITOX Coach, here to help you crush your goals and build unstoppable habits. What's on your mind today?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're very welcome! Remember, I'm always here to support your journey. Now go make today count! 🔥";
  }

  // Fitness & Body Building
  if (lowerMessage.includes('body') || lowerMessage.includes('muscle') || lowerMessage.includes('gym') || lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('fit')) {
    return "💪 Building your body is all about consistency! Here's my advice:\n\n1. **Start with basics** - Push-ups, squats, planks daily\n2. **Progressive overload** - Increase reps/weight weekly\n3. **Protein intake** - Eat protein with every meal\n4. **Sleep 7-8 hours** - Muscles grow during rest\n5. **Stay hydrated** - 3-4 liters water daily\n\nAdd 'Workout' as a daily habit in your tasks. Small daily efforts = massive transformation! 🔥";
  }

  // Weight Loss
  if (lowerMessage.includes('weight') || lowerMessage.includes('fat') || lowerMessage.includes('slim') || lowerMessage.includes('diet')) {
    return "🎯 Weight management is 80% nutrition, 20% exercise:\n\n1. **Calorie deficit** - Eat slightly less than you burn\n2. **Avoid processed foods** - Stick to whole foods\n3. **Walk 10k steps daily** - Simple but powerful\n4. **No sugary drinks** - Water, green tea, black coffee\n5. **Track your meals** - Awareness = control\n\nCreate a 'Healthy Eating' habit in your tasks. You've got this!";
  }

  // Study & Learning
  if (lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('exam') || lowerMessage.includes('read') || lowerMessage.includes('book')) {
    return "📚 Smart studying beats long studying:\n\n1. **Pomodoro Technique** - 25 min focus, 5 min break\n2. **Active recall** - Test yourself, don't just re-read\n3. **Teach others** - Best way to learn\n4. **Morning study** - Brain is freshest\n5. **Remove phone** - Out of sight, out of mind\n\nAdd a 'Study Session' task daily. Consistency > intensity!";
  }

  // Sleep
  if (lowerMessage.includes('sleep') || lowerMessage.includes('wake') || lowerMessage.includes('morning') || lowerMessage.includes('early')) {
    return "😴 Good sleep = Better performance:\n\n1. **Fixed schedule** - Same time daily, even weekends\n2. **No screens 1hr before bed** - Blue light kills sleep\n3. **Cool dark room** - Optimal for deep sleep\n4. **No caffeine after 2pm** - It stays in your system\n5. **Morning sunlight** - Resets your body clock\n\nMake 'Early Sleep' a tracked habit. Your energy will transform!";
  }

  // Stress & Mental Health
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('mental') || lowerMessage.includes('depress')) {
    return "🧘 Your mental health matters:\n\n1. **Deep breathing** - 4-7-8 technique calms instantly\n2. **Daily walk** - Nature heals the mind\n3. **Journal** - Write your thoughts out\n4. **Limit social media** - Compare less, live more\n5. **Talk to someone** - You're not alone\n\nAdd 'Mindfulness' to your daily habits. Small steps, big peace. ❤️";
  }

  // Productivity
  if (lowerMessage.includes('productive') || lowerMessage.includes('work') || lowerMessage.includes('task') || lowerMessage.includes('time')) {
    return "⚡ Productivity tips that actually work:\n\n1. **MIT First** - Do Most Important Task first\n2. **Time blocking** - Schedule everything\n3. **2-minute rule** - Quick tasks = do now\n4. **Batch similar tasks** - Less context switching\n5. **End-of-day review** - Plan tomorrow tonight\n\nUse FITOX to track your tasks. Small wins build momentum!";
  }

  // Goals
  if (lowerMessage.includes('goal') || lowerMessage.includes('target') || lowerMessage.includes('achieve') || lowerMessage.includes('success')) {
    return "🎯 Turn dreams into reality:\n\n1. **Be specific** - 'Lose 5kg' not 'lose weight'\n2. **Break it down** - Big goals → small daily tasks\n3. **Track progress** - What gets measured gets done\n4. **Celebrate wins** - Motivation fuel\n5. **Review weekly** - Adjust and keep going\n\nAdd your goals as tasks in FITOX. Let's make it happen! 🚀";
  }
  
  // Default - more helpful response
  return "Great question! 💡 I'm here to help with:\n\n• **Fitness** - Workouts, body building, weight loss\n• **Habits** - Building routines that stick\n• **Productivity** - Getting more done\n• **Study tips** - Learning effectively\n• **Mental wellness** - Stress, sleep, balance\n\nTry asking me something like:\n- 'How to build muscle?'\n- 'Tips for better sleep'\n- 'How to stay focused?'\n\nWhat would you like help with?";
};
