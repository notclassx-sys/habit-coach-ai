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
  
  // Default response
  return coachResponses[Math.floor(Math.random() * coachResponses.length)];
};
