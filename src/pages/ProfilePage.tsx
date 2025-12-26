import { LogOut, CheckCircle, Flame, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User, Task } from '@/types';
import { useMemo } from 'react';

interface ProfilePageProps {
  user: User | null;
  tasks: Task[];
  onLogout: () => void;
}

export function ProfilePage({ user, tasks, onLogout }: ProfilePageProps) {
  const stats = useMemo(() => {
    const totalCompleted = tasks.filter(t => t.status).length;
    
    // Calculate streak
    let streak = 0;
    const sortedDates = [...new Set(tasks.map(t => t.dueDate))].sort().reverse();
    for (const date of sortedDates) {
      const dayTasks = tasks.filter(t => t.dueDate === date);
      if (dayTasks.length > 0 && dayTasks.every(t => t.status)) {
        streak++;
      } else {
        break;
      }
    }
    
    const memberSince = user?.createdAt 
      ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      : 'Today';
    
    return { totalCompleted, streak, memberSince };
  }, [tasks, user]);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 overflow-x-hidden">
      <div className="w-full max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          {/* Avatar */}
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-display font-bold text-primary-foreground">
              {user?.name?.charAt(0)?.toUpperCase() || 'F'}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-xl flex items-center justify-center border-4 border-background">
              <CheckCircle className="w-4 h-4 text-success-foreground" />
            </div>
          </div>
          
          <div>
            <h1 className="font-display text-2xl font-bold">{user?.name || 'FITOX User'}</h1>
            <p className="text-muted-foreground">{user?.email || 'guest@fitox.app'}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-2xl border border-border/50 p-4 text-center">
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-success" />
            <p className="text-2xl font-display font-bold">{stats.totalCompleted}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 p-4 text-center">
            <Flame className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-display font-bold">{stats.streak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 p-4 text-center">
            <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-display font-bold">{stats.memberSince}</p>
            <p className="text-xs text-muted-foreground">Member Since</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          <div className="bg-card rounded-xl border border-border/50 divide-y divide-border/50">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-secondary/50 transition-colors rounded-t-xl">
              <div className="p-2 bg-secondary rounded-lg">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium">Settings</p>
                <p className="text-xs text-muted-foreground">App preferences</p>
              </div>
            </button>
          </div>
          
          <Button
            onClick={onLogout}
            variant="destructive"
            className="w-full h-14 rounded-xl gap-2"
          >
            <LogOut className="w-5 h-5" />
            {user ? 'Log Out' : 'Sign In'}
          </Button>
        </div>

        {/* App Info */}
        <div className="text-center pt-4">
          <p className="font-display font-bold text-lg text-gradient-primary">FITOX</p>
          <p className="text-xs text-muted-foreground">Build habits. Track progress. Stay motivated.</p>
          <p className="text-xs text-muted-foreground mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
