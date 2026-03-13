import React from 'react'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import { useChat } from './hooks/useChat'

// API key is now loaded from .env file (VITE_GEMINI_API_KEY)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

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