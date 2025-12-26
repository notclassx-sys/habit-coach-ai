import { useState, useCallback } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { DashboardPage } from "@/pages/DashboardPage";
import { TasksPage } from "@/pages/TasksPage";
import { ChatPage } from "@/pages/ChatPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AuthPage } from "@/pages/AuthPage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { User, Task, ChatMessage } from "@/types";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useLocalStorage<User | null>('fitox_user', null);
  const [tasks, setTasks] = useLocalStorage<Task[]>('fitox_tasks', []);
  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessage[]>('fitox_chat', []);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

  const handleLogin = useCallback((newUser: User) => {
    setUser(newUser);
  }, [setUser]);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  const handleAddTask = useCallback((taskData: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      userId: user?.id || 'guest',
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  }, [user, setTasks]);

  const handleUpdateTask = useCallback((updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  }, [setTasks]);

  const handleDeleteTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  }, [setTasks]);

  const handleToggleStatus = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: !t.status } : t));
  }, [setTasks]);

  const handleSendMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  }, [setChatMessages]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <DashboardPage user={user} tasks={tasks} onAddTask={() => setAddTaskModalOpen(true)} /> : <AuthPage onLogin={handleLogin} />} />
            <Route path="/tasks" element={
              user ? (
                <TasksPage 
                  tasks={tasks} 
                  onAddTask={handleAddTask}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                  onToggleStatus={handleToggleStatus}
                  addModalOpen={addTaskModalOpen}
                  setAddModalOpen={setAddTaskModalOpen}
                />
              ) : <AuthPage onLogin={handleLogin} />
            } />
            <Route path="/chat" element={user ? <ChatPage messages={chatMessages} onSendMessage={handleSendMessage} /> : <AuthPage onLogin={handleLogin} />} />
            <Route path="/profile" element={user ? <ProfilePage user={user} tasks={tasks} onLogout={handleLogout} /> : <AuthPage onLogin={handleLogin} />} />
            <Route path="/auth" element={<AuthPage onLogin={handleLogin} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {user && <BottomNav user={user} />}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
