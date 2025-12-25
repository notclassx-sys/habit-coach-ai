import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskTable } from '@/components/TaskTable';
import { AddTaskModal } from '@/components/AddTaskModal';
import { EditTaskModal } from '@/components/EditTaskModal';
import { Task } from '@/types';

interface TasksPageProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'userId' | 'createdAt'>) => void;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onToggleStatus: (taskId: string) => void;
  addModalOpen: boolean;
  setAddModalOpen: (open: boolean) => void;
}

export function TasksPage({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleStatus,
  addModalOpen,
  setAddModalOpen,
}: TasksPageProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setEditModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold">Your Tasks</h1>
            <p className="text-muted-foreground text-sm">Manage your habits and to-dos</p>
          </div>
          <Button 
            onClick={() => setAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {/* Task Table */}
        <TaskTable
          tasks={tasks}
          onToggleStatus={onToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={onDeleteTask}
        />

        {/* Modals */}
        <AddTaskModal
          open={addModalOpen}
          onOpenChange={setAddModalOpen}
          onAddTask={onAddTask}
        />
        
        <EditTaskModal
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          task={editingTask}
          onUpdateTask={onUpdateTask}
        />
      </div>
    </div>
  );
}
