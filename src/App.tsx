import { useState, useCallback, useEffect } from 'react';
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
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import NotFound from "./pages/NotFound";
import { toast } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [chatMessages, setChatMessages] = useLocalStorage<ChatMessage[]>('fitox_chat', []);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        if (session?.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            profileImage: session.user.user_metadata?.avatar_url || '',
            createdAt: session.user.created_at,
          });
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          profileImage: session.user.user_metadata?.avatar_url || '',
          createdAt: session.user.created_at,
        });
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch tasks from database
  useEffect(() => {
    if (session?.user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [session]);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    const formattedTasks: Task[] = data.map(task => ({
      id: task.id,
      userId: task.user_id,
      title: task.title,
      category: task.category,
      priority: task.priority as 'low' | 'medium' | 'high',
      dueDate: task.due_date || undefined,
      timeSlot: task.time_slot || undefined,
      status: task.status === 'completed',
      createdAt: task.created_at,
    }));

    setTasks(formattedTasks);
  };

  const handleLogin = useCallback(() => {
    // Session will be updated by onAuthStateChange
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setTasks([]);
  }, []);

  const handleAddTask = useCallback(async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt'>) => {
    if (!session?.user) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: session.user.id,
        title: taskData.title,
        category: taskData.category,
        priority: taskData.priority,
        due_date: taskData.dueDate || null,
        time_slot: taskData.timeSlot || null,
        status: taskData.status ? 'completed' : 'pending',
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
      return;
    }

    const newTask: Task = {
      id: data.id,
      userId: data.user_id,
      title: data.title,
      category: data.category,
      priority: data.priority as 'low' | 'medium' | 'high',
      dueDate: data.due_date || undefined,
      timeSlot: data.time_slot || undefined,
      status: data.status === 'completed',
      createdAt: data.created_at,
    };

    setTasks(prev => [newTask, ...prev]);
    toast.success('Task added!');
  }, [session]);

  const handleUpdateTask = useCallback(async (updatedTask: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        title: updatedTask.title,
        category: updatedTask.category,
        priority: updatedTask.priority,
        due_date: updatedTask.dueDate || null,
        time_slot: updatedTask.timeSlot || null,
        status: updatedTask.status ? 'completed' : 'pending',
      })
      .eq('id', updatedTask.id);

    if (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
      return;
    }

    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  }, []);

  const handleDeleteTask = useCallback(async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
      return;
    }

    setTasks(prev => prev.filter(t => t.id !== taskId));
    toast.success('Task deleted');
  }, []);

  const handleToggleStatus = useCallback(async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newStatus = !task.status;

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus ? 'completed' : 'pending' })
      .eq('id', taskId);

    if (error) {
      toast.error('Failed to update task');
      console.error('Error toggling task:', error);
      return;
    }

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  }, [tasks]);

  const handleSendMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
  }, [setChatMessages]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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