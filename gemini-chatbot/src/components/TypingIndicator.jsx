import React from 'react'
import { FiZap } from 'react-icons/fi'

export default function TypingIndicator() {
  return (
    <div className="fade-up" style={{ display: 'flex', gap: 12, padding: '16px 0', alignItems: 'flex-start' }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-teal))',
        boxShadow: '0 0 12px rgba(79,142,247,0.3)',
      }}>
        <FiZap size={14} color="#fff" />
      </div>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '4px 12px 12px 12px',
        padding: '14px 18px',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--accent-teal)',
            display: 'inline-block',
            animation: `pulse 1.4s ease-in-out ${i * 0.16}s infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}
