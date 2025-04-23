
import React from 'react';

interface SortOption {
  label: string;
  value: string;
}

interface ProductSortProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
}

export const ProductSort: React.FC<ProductSortProps> = ({
  value,
  onChange,
  options
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};