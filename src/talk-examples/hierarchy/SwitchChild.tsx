// SwitchChild.tsx
import React from 'react';

interface SwitchChildProps {
  vegOnly: boolean;
  toggleVegOnly: () => void;
}

const SwitchChild: React.FC<SwitchChildProps> = ({ vegOnly, toggleVegOnly }) => {
  return (
    <div>
      <label>
        Veg Only
        {/* <input 
          type="checkbox" 
          checked={vegOnly} 
          onChange={toggleVegOnly} 
        /> */}
        <button onClick={toggleVegOnly}>
          {vegOnly ? 'Showing Veg Only' : 'Showing All'}
        </button>
      </label>
    </div>
  );
};

export default SwitchChild;