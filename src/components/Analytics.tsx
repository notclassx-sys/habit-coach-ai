import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Task } from '@/types';

interface AnalyticsProps {
  tasks: Task[];
}

const COLORS = {
  Health: 'hsl(160, 84%, 45%)',
  Study: 'hsl(200, 80%, 55%)',
  Work: 'hsl(36, 100%, 55%)',
  Personal: 'hsl(280, 70%, 65%)',
};

export function Analytics({ tasks }: AnalyticsProps) {
  const weeklyData = useMemo(() => {
    const today = new Date();
    const days = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayTasks = tasks.filter(t => t.dueDate === dateStr);
      const completed = dayTasks.filter(t => t.status).length;
      const total = dayTasks.length;
      
      days.push({
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed,
        total,
      });
    }
    
    return days;
  }, [tasks]);

  const categoryData = useMemo(() => {
    const categories = ['Health', 'Study', 'Work', 'Personal'] as const;
    return categories.map(cat => ({
      name: cat,
      value: tasks.filter(t => t.category === cat && t.status).length,
      color: COLORS[cat],
    })).filter(c => c.value > 0);
  }, [tasks]);

  const completionRate = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter(t => t.status).length / tasks.length) * 100);
  }, [tasks]);

  return (
    <div className="space-y-4">
      <h2 className="font-display font-semibold text-lg">Weekly Analytics</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Completion Rate */}
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">Completion Rate</p>
          <p className="text-2xl font-display font-bold text-primary">{completionRate}%</p>
          <div className="w-full h-2 bg-secondary rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
        
        {/* Total Tasks */}
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <p className="text-xs text-muted-foreground mb-1">This Week</p>
          <p className="text-2xl font-display font-bold">{weeklyData.reduce((a, b) => a + b.completed, 0)}</p>
          <p className="text-xs text-muted-foreground">tasks completed</p>
        </div>
      </div>

      {/* Weekly Bar Chart */}
      <div className="bg-card rounded-xl border border-border/50 p-4">
        <p className="text-xs text-muted-foreground mb-3">Daily Progress</p>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barSize={20}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 10 }}
              />
              <YAxis hide />
              <Bar 
                dataKey="completed" 
                fill="hsl(160, 84%, 45%)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      {categoryData.length > 0 && (
        <div className="bg-card rounded-xl border border-border/50 p-4">
          <p className="text-xs text-muted-foreground mb-3">By Category</p>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <span className="font-medium">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}