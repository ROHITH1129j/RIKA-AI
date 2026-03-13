import React from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { useChat } from './hooks/useChat'

// =============================================
// 🔑 PASTE YOUR GEMINI API KEY BELOW
// Get one free at: https://aistudio.google.com/apikey
// =============================================
const GEMINI_API_KEY = 'AIzaSyBYrZ4tGziLN8Axx5TLHA7JPA9Gc-9qSTo'
// =============================================

export default function App() {
  const {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    isLoading,
    error,
    sendMessage,
    newChat,
    deleteChat,
  } = useChat(GEMINI_API_KEY)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={newChat}
        onDeleteChat={deleteChat}
      />
      <ChatWindow
        chat={activeChat}
        isLoading={isLoading}
        error={error}
        onSend={sendMessage}
      />
    </div>
  )
}
