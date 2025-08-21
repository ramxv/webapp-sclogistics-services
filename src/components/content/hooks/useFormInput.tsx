import { useState } from "react";

export const useFormInput = (initialValue?: string | number) => {
  const [input, setInput] = useState(initialValue);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  }

  const inputProps = {
    value: input,
    onChange: handleInput
  }

  return inputProps
};
