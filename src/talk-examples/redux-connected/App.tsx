import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import UserContainer from './UserContainer';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div>
                <h1>User Information</h1>
                <UserContainer />
            </div>
        </Provider>
    );
};

export default App;