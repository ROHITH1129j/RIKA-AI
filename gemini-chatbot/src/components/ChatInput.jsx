import React, { useState, useRef, useEffect } from 'react'
import { FiSend, FiLoader } from 'react-icons/fi'

export default function ChatInput({ onSend, isLoading, disabled }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px'
    }
  }, [text])

  const handleSubmit = () => {
    if (!text.trim() || isLoading || disabled) return
    onSend(text.trim())
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div style={{
      padding: '12px 20px 20px',
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 10,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-bright)',
        borderRadius: 14,
        padding: '10px 12px',
        transition: 'border-color 0.2s',
      }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(79,142,247,0.5)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border-bright)'}
      >
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Gemini…"
          disabled={isLoading || disabled}
          rows={1}
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            resize: 'none',
            color: 'var(--text-primary)',
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: 'Outfit, sans-serif',
            maxHeight: 160,
            overflow: 'auto',
            paddingTop: 2,
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isLoading || disabled}
          style={{
            width: 34, height: 34, borderRadius: 8, border: 'none',
            background: text.trim() && !isLoading && !disabled
              ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-teal))'
              : 'var(--bg-tertiary)',
            cursor: text.trim() && !isLoading && !disabled ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s',
            boxShadow: text.trim() && !isLoading && !disabled ? '0 0 14px rgba(79,142,247,0.4)' : 'none',
          }}
        >
          {isLoading
            ? <FiLoader size={14} color="var(--text-muted)" style={{ animation: 'spin 1s linear infinite' }} />
            : <FiSend size={13} color={text.trim() && !disabled ? '#fff' : 'var(--text-muted)'} />
          }
        </button>
      </div>
      <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 8, fontFamily: 'Space Mono' }}>
        Enter to send · Shift+Enter for new line
      </div>
    </div>
  )
}
