import React, { FC, useState } from 'react'

import { Button, Chip, Grid, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import {
  useGetCollaborationByIdQuery,
  useDeleteCollaborationMutation
} from 'services/collaborations.endpoints'

import EditCollaborationModal from './EditCollaborationModal'

const Collaboration: FC = () => {
  const { id: collaborationId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: collaboration } = useGetCollaborationByIdQuery(collaborationId)
  const [deleteCollaboration] = useDeleteCollaborationMutation()
  const [update, setUpdate] = useState(false)

  const deleteHandler = async () => {
    if (!collaborationId) return
    await deleteCollaboration(collaborationId).unwrap()
    navigate('/my-collaborations')
  }

  return (
    <Grid container direction="column" rowGap={2}>
      <Grid item>
        <Typography variant="h1">{collaboration?.name}</Typography>
      </Grid>

      <Grid item>
        <Typography>{collaboration?.description}</Typography>
      </Grid>

      <Grid item>
        <Grid container alignItems="center" columnSpacing={1}>
          <Grid item>
            <Typography>Категория:</Typography>
          </Grid>
          {collaboration?.categories.map(category => (
            <Grid item key={category.id}>
              <Chip size="medium" label={category.name} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item>
        <Grid container alignItems="center" columnSpacing={1}>
          <Grid item>
            <Typography>Социальные сети:</Typography>
          </Grid>
          {collaboration?.networks.map(network => (
            <Grid item key={network.id}>
              <Chip size="medium" label={network.name} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item>
        <Grid container columnGap={2} justifyContent="flex-end">
          <Grid item>
            <Button onClick={() => setUpdate(true)}>Редактировать</Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="error"
              onClick={() => deleteHandler()}
            >
              Удалить
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <EditCollaborationModal open={update} onClose={() => setUpdate(false)} />
    </Grid>
  )
}

export default Collaboration
