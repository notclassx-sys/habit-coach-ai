import { ChatBot } from '@/components/ChatBot';
import { ChatMessage } from '@/types';

interface ChatPageProps {
  messages: ChatMessage[];
  onSendMessage: (message: ChatMessage) => void;
}

export function ChatPage({ messages, onSendMessage }: ChatPageProps) {
  return (
    <div className="h-[calc(100vh-4rem)] pb-16">
      <ChatBot messages={messages} onSendMessage={onSendMessage} />
    </div>
  );
}
