import { useState, useReducer } from 'react';

import { Input, Button } from '@components';

const initialFormState = {
  email: {
    value: '',
    isValid: false
  },
  name: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  }
}

const formStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return {
        ...state,
        [action.id]: {
          value: action.value,
          isValid: action.isValid
        }
      };

    default: return state;
  }
};

export const AuthPage = () => {

  const [haveAccount, setHaveAccount] = useState(true);
  const [formState, dispatchFormState] = useReducer(formStateReducer, initialFormState);

  const handleInputChange = (id, value, isValid) => {
    dispatchFormState({
      type: 'INPUT',
      id,
      value,
      isValid
    });

    console.log('Name:', formState.name.value);
    console.log('Name:', formState.name.isValid);
    console.log('Email:', formState.email.value);
    console.log('Email:', formState.email.isValid);
    console.log('Password:', formState.password.value);
    console.log('Password:', formState.password.isValid);
  };

  const inputFields = [
    {
      id: "email",
      type: "email",
      placeholder: "person@email.com",
      label: "Email",
      validate: (value) => value.includes('@'),
    },
    !haveAccount && {
      id: "name",
      type: "text",
      placeholder: "Jignesh Modi",
      label: "Name",
      validate: (value) => value.trim() !== '',
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      validate: (value) => value.trim().length >= 6,
    },
  ].filter(Boolean);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formState.email.isValid || !formState.password.isValid) {
      console.log('Invalid form submission');
      return;
    }

    console.log('Name:', formState.name.value);
    console.log('Email:', formState.email.value);
    console.log('Password:', formState.password.value);
  };

  return (
    // Form Container
    <div className='min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600'>

      {/* Form */}
      <form className='h-3/4 custom_lg:w-1/3 custom_md:w-1/2 w-3/4 flex flex-col px-10 py-10 bg-white rounded-md overflow-hidden' action="">
        {inputFields.map((inputField) =>
          <Input
            key={inputField.id}
            id={inputField.id}
            type={inputField.type}
            placeholder={inputField.placeholder}
            label={inputField.label}
            validation={inputField.validate}
            onInputChange={handleInputChange}
          />
        )}

        {/* Submit Button */}
        <Button
          className='hover:scale-100 py-2 text-white bg-purple-600 hover:bg-purple-700'
          type="submit"
          onClick={formSubmitHandler}
        >
          {haveAccount ? "Log in" : "Sign Up"}
        </Button>

        {/* Does user have an account or not */}
        <div className='mt-4 flex custom_md:flex-row flex-col text-center gap-2 justify-center items-center'>
          <p>{haveAccount ? "Don't have an account?" : "Already have an account?"}</p>
          <button className='font-semibold text-indigo-500 hover:underline' type="button" onClick={() => setHaveAccount(!haveAccount)}>
            {haveAccount ? "Sign up" : "Log in"}
          </button>
        </div>
      </form>
    </div>
  )
};
