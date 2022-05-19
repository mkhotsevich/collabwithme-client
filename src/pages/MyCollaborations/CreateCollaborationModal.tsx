import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, Typography } from '@mui/material'
import { FieldError, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Input, Modal, Select } from 'components'
import { useGetCategoriesQuery } from 'services/categories.endpoints'
import { useCreateCollaborationMutation } from 'services/collaborations.endpoints'
import { useGetNetworksQuery } from 'services/networks.endpoints'

type CreateCollaborationModalProps = {
  open: boolean
  onClose: () => void
}

type FormData = {
  name: string
  description: string
  networkIds: number[]
  categoryIds: number[]
}

const createCollaborationSchema: yup.SchemaOf<FormData> = yup.object({
  name: yup.string().required('Обязательно'),
  description: yup.string().required('Обязательно'),
  networkIds: yup.array().min(1, 'Обязательно').required('Обязательно'),
  categoryIds: yup.array().min(1, 'Обязательно').required('Обязательно')
})

const CreateCollaborationModal: FC<CreateCollaborationModalProps> = ({
  open,
  onClose
}) => {
  const { data: networks } = useGetNetworksQuery()
  const { data: categories } = useGetCategoriesQuery()
  const [createCollaboration] = useCreateCollaborationMutation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      description: '',
      networkIds: [],
      categoryIds: []
    },
    resolver: yupResolver(createCollaborationSchema)
  })

  const submitHandler: SubmitHandler<FormData> = async data => {
    await createCollaboration(data)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Grid container direction="column" rowGap={2}>
        <Grid item>
          <Typography variant="h6">Создание коллаборации</Typography>
        </Grid>

        <Grid item>
          <Input
            control={control}
            name="name"
            label="Название"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid item>
          <Input
            control={control}
            name="description"
            label="Описание"
            multiline
            minRows={3}
            maxRows={3}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>

        <Grid item>
          <Select
            control={control}
            name="networkIds"
            label="Социальная сеть"
            multiple
            options={networks}
            error={!!errors.networkIds}
            helperText={(errors.networkIds as unknown as FieldError)?.message}
          />
        </Grid>

        <Grid item>
          <Select
            control={control}
            name="categoryIds"
            label="Категория"
            multiple
            options={categories}
            error={!!errors.categoryIds}
            helperText={(errors.categoryIds as unknown as FieldError)?.message}
          />
        </Grid>

        <Grid item textAlign="right">
          <Button onClick={handleSubmit(submitHandler)}>Создать</Button>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default CreateCollaborationModal
