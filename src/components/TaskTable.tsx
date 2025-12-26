import { useState } from 'react';
import { Check, Pencil, Trash2, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Task } from '@/types';

interface TaskTableProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

type SortField = 'priority' | 'dueDate' | 'status';
type FilterCategory = 'All' | Task['category'];
type FilterPriority = 'All' | Task['priority'];

const priorityOrder = { High: 0, Medium: 1, Low: 2 };
const priorityColors = {
  High: 'bg-destructive/20 text-destructive border-destructive/30',
  Medium: 'bg-warning/20 text-warning border-warning/30',
  Low: 'bg-success/20 text-success border-success/30',
};

const categoryEmojis = {
  Health: '🏃',
  Study: '📚',
  Work: '💼',
  Personal: '🎯',
};

export function TaskTable({ tasks, onToggleStatus, onEditTask, onDeleteTask }: TaskTableProps) {
  const [sortField, setSortField] = useState<SortField>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('All');
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('All');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (filterCategory !== 'All' && task.category !== filterCategory) return false;
      if (filterPriority !== 'All' && task.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      // First sort by status (pending first)
      if (a.status !== b.status) {
        return a.status ? 1 : -1;
      }

      let comparison = 0;
      switch (sortField) {
        case 'priority':
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'status':
          comparison = (a.status ? 1 : 0) - (b.status ? 1 : 0);
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Category: {filterCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {['All', 'Health', 'Study', 'Work', 'Personal'].map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => setFilterCategory(cat as FilterCategory)}>
                {cat !== 'All' && categoryEmojis[cat as Task['category']]} {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Priority: {filterPriority}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {['All', 'High', 'Medium', 'Low'].map((pri) => (
              <DropdownMenuItem key={pri} onClick={() => setFilterPriority(pri as FilterPriority)}>
                {pri}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/50 overflow-hidden glass">
        <div className="overflow-x-auto scrollbar-hide w-full">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="w-12">✔</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center gap-1">
                    Priority <SortIcon field="priority" />
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="flex items-center gap-1">
                    Date <SortIcon field="dueDate" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                    No tasks found. Add your first habit!
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedTasks.map((task) => (
                  <TableRow 
                    key={task.id} 
                    className={cn(
                      "border-border/30 transition-all duration-200",
                      task.status && "opacity-60"
                    )}
                  >
                    <TableCell>
                      <Checkbox
                        checked={task.status}
                        onCheckedChange={() => onToggleStatus(task.id)}
                        className="border-primary data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                    <TableCell className={cn(
                      "font-medium",
                      task.status && "line-through text-muted-foreground"
                    )}>
                      {task.title}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {categoryEmojis[task.category]} {task.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn("font-medium", priorityColors[task.priority])}
                      >
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(task.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={task.status ? "default" : "secondary"}
                        className={task.status ? "bg-success text-success-foreground" : ""}
                      >
                        {task.status ? 'Done' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                          onClick={() => onEditTask(task)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => onDeleteTask(task.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
