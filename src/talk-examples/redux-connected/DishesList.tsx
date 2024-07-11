import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const DishesList: React.FC = () => {
    const dishes = useSelector((state: RootState) => state.dishes.dishes);

    return (
        <div>
            <h2>Dishes List</h2>
            <ul>
                {dishes.map((dish, index) => (
                    <li key={index}>{dish}</li>
                ))}
            </ul>
        </div>
    );
};

export default DishesList;