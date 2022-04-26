import React, { DetailedHTMLProps, FC, FormHTMLAttributes } from 'react'

const Form: FC<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
> = ({ children, ...props }) => {
  return (
    <form {...props} noValidate>
      {children}
    </form>
  )
}

export default Form
