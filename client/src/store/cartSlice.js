import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCounter(state, action) {
            state.counter += 1
        },
        initCart(state, action) {
            state.counter = action.payload.counter
        }
    }
})

export const { setCounter, initCart } = cartSlice.actions
export default cartSlice.reducer