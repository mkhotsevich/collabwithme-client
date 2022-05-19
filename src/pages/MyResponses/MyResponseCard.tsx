import React, { FC } from 'react'

import {
  Button,
  Card,
  CardContent,
  Grid,
  styled,
  Typography
} from '@mui/material'

import { Response } from 'models'

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
    }`
  })
)

const MyResponseCard: FC<MyResponseCardProps> = ({ response }) => {
  return (
    <BorderedCard status={response.status}>
      <CardContent>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">{response.collaboration.name}</Typography>
          </Grid>
          <Grid item>
            <Typography>{response.collaboration.description}</Typography>
          </Grid>
          <Grid item>
            <Typography>{response.collaboration.user.username}</Typography>
          </Grid>

          {response.status === 'accepted' && (
            <Grid item textAlign="right">
              <Button color="success">Связаться</Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </BorderedCard>
  )
}

export default MyResponseCard
