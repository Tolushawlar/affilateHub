
import { ChangeEvent } from 'react'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative flex-1">
      <input
        type="text"
        className="w-full h-20 rounded-[50px] border-2 border-gray-300 px-6 py-3 text-lg text-black focus:border-blue-500 focus:outline-none"
        placeholder="Search products..."
        value={value}
        onChange={handleChange}
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  )
}
