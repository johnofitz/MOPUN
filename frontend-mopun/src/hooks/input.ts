import { useState } from "react";

const useInput = (validateValue: any) => {
  // useState to set input
  const [input, setInput] = useState("");
  // useState to handle input touchedconst [selectedDate, setSelectedDate] = useState<string | null>("");

  const [touched, setTouched] = useState(false);

  // inferred const to derive validity from above states
  const valueIsValid = validateValue(input);


  // Variable to handle boolean form state
  const hasError = !valueIsValid && touched;

  const inputChangeHandler = (event:any) => {
    setInput(event.target.value);
  };

  // Blur focous
  const inputBlurHandler = (event: any) => {
    // user has touched input so definetly loose focous
    setTouched(true);
  };

  const reset =()=>{
    setInput('');
    setTouched(false);
  }

  return {
    value: input,
    hasError: hasError,
    isValid: valueIsValid,
    inputChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
