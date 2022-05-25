import React, { FC, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Chip, Grid, Typography } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { Input } from 'components'
import { useAppSelector } from 'hooks'
import { useGetCollaborationByIdQuery } from 'services/collaborations.endpoints'
import { useCreateResponseMutation } from 'services/responses.endpoints'

type FormData = {
  explanation?: string
}

const schema: yup.SchemaOf<FormData> = yup.object({
  explanation: yup.string().optional(),
})

const Collaboration: FC = () => {
  const navigate = useNavigate()
  const userId = useAppSelector((state) => state.auth.user.id)
  const { id } = useParams<{ id: string }>()
  const { data: collaboration, isLoading } = useGetCollaborationByIdQuery(id)
  const [createResponse] = useCreateResponseMutation()
  const owner = collaboration?.userId === userId
  const responded = collaboration?.responses.some(
    (response) => response.userId === userId
  )

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { explanation: '' },
    resolver: yupResolver(schema),
  })

  const createResponseHandler: SubmitHandler<FormData> = ({ explanation }) => {
    if (!id) return

    createResponse({
      collaborationId: +id,
      explanation: explanation || '',
    })
  }

  useEffect(() => {
    if (owner) {
      navigate(`/my-collaborations/${id}`)
    }
  }, [id, owner, navigate])

  useEffect(() => {
    const response = collaboration?.responses.find(
      (res) => res.userId === userId
    )
    reset({ explanation: response?.explanation })
  }, [collaboration, reset, userId])

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid item>
        <Typography variant="h1">{collaboration?.name}</Typography>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Социальные сети:</Typography>
          </Grid>

          <Grid item>
            <Grid container columnGap={1}>
              {collaboration?.networks.map((net) => (
                <Grid item key={net.id}>
                  <Chip size="medium" label={net.name} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Категория:</Typography>
          </Grid>

          <Grid item>
            <Grid container columnGap={1}>
              {collaboration?.categories.map((cat) => (
                <Grid item key={cat.id}>
                  <Chip size="medium" label={cat.name} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Автор:</Typography>
          </Grid>

          <Grid item>
            <Typography
              component={Link}
              color="white"
              to={`/users/${collaboration?.user.id}`}
            >
              {collaboration?.user.username} ({collaboration?.user.firstName}{' '}
              {collaboration?.user.lastName})
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Описание:</Typography>
          </Grid>

          <Grid item>
            <Typography>{collaboration?.description}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">Откликнуться:</Typography>
          </Grid>
          <Grid item>
            <Input
              control={control}
              name="explanation"
              placeholder="Опишите свои пожелания или предложения"
              multiline
              minRows={3}
              maxRows={10}
              disabled={responded}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item textAlign="right">
        <Button
          onClick={handleSubmit(createResponseHandler)}
          disabled={responded}
        >
          Откликнуться
        </Button>
      </Grid>
    </Grid>
  )
}

export default Collaboration
