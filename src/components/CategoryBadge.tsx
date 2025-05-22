import React from 'react';

interface CategoryBadgeProps {
  name: string;
  color: string;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ name, color, className = '' }) => {
  return (
    <span 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
      style={{ 
        backgroundColor: `${color}20`, // 20% opacity
        color: color,
        border: `1px solid ${color}` 
      }}
    >
      {name}
    </span>
  );
};

export default CategoryBadge;