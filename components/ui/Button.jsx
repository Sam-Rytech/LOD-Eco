import React from 'react'

export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 ${className}`}
    >
      {children}
    </button>
  )
}
