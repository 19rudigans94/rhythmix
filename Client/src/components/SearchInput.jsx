import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function SearchInput({ value, onChange, placeholder = "曲やプレイリストを検索..." }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <MagnifyingGlassIcon 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 
                 text-gray-400" 
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-wasabi w-full pl-12 pr-4 py-3"
      />
    </div>
  )
}

export default SearchInput