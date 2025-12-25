import { Plus, ClipboardList, Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onAddTask: () => void;
  onViewTable: () => void;
  onOpenChat: () => void;
}

export function QuickActions({ onAddTask, onViewTable, onOpenChat }: QuickActionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          onClick={onAddTask}
          className="h-auto py-4 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl group"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="p-2 bg-primary-foreground/20 rounded-lg">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold">Add Task</p>
              <p className="text-xs opacity-80">Create new habit</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Button>
        
        <Button
          onClick={onViewTable}
          variant="secondary"
          className="h-auto py-4 px-4 bg-secondary hover:bg-secondary/80 rounded-xl group"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold">View Table</p>
              <p className="text-xs text-muted-foreground">Manage tasks</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Button>
        
        <Button
          onClick={onOpenChat}
          variant="secondary"
          className="h-auto py-4 px-4 bg-gradient-to-r from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 border border-accent/20 rounded-xl group"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Bot className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold">AI Coach</p>
              <p className="text-xs text-muted-foreground">Get motivated</p>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Button>
      </div>
    </div>
  );
}
