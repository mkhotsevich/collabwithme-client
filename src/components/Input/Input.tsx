import React, { FC } from 'react'

import { TextField, TextFieldProps } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type InputProps = TextFieldProps & {
  name: string
  control: Control<any, any>
}

const Input: FC<InputProps> = ({ name, control, defaultValue, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: props.required }}
      defaultValue={defaultValue}
      render={({ field }) => <TextField {...field} {...props} />}
    />
  )
}

export default Input
