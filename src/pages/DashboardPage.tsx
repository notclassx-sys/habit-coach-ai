import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Flame, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { QuoteCard } from '@/components/QuoteCard';
import { QuickActions } from '@/components/QuickActions';
import { Task, User } from '@/types';
import { getRandomQuote } from '@/lib/motivationalQuotes';
import { useMemo } from 'react';

interface DashboardPageProps {
  user: User | null;
  tasks: Task[];
  onAddTask: () => void;
}

export function DashboardPage({ user, tasks, onAddTask }: DashboardPageProps) {
  const navigate = useNavigate();
  
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(t => t.dueDate === today);
    const completedToday = todayTasks.filter(t => t.status).length;
    const pendingToday = todayTasks.filter(t => !t.status).length;
    const totalCompleted = tasks.filter(t => t.status).length;
    
    // Calculate streak (consecutive days with all tasks completed)
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
    
    return { completedToday, pendingToday, totalCompleted, streak };
  }, [tasks]);

  const quote = useMemo(() => getRandomQuote(), []);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="font-display text-3xl font-bold">
            {user ? `Hey, ${user.name.split(' ')[0]}!` : 'Welcome to FITOX'}
          </h1>
          <p className="text-muted-foreground">Let's crush your goals today.</p>
        </div>

        {/* Quote */}
        <QuoteCard quote={quote} />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="Completed Today"
            value={stats.completedToday}
            subtitle="tasks done"
            icon={CheckCircle}
            variant="success"
          />
          <StatsCard
            title="Pending"
            value={stats.pendingToday}
            subtitle="tasks remaining"
            icon={Clock}
            variant="accent"
          />
          <StatsCard
            title="Current Streak"
            value={stats.streak}
            subtitle="days strong"
            icon={Flame}
            variant="primary"
          />
          <StatsCard
            title="Total Done"
            value={stats.totalCompleted}
            subtitle="all time"
            icon={TrendingUp}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions
          onAddTask={onAddTask}
          onViewTable={() => navigate('/tasks')}
          onOpenChat={() => navigate('/chat')}
        />
      </div>
    </div>
  );
}
