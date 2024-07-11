// ParentComponent.tsx
// https://y8chsn-5173.csb.app/
import React, { useState } from 'react';
import SwitchChild from './SwitchChild';
import ListChild from './ListChild';

interface Item {
  id: number;
  name: string;
  isVeg: boolean;
}

const ParentComponent: React.FC = () => {
  const [vegOnly, setVegOnly] = useState<boolean>(false);

  const toggleVegOnly = () => {
    setVegOnly(!vegOnly);
  };

  const items: Item[] = [
    { id: 1, name: 'Carrot', isVeg: true },
    { id: 2, name: 'Chicken', isVeg: false },
    { id: 3, name: 'Broccoli', isVeg: true },
    { id: 4, name: 'Fish', isVeg: false },
  ];

  return (
    <div>
      <h1>Parent Component</h1>
      <SwitchChild vegOnly={vegOnly} toggleVegOnly={toggleVegOnly} />
      <ListChild items={items} vegOnly={vegOnly} />
    </div>
  );
};

export default ParentComponent;