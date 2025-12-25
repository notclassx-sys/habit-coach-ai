import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'default' | 'primary' | 'accent' | 'success';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = 'default',
  className 
}: StatsCardProps) {
  const variantStyles = {
    default: 'bg-card border-border',
    primary: 'bg-primary/10 border-primary/20',
    accent: 'bg-accent/10 border-accent/20',
    success: 'bg-success/10 border-success/20',
  };

  const iconStyles = {
    default: 'text-muted-foreground bg-secondary',
    primary: 'text-primary bg-primary/20',
    accent: 'text-accent bg-accent/20',
    success: 'text-success bg-success/20',
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-display tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-xl",
          iconStyles[variant]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div 
        className={cn(
          "absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl",
          variant === 'primary' && "bg-primary",
          variant === 'accent' && "bg-accent",
          variant === 'success' && "bg-success",
          variant === 'default' && "bg-muted-foreground"
        )}
      />
    </div>
  );
}
