import React from 'react';

interface ButtonProps {
  title: string,
  onClick(): void,
  id: string,
  disabled?: boolean,
}

function Button({ title, onClick, id, disabled }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      id={id}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
