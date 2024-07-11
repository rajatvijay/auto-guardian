import React from 'react';

interface UserDisplayProps {
    username: string;
    preferredLanguage: string;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ username, preferredLanguage }) => {
    return (
        <div>
            <p>Username: {username}</p>
            <p>Preferred Language: {preferredLanguage}</p>
        </div>
    );
};

export default UserDisplay;