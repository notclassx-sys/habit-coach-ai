export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  createdAt: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  category: 'Health' | 'Study' | 'Work' | 'Personal';
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  status: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type TabType = 'dashboard' | 'tasks' | 'chat' | 'profile';
