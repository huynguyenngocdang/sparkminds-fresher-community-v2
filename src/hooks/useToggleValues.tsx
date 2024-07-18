import { useState } from "react";

export default function useToggleValues(initialValue: boolean = false) {
  const [value, setValue] = useState<boolean>(initialValue);
  const handleToggleValue = () => setValue(!value);

  return { value, handleToggleValue };
}
