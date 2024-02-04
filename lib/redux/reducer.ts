"use client";

import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    carts: any[]
}

const initialState: CounterState = {
    carts: []
}

export const CartsReducer = createSlice({
    name: "carts",
    initialState,
    reducers: {
        addToCarts: (state) => { state.carts.push() },
        removeFromCarts: (state, action) => {
            action.payload
        }
    },
});
