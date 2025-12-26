import { NavLink, useLocation } from 'react-router-dom';
import { Home, ListTodo, MessageCircle, User, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { User as UserType } from '@/types';

interface BottomNavProps {
  user: UserType | null;
}

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/tasks', icon: ListTodo, label: 'Tasks' },
  { path: '/chat', icon: MessageCircle, label: 'AI Coach' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav({ user }: BottomNavProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-border/50 safe-area-bottom overflow-x-hidden">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 transition-transform duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
        
        {!user && (
          <NavLink
            to="/auth"
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
              location.pathname === '/auth'
                ? "text-accent bg-accent/10"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] font-medium">Login</span>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
