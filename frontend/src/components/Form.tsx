import React from 'react';

interface FormProps {
  children: React.ReactNode
}

function Form({ children }: FormProps) {
  return <form>{children}</form>;
}

export default Form;
