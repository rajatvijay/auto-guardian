import { configureStore, createSlice } from '@reduxjs/toolkit';

interface UserState {
    username: string;
    preferredLanguage: string;
}

const initialState: UserState = {
    username: 'Rajat Vijay',
    preferredLanguage: 'English',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
});

interface DishesState {
    dishes: string[];
}

const initialDishesState: DishesState = {
    dishes: ['Pizza', 'Burger', 'Pasta'],
};

const dishesSlice = createSlice({
    name: 'dishes',
    initialState: initialDishesState,
    reducers: {}
});

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        dishes: dishesSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;