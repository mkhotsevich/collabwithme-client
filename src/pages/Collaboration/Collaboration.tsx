import React, { FC } from 'react'

import { Chip, Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useGetCollaborationByIdQuery } from 'services/collaborations.endpoints'

const Collaboration: FC = () => {
  const { id: collaborationId } = useParams<{ id: string }>()
  const { data: collaboration } = useGetCollaborationByIdQuery(collaborationId)

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
    </Grid>
  )
}

export default Collaboration
