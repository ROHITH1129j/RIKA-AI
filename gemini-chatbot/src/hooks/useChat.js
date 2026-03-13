import { useState, useRef, useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const MODEL_NAME = 'gemini-2.5-flash'

export function useChat(apiKey) {
  const [chats, setChats] = useState([
    { id: 1, title: 'New Chat', messages: [], createdAt: new Date() }
  ])
  const [activeChatId, setActiveChatId] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const chatSessionRef = useRef({})

  const activeChat = chats.find(c => c.id === activeChatId)

  const getOrCreateSession = useCallback((chatId, history) => {
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') return null
    if (chatSessionRef.current[chatId]) return chatSessionRef.current[chatId]

    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: MODEL_NAME })
      const geminiHistory = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))
      const session = model.startChat({
        history: geminiHistory,
        generationConfig: { maxOutputTokens: 8192 },
      })
      chatSessionRef.current[chatId] = session
      return session
    } catch (err) {
      console.error('Failed to create Gemini session:', err)
      return null
    }
  }, [apiKey])

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
      setError('Please set your Gemini API key in App.jsx')
      return
    }

    setError(null)
    const userMsg = { id: Date.now(), role: 'user', content: text, timestamp: new Date() }

    // Add user message
    setChats(prev => prev.map(c =>
      c.id === activeChatId
        ? {
            ...c,
            messages: [...c.messages, userMsg],
            title: c.messages.length === 0 ? text.slice(0, 40) : c.title
          }
        : c
    ))

    setIsLoading(true)

    try {
      const currentMessages = activeChat?.messages || []
      const session = getOrCreateSession(activeChatId, currentMessages)
      if (!session) throw new Error('Could not initialize Gemini session')

      const result = await session.sendMessage(text)
      const responseText = result.response.text()

      const assistantMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      }

      setChats(prev => prev.map(c =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, assistantMsg] }
          : c
      ))

    } catch (err) {
      console.error('Gemini error:', err)
      setError(err.message || 'Something went wrong. Check your API key.')
      // Remove the optimistic user message on error
      setChats(prev => prev.map(c =>
        c.id === activeChatId
          ? { ...c, messages: c.messages.filter(m => m.id !== userMsg.id) }
          : c
      ))
    } finally {
      setIsLoading(false)
    }
  }, [activeChatId, activeChat, isLoading, apiKey, getOrCreateSession])

  const newChat = useCallback(() => {
    const id = Date.now()
    setChats(prev => [...prev, { id, title: 'New Chat', messages: [], createdAt: new Date() }])
    setActiveChatId(id)
    setError(null)
  }, [])

  const deleteChat = useCallback((id) => {
    setChats(prev => {
      const filtered = prev.filter(c => c.id !== id)
      if (filtered.length === 0) {
        const newId = Date.now()
        return [{ id: newId, title: 'New Chat', messages: [], createdAt: new Date() }]
      }
      return filtered
    })
    setActiveChatId(prev => {
      if (prev === id) {
        const remaining = chats.filter(c => c.id !== id)
        return remaining.length > 0 ? remaining[remaining.length - 1].id : Date.now()
      }
      return prev
    })
    delete chatSessionRef.current[id]
  }, [chats])

  return {
    chats,
    activeChat,
    activeChatId,
    setActiveChatId,
    isLoading,
    error,
    sendMessage,
    newChat,
    deleteChat,
  }
}
