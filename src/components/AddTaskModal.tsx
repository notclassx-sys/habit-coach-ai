import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Task } from '@/types';

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => void;
}

export function AddTaskModal({ open, onOpenChange, onAddTask }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Task['category']>('Personal');
  const [priority, setPriority] = useState<Task['priority']>('Medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      category,
      priority,
      dueDate,
      status: false,
    });

    // Reset form
    setTitle('');
    setCategory('Personal');
    setPriority('Medium');
    setDueDate(new Date().toISOString().split('T')[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-strong border-border/50">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            Add New Task
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Task Name</Label>
            <Input
              id="title"
              placeholder="e.g., Morning meditation"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary/50 border-border/50"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Task['category'])}>
                <SelectTrigger className="bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Health">🏃 Health</SelectItem>
                  <SelectItem value="Study">📚 Study</SelectItem>
                  <SelectItem value="Work">💼 Work</SelectItem>
                  <SelectItem value="Personal">🎯 Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Task['priority'])}>
                <SelectTrigger className="bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">🟢 Low</SelectItem>
                  <SelectItem value="Medium">🟡 Medium</SelectItem>
                  <SelectItem value="High">🔴 High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-secondary/50 border-border/50"
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
