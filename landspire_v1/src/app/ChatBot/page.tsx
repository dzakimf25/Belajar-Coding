"use client"
import { Files, Laptop, Paperclip, PaperPlaneTilt, Scales, Wind } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { StartConvertation } from "@/app/api/llm"

const ChatBot = () => {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([
        { text: "Selamat datang! Ada yang bisa saya bantu?", role: "bot" }
    ]);

    const callConversation = async () => {
        const menu = document.getElementById('menu-content');
        if (menu) menu.style.display = 'none';

        const userMessage = { text: message, role: "user" };
        setChatHistory([...chatHistory, userMessage]);

        const output = await StartConvertation(message);
        const botMessage = { text: output, role: "bot" };
        setChatHistory([...chatHistory, userMessage, botMessage]);

        setMessage('');
    }

    return (
        <div className="chatBox h-full pt-10 md:h-[calc(100svh-64px)] flex flex-col justify-stretch items-stretch">
            <div className="menu_center h-full flex flex-col justify-center gap-14">
                <div className="logo flex flex-col items-center justify-center gap-3">
                    <img src="/assets/logos/logo.png" alt="lanspire" width={100} height={100} />
                    <p className="title italic text-3xl ">Landspire Chat-Bot</p>
                    <p>Konsultasikan masalahmu dengan AI Kami</p>
                </div> 
                
            </div>
            
            <div className="chat-window" id="chatbot-window chat-window">
            {chatHistory.slice().reverse().map((chat, index) => (
                <div key={index} className={`bubble ${chat.role}`}>
                {chat.text}
                </div>
            ))}
            </div>

            <div className="text_box py-4 px-12 flex justify-stretch items-center">
                <div className="flex py-2 px-4 rounded-md border-2 border-gray-300 justify-center items-center w-full gap-3">
                    <button>
                        <Paperclip size={24} color="#4e4d46" weight="light" />
                    </button>
                    <input 
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        className="bg-transparent outline-none block w-full" 
                        type="text" 
                    />
                    <button onClick={callConversation}>
                        <PaperPlaneTilt size={24} color="#4e4d46" weight="fill" />
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ChatBot;
