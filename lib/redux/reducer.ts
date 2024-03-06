import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
    uid: string
    cuisineList: any[]
}

// define initial state type
type InitialState = {
    value: CartState;
}

const initialState: InitialState = {
    value: {
        uid: "",
        cuisineList: []
    }
}

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addIntoCart: (state, action: PayloadAction<any>) => {
            const cuisineList = [...state.value.cuisineList, action.payload];
            console.log(cuisineList);
            return {
                value: {
                    uid: state.value.uid,
                    cuisineList
                }
            }
        },
        clearCart: () => initialState
    }
});

export const {addIntoCart, clearCart} = cart.actions;
export default cart.reducer;
