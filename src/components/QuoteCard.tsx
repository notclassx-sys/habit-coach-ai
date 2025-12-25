import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quote: string;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 border border-primary/20 p-6">
      <div className="absolute top-4 left-4 opacity-20">
        <Quote className="w-8 h-8 text-primary" />
      </div>
      
      <div className="relative z-10">
        <p className="text-sm font-medium text-muted-foreground mb-2">Daily Motivation</p>
        <p className="text-base md:text-lg font-medium leading-relaxed italic text-foreground/90">
          "{quote}"
        </p>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
    </div>
  );
}
