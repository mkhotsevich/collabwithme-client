import React, { FC } from 'react'

import {
  Button,
  Card,
  CardContent,
  Grid,
  styled,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import { Response } from 'models'
import { useCreateRoomMutation } from 'services/chats.endpoints'

type MyResponseCardProps = {
  response: Response
}

const BorderedCard = styled(Card)<{ status: Response['status'] }>(
  ({ theme, status }) => ({
    border: `1px solid ${
      status === 'sent'
        ? 'transparent'
        : status === 'accepted'
        ? theme.palette.success.main
        : theme.palette.error.main
    }`,
  })
)

const MyResponseCard: FC<MyResponseCardProps> = ({ response }) => {
  const userId = useAppSelector((state) => state.auth.user.id)
  const navigate = useNavigate()
  const [createRoom] = useCreateRoomMutation()

  const createRoomHandler = async () => {
    if (!userId) return
    const room = await createRoom({
      userIds: [response.collaboration.userId, userId],
    }).unwrap()

    navigate(`/chats/${room.id}`)
  }

  return (
    <BorderedCard status={response.status}>
      <CardContent>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography
              component={Link}
              to={`/collaborations/${response.collaboration.id}`}
              variant="h6"
              color="white"
            >
              {response.collaboration.name}
            </Typography>
          </Grid>

          {response.explanation && (
            <Grid item>
              <Typography>{response.explanation}</Typography>
            </Grid>
          )}

          {response.status === 'accepted' && (
            <Grid item textAlign="right">
              <Button color="success" onClick={() => createRoomHandler()}>
                Связаться
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </BorderedCard>
  )
}

export default MyResponseCard
