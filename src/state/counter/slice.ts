import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define the shape of the counter state
interface CounterState {
  value: number;
}

// Initial state for the counter slice
const initialState: CounterState = {
  value: 0,
};

// Create a Redux slice for the counter
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Reducer for incrementing the counter by 1
    increment: (state) => {
      state.value += 1;
    },
    // Reducer for decrementing the counter by 1
    decrement: (state) => {
      state.value -= 1;
    },
    // Reducer for incrementing the counter by a specified amount
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Extract action creators from the slice
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Selector to get the counter value from the state
export const getCounter = (state: RootState) => state.counter.value;

// Export the counter reducer for use in the Redux store
const counterReducer = counterSlice.reducer;
export default counterReducer;
