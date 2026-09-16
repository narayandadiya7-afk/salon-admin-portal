import type { AppDispatch } from "../store";

// Importing the Redux action to increment the state by a specified amount
import { incrementByAmount } from "./slice";

// Async action creator that increments the state by a specified number
export const onIncrementByNumber =
  (increment: number) => async (dispatch: AppDispatch) => {
    // Asynchronously call the inc function to simulate an asynchronous operation
    const value = await inc(increment);

    // Dispatch the incrementByAmount action with the calculated value
    dispatch(incrementByAmount(value));
  };

// Function that returns a Promise to simulate an asynchronous operation
const inc = (increment: number): Promise<any> => {
  // Creating a Promise that resolves after a timeout
  var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      // Resolving the Promise with the specified increment value
      resolve(increment);
    }, 1000);
  });

  return promise;
};
