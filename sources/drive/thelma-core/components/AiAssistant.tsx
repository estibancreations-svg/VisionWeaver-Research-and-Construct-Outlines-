Original name: AiAssistant.tsx
Drive ID: 1AYIcRY6e0Dx7hadZ-m_zVYoIv5JAS1_2
Parent folder: thelma-core/components/
Modified: 2026-01-23T02:31:57.000Z


import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Mic, Volume2, VolumeX, Sparkles, Cpu, Shield, GraduationCap, Activity } from 'lucide-react';
import { ModuleType, ChatMessage, AgentType } from '../types';
import { sendMessageToGemini, getActiveAgent } from '../services/geminiService';

interface AiAssistantProps {
  currentModule: ModuleType;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ currentModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeAgent = getActiveAgent(currentModule);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  useEffect(() => {
    const initialAgent = getActiveAgent(currentModule);
    setMessages(prev => [
      ...prev,
      {
        id: `switch-${Date.now()}`,
        role: 'model',
        content: `Agent Handover: ${initialAgent} is now active for ${currentModule.replace('_', ' ')}.`,
        timestamp: new Date(),
        agent: initialAgent
      }
    ]);
  }, [currentModule]);

  const handleSpeak = (text: string) => {
    if (audioEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Female'));
      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1;
      utterance.rate = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
    const responseText = await sendMessageToGemini(input, history, currentModule);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', content: responseText, timestamp: new Date(), agent: activeAgent };
    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
    handleSpeak(responseText);
  };

  const getAgentIcon = (agent: AgentType | undefined) => {
    switch (agent) {
      case AgentType.HENRY: return <Activity size={16} />;
      case AgentType.LILY: return <GraduationCap size={16} />;
      case AgentType.PERCY: return <Shield size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  const getAgentColor = (agent: AgentType | undefined) => {
      switch (agent) {
        case AgentType.HENRY: return 'bg-blue-600';
        case AgentType.LILY: return 'bg-emerald-600';
        case AgentType.PERCY: return 'bg-slate-700';
        default: return 'bg-indigo-600';
      }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-40 transition-all duration-300 ${isOpen ? 'scale-0' : `scale-100 ${getAgentColor(activeAgent)} hover:opacity-90 text-white`}`}>
        <MessageSquare size={24} />
      </button>
      <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl z-50 flex flex-col transition-all duration-300 border border-slate-200 ${isOpen ? 'opacity-100 translate-y-0 h-[600px]' : 'opacity-0 translate-y-12 h-0 pointer-events-none'}`}>
        <div className={`p-4 text-white rounded-t-xl flex justify-between items-center transition-colors duration-300 ${getAgentColor(activeAgent)}`}>
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
                {getAgentIcon(activeAgent)}
            </div>
            <div>
              <h3 className="font-bold text-sm">{activeAgent}</h3>
              <p className="text-[10px] text-white/80 uppercase tracking-wider">{currentModule.replace('_', ' ')} Agent</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <button onClick={() => { setAudioEnabled(!audioEnabled); if (audioEnabled) window.speechSynthesis.cancel(); }} className="text-white/70 hover:text-white">{audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white"><X size={20} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'}`}>
                {msg.role === 'model' && msg.agent && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                        {getAgentIcon(msg.agent)} {msg.agent}
                    </div>
                )}
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-3 rounded-lg rounded-bl-none shadow-sm flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t border-slate-200 rounded-b-xl">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Mic size={20} /></button>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={`Ask ${activeAgent}...`} className="flex-1 bg-slate-100 border-0 rounded-full px-4 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiAssistant;
