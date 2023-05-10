import React from 'react';

interface InputProps {
  placeholder: string,
  type: string,
  value: string,
  onChange(e: React.ChangeEvent<HTMLInputElement>): void,
  id: string,
}

function Input({ placeholder, type, value, onChange, id }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      id={id}
    />
  );
}

export default Input;
