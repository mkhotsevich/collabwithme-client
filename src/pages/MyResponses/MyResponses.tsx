import React, { FC } from 'react'

import { Grid, Typography } from '@mui/material'

import { useGetResponsesByUserIdQuery } from 'services/responses.endpoints'

import MyResponseCard from './MyResponseCard'

const MyResponses: FC = () => {
  const { data: responses } = useGetResponsesByUserIdQuery()

  return (
    <Grid container direction="column" rowGap={2} flexGrow={1}>
      <Grid item>
        <Grid item>
          <Typography variant="h1">Мои отклики</Typography>
        </Grid>
      </Grid>

      {responses?.map(response => (
        <Grid key={response.id} item>
          <MyResponseCard response={response} />
        </Grid>
      ))}

      {!responses?.length && (
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
    </Grid>
  )
}

export default MyResponses
