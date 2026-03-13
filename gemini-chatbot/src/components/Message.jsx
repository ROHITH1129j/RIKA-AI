import React from 'react'
import ReactMarkdown from 'react-markdown'
import { FiUser, FiZap, FiCopy, FiCheck } from 'react-icons/fi'

export default function Message({ message }) {
  const [copied, setCopied] = React.useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const time = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  return (
    <div
      className="fade-up"
      style={{
        display: 'flex',
        gap: 12,
        padding: '16px 0',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isUser
          ? 'linear-gradient(135deg, var(--accent-purple), #6d28d9)'
          : 'linear-gradient(135deg, var(--accent-blue), var(--accent-teal))',
        boxShadow: isUser
          ? '0 0 12px rgba(139,92,246,0.3)'
          : '0 0 12px rgba(79,142,247,0.3)',
      }}>
        {isUser ? <FiUser size={14} color="#fff" /> : <FiZap size={14} color="#fff" />}
      </div>

      {/* Bubble */}
      <div style={{ maxWidth: '72%', minWidth: 60 }}>
        <div style={{
          background: isUser ? 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(109,40,217,0.15))' : 'var(--bg-card)',
          border: `1px solid ${isUser ? 'rgba(139,92,246,0.3)' : 'var(--border)'}`,
          borderRadius: isUser ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
          padding: '12px 16px',
          position: 'relative',
        }}>
          {isUser ? (
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)' }}>
              {message.content}
            </p>
          ) : (
            <div className="markdown-body" style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-primary)' }}>
              <ReactMarkdown
                components={{
                  code({ inline, children, ...props }) {
                    if (inline) {
                      return (
                        <code style={{
                          background: 'rgba(79,142,247,0.15)',
                          color: 'var(--accent-teal)',
                          borderRadius: 4,
                          padding: '1px 6px',
                          fontFamily: 'Space Mono',
                          fontSize: 12,
                        }} {...props}>{children}</code>
                      )
                    }
                    return (
                      <pre style={{
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        padding: '12px 14px',
                        overflowX: 'auto',
                        marginTop: 8,
                      }}>
                        <code style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--accent-teal)' }} {...props}>
                          {children}
                        </code>
                      </pre>
                    )
                  },
                  p: ({ children }) => <p style={{ margin: '0 0 8px', lastChild: { margin: 0 } }}>{children}</p>,
                  ul: ({ children }) => <ul style={{ paddingLeft: 20, marginBottom: 8 }}>{children}</ul>,
                  ol: ({ children }) => <ol style={{ paddingLeft: 20, marginBottom: 8 }}>{children}</ol>,
                  li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
                  strong: ({ children }) => <strong style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{children}</strong>,
                  h1: ({ children }) => <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>{children}</h1>,
                  h2: ({ children }) => <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)' }}>{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote style={{
                      borderLeft: '3px solid var(--accent-teal)',
                      paddingLeft: 12,
                      color: 'var(--text-secondary)',
                      margin: '8px 0',
                    }}>{children}</blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '4px 4px 0',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
        }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Space Mono' }}>{time}</span>
          <button
            onClick={handleCopy}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2, display: 'flex', borderRadius: 4 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            {copied ? <FiCheck size={11} color="var(--accent-teal)" /> : <FiCopy size={11} />}
          </button>
        </div>
      </div>
    </div>
  )
}
