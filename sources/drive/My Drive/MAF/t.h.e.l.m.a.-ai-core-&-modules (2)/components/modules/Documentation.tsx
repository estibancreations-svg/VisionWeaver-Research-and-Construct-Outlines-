Original name: Documentation.tsx
Drive ID: 15PYxCZcgT6iRWHdGDCgfRKNxQ2z-nRbu
Parent folder: My Drive/MAF/t.h.e.l.m.a.-ai-core-&-modules (2)/components/modules/
Modified: 2026-01-31T10:56:50.000Z


import React, { useState, useEffect } from 'react';
import { Book, FileText, Download, ExternalLink, Code, FileSpreadsheet, File, FolderOpen, Printer, ArrowLeft, CheckCircle, Shield, Users, Server, Cloud, Upload, RefreshCw, Trash2, Search, MoreVertical } from 'lucide-react';

interface DocumentationProps {
    onBack?: () => void;
}

const Documentation: React.FC<DocumentationProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'LIBRARY' | 'CLOUD_DRIVE'>('LIBRARY');
    const [downloading, setDownloading] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [driveContents, setDriveContents] = useState([
        { id: '1', name: 'Bill_of_Lading_F101.pdf', size: '1.2 MB', date: '2025-01-06', type: 'DOC' },
        { id: '2', name: 'Maintenance_Log_S4.xlsx', size: '4.5 MB', date: '2025-01-05', type: 'XLS' },
        { id: '3', name: 'Neural_Signature_SH.hash', size: '4 KB', date: '2025-01-06', type: 'SYS' }
    ]);

    const handleDownload = (docName: string) => {
        setDownloading(docName);
        setTimeout(() => setDownloading(null), 2000);
    };

    const simulateUpload = () => {
        setIsUploading(true);
        setTimeout(() => {
            const newDoc = {
                id: Date.now().toString(),
                name: `Field_Manifest_${Math.floor(Math.random()*9000)}.pdf`,
                size: '2.1 MB',
                date: new Date().toISOString().split('T')[0],
                type: 'DOC'
            };
            setDriveContents(prev => [newDoc, ...prev]);
            setIsUploading(false);
        }, 1500);
    };

    return (
        <div className="p-4 md:p-8 space-y-6 animate-fadeIn pb-12 h-full flex flex-col">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button onClick={onBack} className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-blue-600 shadow-sm transition-all"><ArrowLeft size={20} /></button>
                    )}
                    <div>
                        <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Federation Archive v4.0.0</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <FolderOpen size={12} className="text-blue-500"/> Federation Storage: 84% Available
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <button onClick={() => setActiveTab('LIBRARY')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'LIBRARY' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Digital Library</button>
                    <button onClick={() => setActiveTab('CLOUD_DRIVE')} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CLOUD_DRIVE' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>Cloud Drive</button>
                </div>
             </div>

             {activeTab === 'LIBRARY' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-y-auto pr-2 no-scrollbar">
                    {/* Fleet & Ops Section */}
                    <div className="space-y-4">
                        <h3 className="font-black text-slate-400 uppercase text-xs tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2">Fleet & Operations</h3>
                        {[
                            { title: 'Fleet Manager Ops Manual (v2.1)', size: '18 MB', type: 'PDF' },
                            { title: 'Operator Handbook (Drivers/Pilots)', size: '14 MB', type: 'PDF' },
                            { title: 'Maintenance Decision Tree', size: '2.4 MB', type: 'PDF' }
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 group cursor-pointer shadow-sm transition-all" onClick={() => handleDownload(doc.title)}>
                                <div className="flex items-center gap-3">
                                    <FileText className="text-slate-400 group-hover:text-blue-500" size={20}/>
                                    <div>
                                        <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{doc.title}</p>
                                        <p className="text-[10px] text-slate-400">{doc.type} • {doc.size}</p>
                                    </div>
                                </div>
                                {downloading === doc.title ? <CheckCircle size={16} className="text-green-500 animate-bounce"/> : <Download size={16} className="text-slate-300 group-hover:text-blue-500"/>}
                            </div>
                        ))}
                    </div>

                    {/* Financial Section */}
                    <div className="space-y-4">
                        <h3 className="font-black text-slate-400 uppercase text-xs tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2">Finance & HR</h3>
                        {[
                            { title: 'Payroll Processing SOP', size: '3.2 MB', type: 'PDF' },
                            { title: 'Insurance Policy POL-930', size: '8 MB', type: 'PDF' },
                            { title: 'Carbon Offset Certificate', size: '200 KB', type: 'PDF' }
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 group cursor-pointer shadow-sm transition-all" onClick={() => handleDownload(doc.title)}>
                                <div className="flex items-center gap-3">
                                    <FileSpreadsheet className="text-slate-400 group-hover:text-emerald-500" size={20}/>
                                    <div>
                                        <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{doc.title}</p>
                                        <p className="text-[10px] text-slate-400">{doc.type} • {doc.size}</p>
                                    </div>
                                </div>
                                {downloading === doc.title ? <CheckCircle size={16} className="text-green-500 animate-bounce"/> : <Download size={16} className="text-slate-300 group-hover:text-emerald-500"/>}
                            </div>
                        ))}
                    </div>

                    {/* IT Section */}
                    <div className="space-y-4">
                        <h3 className="font-black text-slate-400 uppercase text-xs tracking-widest border-b border-slate-200 dark:border-slate-800 pb-2">IT & Governance</h3>
                        {[
                            { title: 'IT Provisioning Standards', size: '2 MB', type: 'PDF' },
                            { title: 'n8n Integration Blueprint', size: '3 MB', type: 'PDF' },
                            { title: 'System Audit Log (JSON)', size: '45 MB', type: 'JSON' }
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-400 group cursor-pointer shadow-sm transition-all" onClick={() => handleDownload(doc.title)}>
                                <div className="flex items-center gap-3">
                                    <Code className="text-slate-400 group-hover:text-purple-500" size={20}/>
                                    <div>
                                        <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{doc.title}</p>
                                        <p className="text-[10px] text-slate-400">{doc.type} • {doc.size}</p>
                                    </div>
                                </div>
                                {downloading === doc.title ? <CheckCircle size={16} className="text-green-500 animate-bounce"/> : <Download size={16} className="text-slate-300 group-hover:text-purple-500"/>}
                            </div>
                        ))}
                    </div>
                </div>
             ) : (
                <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50 dark:bg-slate-950/50">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-blue-600 text-white rounded-[1.5rem] shadow-lg shadow-blue-500/30">
                                <Cloud size={32}/>
                            </div>
                            <div>
                                <h2 className="text-white font-black uppercase text-xl tracking-tight">Federation Cloud Drive</h2>
                                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Encrypted Field Storage • drive-storage.json</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={simulateUpload} className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl transition-all active:scale-95">
                                {isUploading ? <RefreshCw className="animate-spin" size={16}/> : <Upload size={16}/>} {isUploading ? 'SYNCING...' : 'Upload Document'}
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-0 no-scrollbar">
                        <table className="w-full text-left">
                            <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10 text-[9px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-8 py-5">Filename</th>
                                    <th className="px-8 py-5">Size</th>
                                    <th className="px-8 py-5">Upload Date</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs">
                                {driveContents.map(doc => (
                                    <tr key={doc.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-50 dark:border-slate-800/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                                                    <File size={16}/>
                                                </div>
                                                <span className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-tight">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-slate-500 font-mono">{doc.size}</td>
                                        <td className="px-8 py-5 text-slate-500 font-bold uppercase">{doc.date}</td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-500"><Download size={16}/></button>
                                                <button className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
             )}
        </div>
    );
};

export default Documentation;
