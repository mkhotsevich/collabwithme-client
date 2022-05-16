import React, { FC } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'

import { useGetCollaborationsQuery } from 'services/collaborations.endpoints'

import CollaborationCard from './CollaborationCard'

const Collaborations: FC = () => {
  const { data: collaborations } = useGetCollaborationsQuery()
  console.log(collaborations)

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <Typography variant="h3" align="center">
          Коллаборации
        </Typography>
      </Grid>

      <Grid item>
        <Grid container alignItems="center" columnSpacing={2}>
          <Grid item flexGrow="1">
            <TextField label="Поиск" />
          </Grid>
          <Grid item>
            <Button>Найти</Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowSpacing={2}>
          {collaborations?.map(collaboration => (
            <Grid key={collaboration.id} item>
              <CollaborationCard collaboration={collaboration} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Collaborations
