Original name: AiAssistant.tsx
Drive ID: 1RCiMrW6qGIlvdVRtDJhXPLNBMWiGipSA
Parent folder: My Drive/MAF/Google AI Studio 1/t.h.e.l.m.a.-ai-core-&-modules (2)/components/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Mic, Volume2, VolumeX, Sparkles, Cpu, Shield, 
  Terminal, Zap, Globe, Map, Brain, Podcast, ArrowRight,
  ShieldAlert, CheckCircle, Info, ChevronRight, Lock, 
  Truck, CloudRain, AlertTriangle, Route, Clock,
  Book, Activity, Target, Eye, Navigation, MapPin
} from 'lucide-react';
import { ModuleType, ChatMessage, AgentType, AlertLevel, CortexAction, SystemAlert, LoadTicket, PersonalitySignature } from '../types';
import { sendMessageToGemini, getActiveAgent, generateSpeech } from '../services/geminiService';

interface AiAssistantProps {
  currentModule: ModuleType;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onCommand: (cmd: string, params?: any) => void;
  alertLevel: AlertLevel;
  activeAlert?: SystemAlert | null;
  onDismissAlert?: () => void;
  userPersonality?: PersonalitySignature;
  onVocalize?: (text: string) => void;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ 
  currentModule, 
  isOpen, 
  setIsOpen, 
  onCommand, 
  alertLevel, 
  activeAlert,
  onDismissAlert,
  userPersonality,
  onVocalize
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false); // Live Audio State
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeAgent = getActiveAgent(currentModule);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  // CO-PILOT ALERT INTERCEPTION
  useEffect(() => {
    if (activeAlert) {
      const alertMsg: ChatMessage = {
        id: `alert-${activeAlert.id}`,
        role: 'model',
        content: `ADVISORY: I have detected a ${activeAlert.type} deviation. ${activeAlert.message}.`,
        timestamp: new Date(),
        agent: AgentType.SENTINEL,
        systemTimestamp: activeAlert.timestamp,
        actionCard: {
          id: `act-${activeAlert.id}`,
          type: 'NAVIGATE',
          message: `Would you like me to shift the command node to ${activeAlert.module.replace('_', ' ')}?`,
          timestamp: new Date().toISOString()
        }
      };
      setMessages(prev => {
          if (prev.find(m => m.id === alertMsg.id)) return prev;
          return [...prev, alertMsg];
      });
      if (onVocalize) onVocalize(alertMsg.content);
    }
  }, [activeAlert, onVocalize]);

  const handleSend = async (manualInput?: string) => {
    const textToSend = manualInput || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { 
        id: Date.now().toString(), 
        role: 'user', 
        content: textToSend, 
        timestamp: new Date(),
        systemTimestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const upperText = textToSend.toUpperCase();

    // Semantic Co-Pilot Hook: "Show Me" / "Take me to it"
    if (upperText.includes("SHOW ME") || upperText.includes("TAKE ME") || upperText.includes("GO TO")) {
        let destination: ModuleType | null = null;
        
        if ((upperText.includes("IT") || upperText.includes("ALERT") || upperText.includes("ISSUE")) && activeAlert) {
            destination = activeAlert.module;
        } else if (upperText.includes("FLEET")) destination = ModuleType.FLEET;
        else if (upperText.includes("PAYROLL")) destination = ModuleType.PAYROLL;
        else if (upperText.includes("MAINTENANCE")) destination = ModuleType.MAINTENANCE;
        else if (upperText.includes("IT") || upperText.includes("INFRA")) destination = ModuleType.IT_CONTROL;
        else if (upperText.includes("LOAD") || upperText.includes("DISPATCH")) destination = ModuleType.DISPATCH;

        if (destination) {
            onCommand('NAVIGATE', destination);
            const responseText = `Command Focus shifted to ${destination.replace('_', ' ')}. Visual link established.`;
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                content: responseText,
                timestamp: new Date(),
                agent: AgentType.THELMA,
                systemTimestamp: new Date().toISOString()
            }]);
            setIsTyping(false);
            if (onVocalize) onVocalize(responseText);
            setIsOpen(false); // Close on direct navigation command
            return;
        }
    }

    // Reporting protocol: strictly rely on federation data
    if (upperText.includes("REPORT") || upperText.includes("SUMMARY") || upperText.includes("HOW ARE WE DOING")) {
        const report = `FEDERATION STATUS SUMMARY (v4.0.0): Global Mesh Integrity is at 100%. Fleet Revenue yield is 1.42M. Project Z Gravitic Link is stable. P.E.R.C.Y. reports zero ingress threats. Shall I take you to the Maintenance hub for the F-101 issue?`;
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'model',
                content: report,
                timestamp: new Date(),
                agent: AgentType.THELMA,
                systemTimestamp: new Date().toISOString()
            }]);
            setIsTyping(false);
            if (onVocalize) onVocalize(report);
        }, 800);
        return;
    }

    const result = await sendMessageToGemini(textToSend, [], currentModule);
    if (result) {
        const responseText = result.text || "Mesh Synchronized.";
        setMessages(prev => [...prev, { 
            id: (Date.now() + 1).toString(), 
            role: 'model', 
            content: responseText, 
            timestamp: new Date(), 
            agent: activeAgent,
            systemTimestamp: new Date().toISOString()
        }]);
        if (onVocalize) onVocalize(responseText);
    }
    setIsTyping(false);
  };

  const handleAction = (action: CortexAction, decision: 'ACCEPT' | 'IGNORE') => {
    if (decision === 'ACCEPT') {
        if (action.type === 'NAVIGATE' && activeAlert) {
            onCommand('TAKE_ME_TO_ALERT');
        }
    }
    if (onDismissAlert) onDismissAlert();
    setIsOpen(false); // Auto-close assistant on action
  };

  const toggleLiveMode = () => {
      setIsLiveMode(!isLiveMode);
      if(!isLiveMode && onVocalize) onVocalize("Native Audio Channel Open. I am listening.");
  }

  return (
    <>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[200] cursor-pointer transition-all duration-700 group flex items-center justify-center animate-orb-float"
      >
        <div className={`relative w-16 h-16 rounded-full transition-all duration-700 flex items-center justify-center overflow-hidden
            ${alertLevel === 'WARNING' ? 'bg-amber-500 shadow-[0_0_40px_#f59e0b]' :
              'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_30px_rgba(59,130,246,0.6)]'}
        `}>
            <div className={`absolute inset-0 flex items-center justify-center text-white font-black text-[9px] tracking-tighter ${isTyping ? 'animate-pulse' : ''}`}>
                {isTyping ? <Activity size={24} /> : 'COPILOT'}
            </div>
            {alertLevel === 'WARNING' && (
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-600 rounded-full border-2 border-white animate-pulse"></div>
            )}
        </div>
      </div>

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[340px] cortex-gradient z-[190] border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.4)] flex flex-col transition-transform duration-500 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5 shrink-0">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg"><Terminal size={16} className="text-white" /></div>
                <div>
                    <h3 className="text-white font-black text-[10px] uppercase tracking-widest leading-none">Cortex Link</h3>
                    <p className="text-[8px] text-emerald-400 uppercase tracking-widest font-black mt-1">v4.0.0 Neural Mesh</p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-blue-400 p-2 transition-colors flex items-center gap-1 group">
                <span className="text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">CLOSE</span>
                <ArrowRight size={24} className="text-white group-hover:text-blue-400" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
            {messages.length === 0 && (
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl animate-fadeIn">
                    <p className="text-emerald-400 font-black text-[9px] uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Sparkles size={10}/> Global Mesh Sync Complete
                    </p>
                    <p className="text-white/70 text-xs leading-relaxed italic font-medium">
                        "Architect Henry, systems are green. Project Z gravitic link is holding at 99.9%. Fleet Yield is 1.42M. The Federation is ready for your command."
                    </p>
                </div>
            )}

            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] rounded-2xl p-4 text-xs transition-all ${
                        msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-lg font-bold' : 'bg-white/10 text-white border border-white/10 rounded-tl-none backdrop-blur-md font-medium'
                    }`}>
                        {msg.role === 'model' && (
                            <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 mb-2 uppercase">
                                <Shield size={10}/> {msg.agent}
                            </div>
                        )}
                        <p className="leading-relaxed">{msg.content}</p>
                        
                        {msg.actionCard && (
                            <div className="mt-4 p-4 bg-slate-900/90 rounded-xl border border-blue-500/30 space-y-4 shadow-xl">
                                <div className="flex justify-between items-center text-[8px] font-black text-slate-500 uppercase tracking-widest">
                                    <span>Tactical Advisory</span>
                                    <span className="text-blue-500">Manual Override</span>
                                </div>
                                <p className="text-[10px] text-slate-300 font-medium leading-relaxed">{msg.actionCard.message}</p>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleAction(msg.actionCard!, 'ACCEPT')}
                                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
                                    >
                                        <Eye size={12}/> Show Me
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex space-x-2 border border-white/5">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Live Audio & Input Area */}
        <div className={`p-5 bg-black/30 border-t border-white/10 space-y-4 shrink-0 backdrop-blur-xl transition-all ${isLiveMode ? 'border-t-4 border-t-red-500' : ''}`}>
            
            {isLiveMode && (
                <div className="flex items-center justify-between mb-2 animate-fadeIn">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live Audio Channel Open</span>
                    </div>
                    <div className="flex gap-1 h-3 items-end">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-1 bg-red-500 rounded-full animate-[bounce_1s_infinite]" style={{ animationDelay: `${i * 0.1}s`, height: '100%' }}></div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-[22px] border border-white/10 focus-within:border-blue-500 transition-all shadow-inner">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                    placeholder={isLiveMode ? "Listening..." : "Direct Co-Pilot..."} 
                    className="flex-1 bg-transparent border-0 px-3 py-1.5 text-xs text-white focus:ring-0 focus:outline-none placeholder:text-white/20 font-bold uppercase tracking-tight" 
                />
                <button onClick={() => handleSend()} className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-transform active:scale-95">
                    <Send size={16} />
                </button>
            </div>
            <div className="flex justify-around pb-2 opacity-40">
                <button 
                    onClick={toggleLiveMode}
                    className={`text-white transition-all p-2 rounded-lg hover:bg-white/5 ${isLiveMode ? 'text-red-500 scale-110 bg-white/10' : 'hover:text-blue-400'}`}
                >
                    <Mic size={18}/>
                </button>
                <button className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5"><Navigation size={18}/></button>
                <button className="text-white hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-white/5"><Globe size={18}/></button>
            </div>
        </div>
      </div>
    </>
  );
};

export default AiAssistant;
