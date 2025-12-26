import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { getCoachResponse } from '@/lib/motivationalQuotes';

interface ChatBotProps {
  messages: ChatMessage[];
  onSendMessage: (message: ChatMessage) => void;
}

export function ChatBot({ messages, onSendMessage }: ChatBotProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    onSendMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getCoachResponse(userMessage.content);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      onSendMessage(assistantMessage);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="relative">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg">FITOX Coach</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI-powered habit mentor
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Bot className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Hey there, champion!</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                I'm your personal habit coach. Ask me for motivation, tips on building habits, or just chat about your goals!
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-fade-in",
                message.role === 'user' && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center",
                message.role === 'assistant' 
                  ? "bg-gradient-to-br from-primary to-accent" 
                  : "bg-secondary"
              )}>
                {message.role === 'assistant' 
                  ? <Bot className="w-4 h-4 text-primary-foreground" />
                  : <User className="w-4 h-4 text-foreground" />
                }
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.role === 'assistant'
                  ? "bg-secondary/70 rounded-tl-sm"
                  : "bg-primary text-primary-foreground rounded-tr-sm"
              )}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                <p className={cn(
                  "text-[10px] mt-1",
                  message.role === 'assistant' ? "text-muted-foreground" : "text-primary-foreground/70"
                )}>
                  {new Date(message.timestamp).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-secondary/70 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Ask your coach anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-secondary/50 border-border/50"
          />
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-primary hover:bg-primary/90 px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
