'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi — I'm Tanzir's AI companion. I can help with questions about his projects, experience, skills, or portfolio. Ask me anything to get started!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [windowHeight, setWindowHeight] = useState('100dvh');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle mobile viewport height changes when keyboard opens/closes
  useEffect(() => {
    if (!isOpen) return;

    const updateHeight = () => {
      if (window.innerWidth < 640) {
        const visualViewport = window.visualViewport;
        if (visualViewport) {
          const vh = `${visualViewport.height}px`;
          setWindowHeight(vh);

          if (containerRef.current) {
            containerRef.current.style.height = vh;
            containerRef.current.style.top = `${visualViewport.offsetTop}px`;
          }

          // ensure layout finished then scroll to last message
          requestAnimationFrame(() => {
            // slight delay helps on some Android/iOS keyboards
            setTimeout(() => {
              messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 50);
          });
        }
      }
    };

    // Only add visual viewport listeners for mobile
    if (window.innerWidth < 640) {
      const visualViewport = window.visualViewport;
      if (visualViewport) {
        visualViewport.addEventListener('resize', updateHeight);
        visualViewport.addEventListener('scroll', updateHeight);
        updateHeight();

        return () => {
          visualViewport.removeEventListener('resize', updateHeight);
          visualViewport.removeEventListener('scroll', updateHeight);
        };
      }
    }
  }, [isOpen]);

  // Reset height when closing
  useEffect(() => {
    if (!isOpen) {
      setWindowHeight('100dvh');
    }
  }, [isOpen]);

  // Auto-focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        // scroll after focus so keyboard-induced layout is handled
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 50);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);
    setMessages([...newMessages, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(msg => ({ role: msg.role, content: msg.content })),
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setIsLoading(false);
            break;
          }
          const chunk = decoder.decode(value, { stream: true });
          accumulatedContent += chunk;
          setMessages([...newMessages, { role: 'assistant', content: accumulatedContent }]);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: "I apologize, but I'm currently unable to respond. Please feel free to explore the website to learn more about Tanzir's experience, projects, and skills. You can also reach out directly via email at mailme.tanzir@gmail.com or connect on GitHub.",
        },
      ]);
      setIsLoading(false);
    }
  };

  // Responsive dimensions
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
  const headerHeight = isMobile ? 62 : 52;
  const inputHeight = isMobile ? 88 : 72;
  const messagesHeight = isMobile 
    ? `calc(${windowHeight} - ${headerHeight + inputHeight}px)`
    : `calc(100% - ${headerHeight + inputHeight}px)`;

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${
          isMobile ? 'w-14 h-14' : 'w-12 h-12'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className={isMobile ? "w-7 h-7" : "w-5 h-5"} />
        <span className={`absolute bg-green-500 rounded-full border-background ${
          isMobile 
            ? '-top-1 -right-1 flex h-4 w-4 border-4' 
            : '-top-0.5 -right-0.5 flex h-3 w-3 border-2'
        }`}>
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        </span>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          {isMobile && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Chat Container */}
          <div
            ref={containerRef}
            className={`
              fixed z-50 bg-card flex flex-col shadow-2xl border-border overflow-hidden
              font-[var(--font-outfit)]
              ${isMobile 
                ? 'inset-x-0 bottom-0 w-full border-t' 
                : 'bottom-6 right-6 w-96 h-[600px] max-h-[calc(100vh-3rem)] rounded-lg border'
              }
            `}
            style={{
              height: isMobile ? windowHeight : '600px',
              maxHeight: isMobile ? windowHeight : 'calc(100vh - 3rem)',
            }}
          >
            {/* Header */}
            <div 
              className="bg-primary text-primary-foreground px-4 flex items-center justify-between border-b border-border/20 flex-shrink-0 sticky top-0 z-10"
              style={{ height: `${headerHeight}px` }}
            >
              <div className="flex items-center gap-3">
                <div className={`relative bg-background rounded-full flex items-center justify-center border border-primary-foreground/30 ${
                  isMobile ? 'w-10 h-10 border-2' : 'w-8 h-8'
                }`}>
                  <MessageCircle className={isMobile ? "w-5 h-5" : "w-4 h-4 text-primary"} />
                  <span className={`absolute bg-green-500 rounded-full border-primary ${
                    isMobile ? '-bottom-0.5 -right-0.5 w-3 h-3 border-2' : '-bottom-0.5 -right-0.5 w-2.5 h-2.5 border-2'
                  }`}></span>
                </div>
                <div>
                  <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-sm tracking-tight leading-none'}`}>
                    AI Companion
                  </h3>
                  <p className={`text-primary-foreground/70 flex items-center gap-1.5 ${
                    isMobile ? 'text-xs' : 'text-xs font-normal mt-1'
                  }`}>
                    <span className={`inline-block rounded-full bg-green-500 animate-pulse ${
                      isMobile ? 'w-1.5 h-1.5' : 'w-1 h-1'
                    }`}></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-all hover:rotate-90 duration-300"
                aria-label="Close chat"
              >
                <X className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              style={{ 
                height: messagesHeight,
                maxHeight: messagesHeight
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground border border-border'
                    } ${isMobile ? 'rounded-2xl' : 'rounded-md'}`}
                  >
                    {message.role === 'user' ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    ) : (
                      <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            code: ({ children, className }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="bg-background/50 px-1.5 py-0.5 rounded text-xs font-mono border border-border">
                                  {children}
                                </code>
                              ) : (
                                <code className="block bg-background/50 p-2 rounded text-xs font-mono border border-border overflow-x-auto my-2">
                                  {children}
                                </code>
                              );
                            },
                            pre: ({ children }) => <pre className="my-2 overflow-x-auto">{children}</pre>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            a: ({ children, href }) => (
                              <a 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-primary underline hover:text-primary/80 transition-colors"
                              >
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => <h1 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-semibold mb-2 mt-3 first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 mt-2 first:mt-0">{children}</h3>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div 
              className="bg-card border-t border-border flex-shrink-0"
              style={{ height: `${inputHeight}px` }}
            >
              <form
                onSubmit={handleSendMessage}
                className="p-4"
                style={{ 
                  paddingBottom: isMobile ? 'max(env(safe-area-inset-bottom, 1rem), 1rem)' : '1rem'
                }}
              >
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    disabled={isLoading}
                    style={{
                      paddingTop: isMobile ? '12px' : '8px',
                      paddingBottom: isMobile ? '12px' : '8px',
                      borderRadius: isMobile ? '16px' : '8px',
                      fontSize: '14px'
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                    aria-label="Send"
                    style={{
                      padding: isMobile ? '12px' : '8px',
                      borderRadius: isMobile ? '16px' : '8px',
                    }}
                  >
                    <Send className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}