import React from 'react'
import { FiPlus, FiTrash2, FiMessageSquare, FiZap } from 'react-icons/fi'

export default function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat }) {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      minWidth: 'var(--sidebar-width)',
      height: '100vh',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 32, height: 32,
          background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-teal))',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <FiZap size={16} color="#fff" />
        </div>
        <div>
          <div style={{ fontFamily: 'Space Mono', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            RIKA AI
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>2.5 FLASH</div>
        </div>
      </div>

      {/* New Chat Button */}
      <div style={{ padding: '12px 16px' }}>
        <button
          onClick={onNewChat}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(0,212,170,0.1))',
            border: '1px solid rgba(79,142,247,0.3)',
            borderRadius: 8,
            color: 'var(--accent-blue)',
            padding: '9px 14px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontWeight: 600,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79,142,247,0.25), rgba(0,212,170,0.15))'}
          onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(135deg, rgba(79,142,247,0.15), rgba(0,212,170,0.1))'}
        >
          <FiPlus size={14} />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 16px' }}>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', padding: '8px 10px 6px', fontFamily: 'Space Mono' }}>
          CONVERSATIONS
        </div>
        {[...chats].reverse().map(chat => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onSelect={() => onSelectChat(chat.id)}
            onDelete={() => onDeleteChat(chat.id)}
          />
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        fontSize: 11,
        color: 'var(--text-muted)',
        textAlign: 'center',
        fontFamily: 'Space Mono',
      }}>
        RIKA AI-2.5-flash
      </div>
    </aside>
  )
}

function ChatItem({ chat, isActive, onSelect, onDelete }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 10px',
        borderRadius: 8,
        cursor: 'pointer',
        background: isActive ? 'var(--bg-tertiary)' : hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        border: isActive ? '1px solid var(--border-bright)' : '1px solid transparent',
        marginBottom: 2,
        transition: 'all 0.15s',
      }}
    >
      <FiMessageSquare size={13} style={{ color: isActive ? 'var(--accent-teal)' : 'var(--text-muted)', flexShrink: 0 }} />
      <div
        onClick={onSelect}
        style={{ flex: 1, minWidth: 0, fontSize: 13, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {chat.title}
      </div>
      {(hovered || isActive) && (
        <button
          onClick={e => { e.stopPropagation(); onDelete() }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2, display: 'flex', borderRadius: 4 }}
          onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <FiTrash2 size={12} />
        </button>
      )}
    </div>
  )
}
