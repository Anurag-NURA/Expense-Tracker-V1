import React from 'react'

import { useInputReducer } from '@hooks';

export const Input = (props) => {

  const {
    type,
    id,
    placeholder,
    label,
    validation,
    onInputChange
  } = props;

  const {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError: enteredInputHasError,
    valueChangeHandler: enteredInputValueChangeHandler,
    inputBlurHandler: enteredInputBlurHandler,
    reset: resetValue
  } = useInputReducer(validation);

  // Notify parent of the input value when it changes
  const handleInputChange = (event) => {
    // Update local state
    enteredInputValueChangeHandler(event);

    // Notify parent
    onInputChange(id, event.target.value, enteredValueIsValid);
  };

  const valueInputClass = enteredInputHasError ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <div className='mb-5 flex flex-col '>
      {label && <label htmlFor={id} className='text-md font-semibold mb-2 text-gray-600'>
        {enteredInputHasError ? 'Invalid ' : ''}{label}
      </label>}
      {type === 'textarea' ?
        (
          <textarea
            id={id}
            placeholder={placeholder}
            className='border-2 border-gray-400 focus:outline-none focus:border-indigo-500'
          />
        ) :
        (
          <input
            value={enteredValue}
            onChange={handleInputChange}
            onBlur={enteredInputBlurHandler}
            id={id}
            placeholder={placeholder}
            className={`px-5 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple-500 ${valueInputClass}`}
          />
        )}
    </div>
  )
}
