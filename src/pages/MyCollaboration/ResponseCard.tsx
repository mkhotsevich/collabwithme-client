import React, { FC } from 'react'

import { LoadingButton } from '@mui/lab'
import { Card, CardContent, Grid, Typography, styled } from '@mui/material'

import { Response } from 'models'
import { useChangeStatusMutation } from 'services/responses.endpoints'

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

type ResponseCardProps = {
  response: Response
}

const ResponseCard: FC<ResponseCardProps> = ({ response }) => {
  const [changeStatus, { isLoading }] = useChangeStatusMutation()

  const changeStatusHandler = (status: Response['status']) => {
    changeStatus({ id: response.id, status })
  }

  return (
    <BorderedCard status={response.status}>
      <CardContent>
        <Grid container direction="column" rowGap={1}>
          <Grid item>
            <Typography variant="h6">{response.user.username}</Typography>
          </Grid>
          <Grid item>
            <Typography>{response.explanation}</Typography>
          </Grid>
          <Grid item>
            <Grid container columnGap={2} justifyContent="flex-end">
              <Grid item>
                <LoadingButton
                  color="success"
                  onClick={() => changeStatusHandler('accepted')}
                  loading={isLoading}
                  disabled={response.status !== 'sent'}
                >
                  Принять
                </LoadingButton>
              </Grid>
              <Grid item>
                <LoadingButton
                  color="error"
                  onClick={() => changeStatusHandler('rejected')}
                  loading={isLoading}
                  disabled={response.status !== 'sent'}
                >
                  Отклонить
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </BorderedCard>
  )
}

export default ResponseCard
