/**
 * This Conponent used for forceUpdate
 */
import { useState } from "react";
export function useForceUpdate() {
  const [count, setCount] = useState(0);
  return () => setCount(count + 1);
}
