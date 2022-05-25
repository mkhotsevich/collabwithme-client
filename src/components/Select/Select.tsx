import React, { FC } from 'react'

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  FormControlProps,
  FormHelperText,
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'

type SelectProps = FormControlProps & {
  name: string
  control: Control<any, any>
  label?: string
  multiple?: boolean
  helperText?: string
  options?: { id: number | string; name: string }[]
}

const Select: FC<SelectProps> = ({
  control,
  name,
  label,
  multiple,
  options,
  helperText,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl {...props}>
          <InputLabel>{label}</InputLabel>
          <MuiSelect
            label={label}
            multiple={multiple}
            disabled={!options?.length || props.disabled}
            {...field}
          >
            {options?.map((o) => (
              <MenuItem key={o.id} value={o.id}>
                {o.name}
              </MenuItem>
            ))}
          </MuiSelect>
          <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default Select
