import React, { FC, useState } from 'react'

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material'
import { format } from 'date-fns'

import { useAppSelector } from 'hooks'
import { useGetCollaborationByUserIdQuery } from 'services/collaborations.endpoints'

import CreateCollaborationModal from './CreateCollaborationModal'
import MyCollaborationCard from './MyCollaborationCard'

const MyCollaborations: FC = () => {
  const userId = useAppSelector(state => state.auth.user.id)
  const { data: collaborations, isLoading } =
    useGetCollaborationByUserIdQuery(userId)
  const [openCreateCollaborationModal, setOpenCollaborationModal] =
    useState(false)

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction="column" rowGap={2} flexGrow={1}>
      <Grid item>
        <Grid container columnGap={4} alignItems="center">
          <Grid item>
            <Typography variant="h1">Мои коллаборации</Typography>
          </Grid>
          <Grid item>
            <Button onClick={() => setOpenCollaborationModal(true)}>
              Создать
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {!collaborations?.length && (
        <Grid
          item
          flexGrow={1}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Typography>
            У пока вас нет коллабораций, но вы можете создать ее прямо сейчас!
          </Typography>
        </Grid>
      )}

      {collaborations?.map(collaboration => (
        <Grid key={collaboration.id} item>
          <MyCollaborationCard collaboration={collaboration} />
        </Grid>
      ))}

      <CreateCollaborationModal
        open={openCreateCollaborationModal}
        onClose={() => setOpenCollaborationModal(false)}
      />
    </Grid>
  )
}

export default MyCollaborations
