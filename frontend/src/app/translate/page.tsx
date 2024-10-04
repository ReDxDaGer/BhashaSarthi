"use client";

import React , {useEffect , useState , KeyboardEvent } from "react";
import {motion , AnimatePresence} from "framer-motion";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Moon , Sun , MessageCircle, Menu} from "lucide-react";

const translation = () => {
    const [motionAvailable, setMotionAvailable] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ type: string; content: string; contentType?: string }[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        try {
        require('framer-motion');
        setMotionAvailable(true);
        } catch (error) {
        console.error('Framer Motion is not available:', error);
        }

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsSidebarOpen(windowWidth > 768);
    }, [windowWidth]);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const sendMessage = async () => {
        if (!message.trim()) return;

        // Add user message to chat history
        setChatHistory(prev => [...prev, { type: 'user', content: message }]);
        setMessage('');

        setIsTyping(true);

        try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await res.json();

        let responseContent = data.response || 'No response from AI.';
        let responseType = 'text';

        if (responseContent.includes('http') && (responseContent.includes('.png') || responseContent.includes('.jpg') || responseContent.includes('.jpeg') || responseContent.includes('.gif'))) {
            responseType = 'image';
        } else if (responseContent.includes('```')) {
            responseType = 'code';
        }

        // Add AI response to chat history
        setChatHistory(prev => [...prev, { type: 'ai', content: responseContent, contentType: responseType }]);
        } catch (error) {
        console.error('Error:', error);
        setChatHistory(prev => [...prev, { type: 'ai', content: 'Error sending message.', contentType: 'text' }]);
        }

        setIsTyping(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
        }
    };

    const gradientStyle = isDarkMode
        ? { backgroundImage: 'linear-gradient(to bottom right, #1a202c, #4a5568, #2d3748)' }
        : { backgroundImage: 'linear-gradient(to bottom right, #ebf4ff, #e6fffa, #ebf8ff)' };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-500`} style={gradientStyle}>
        {/* Sidebar */}
        <AnimatePresence>
            {isSidebarOpen && (
            <motion.nav
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ duration: 0.3 }}
                className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4 absolute md:relative z-10 h-full`}
            >
                <h2 className="text-xl font-bold mb-4">Recent Chats</h2>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                {/* List of recent chats */}
                </ScrollArea>
            </motion.nav>
            )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
            <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4 flex justify-between items-center`}>
            <div className="flex items-center">
                <Button onClick={toggleSidebar} variant="ghost" size="icon" className="mr-2 md:hidden">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                </Button>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Mindful Chat</h1>
            </div>
            <Button onClick={toggleTheme} variant="outline" size="icon" className="rounded-full">
                {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            </header>

            <main className="flex-grow flex flex-col p-4 md:p-6 space-y-4 md:space-y-6 max-w-2xl mx-auto w-full">
            <ScrollArea className={`flex-grow overflow-y-auto ${isDarkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white bg-opacity-75'} rounded-xl shadow-xl p-4 md:p-6`}>
                {motionAvailable ? (
                <AnimatePresence>
                    <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4 md:space-y-6"
                    >
                    {chatHistory.map((msg, index) => (
                        <motion.div
                        key={index}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${msg.type === 'user' ? 'bg-blue-200' : 'bg-purple-200'} p-3 md:p-4 rounded-lg max-w-[80%] shadow-md ${msg.type === 'ai' ? 'ml-auto' : ''}`}
                        >
                        {msg.contentType === 'image' ? (
                            <div className="flex items-center space-x-2">
                            <img src={msg.content} alt="AI generated" className="max-w-full h-auto" />
                            </div>
                        ) : msg.contentType === 'code' ? (
                            <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                            <code>{msg.content}</code>
                            </pre>
                        ) : (
                            <p>{msg.content}</p>
                        )}
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-gray-500 text-sm italic"
                        >
                        Typing...
                        </motion.div>
                    )}
                    </motion.div>
                </AnimatePresence>
                ) : (
                <div className="space-y-4 md:space-y-6">
                    {/* Default chat history */}
                </div>
                )}
            </ScrollArea>

            <div className="flex space-x-2 md:space-x-4 mt-auto">
                <Input
                className={`flex-grow ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                placeholder="Share your thoughts..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <Button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold"
                >
                Send
                </Button>
            </div>
            </main>
        </div>
        </div>
    );
}

export default translation;