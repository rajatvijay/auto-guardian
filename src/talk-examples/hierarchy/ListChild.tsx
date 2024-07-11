// ListChild.tsx
import React from 'react';

interface Item {
  id: number;
  name: string;
  isVeg: boolean;
}

interface ListChildProps {
  items: Item[];
  vegOnly: boolean;
}

const ListChild: React.FC<ListChildProps> = ({ items, vegOnly }) => {
  const filteredItems = vegOnly 
    ? items.filter(item => item.isVeg) 
    : items;

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default ListChild;