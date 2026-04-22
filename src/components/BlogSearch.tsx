import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-aura-muted" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar artículos..."
        className="block w-full bg-aura-card border border-aura-border rounded-xl py-4 pl-11 pr-4 text-sm text-white placeholder-aura-muted focus:outline-none focus:border-aura-accent transition-colors"
      />
    </div>
  );
};
