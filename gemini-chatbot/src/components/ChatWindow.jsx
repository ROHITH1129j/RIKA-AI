import React, { useEffect, useRef } from 'react'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import ChatInput from './ChatInput'
import { FiZap, FiAlertCircle } from 'react-icons/fi'

const SUGGESTIONS = [
  'Explain quantum computing simply',
  'Write a Python function to sort a list',
  'What are the best practices in React?',
  'Help me brainstorm startup ideas',
]

export default function ChatWindow({ chat, isLoading, error, onSend }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat?.messages, isLoading])

  const hasMessages = chat?.messages?.length > 0

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-secondary)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--accent-teal)',
          boxShadow: '0 0 8px var(--accent-teal)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
          {chat?.title || 'New Chat'}
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Space Mono', marginLeft: 'auto' }}>
          {chat?.messages?.length || 0} messages
        </span>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
        {!hasMessages ? (
          <WelcomeScreen onSuggestion={onSend} />
        ) : (
          <>
            {chat.messages.map(msg => (
              <Message key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
          </>
        )}

        {error && (
          <div className="fade-up" style={{
            margin: '12px 0',
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 8,
            color: '#f87171', fontSize: 13,
          }}>
            <FiAlertCircle size={14} />
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} isLoading={isLoading} />
    </div>
  )
}

function WelcomeScreen({ onSuggestion }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '40px 20px', textAlign: 'center',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 16,
        background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-teal))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
        boxShadow: '0 0 30px rgba(79,142,247,0.4)',
      }}>
        <FiZap size={28} color="#fff" />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
        How can I help you today?
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 32, maxWidth: 360 }}>
        Powered by Rika Ai 2.5 Flash. Ask me anything — from coding to creative writing.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 480 }}>
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSuggestion(s)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              padding: '12px 14px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 13,
              textAlign: 'left',
              transition: 'all 0.2s',
              lineHeight: 1.4,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(79,142,247,0.4)'
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'var(--bg-tertiary)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'var(--bg-card)'
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
