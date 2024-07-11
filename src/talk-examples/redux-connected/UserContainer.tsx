import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import UserDisplay from './UserDisplay';

const UserContainer: React.FC = () => {
    const { username, preferredLanguage } = useSelector((state: RootState) => state.user);

    return (
        <UserDisplay  username={username} preferredLanguage={preferredLanguage} />
    );
};

export default UserContainer;