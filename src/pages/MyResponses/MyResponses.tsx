import React, { FC, useCallback, useState } from 'react'

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

import { Response } from 'models'
import { useGetResponsesByUserIdQuery } from 'services/responses.endpoints'

import MyResponseCard from './MyResponseCard'

const MyResponses: FC = () => {
  const { data: responses, isLoading } = useGetResponsesByUserIdQuery()
  const [filterStatus, setFilterStatus] = useState('all')

  const filterResponses = useCallback(
    (response: Response) => {
      return response.status === filterStatus || filterStatus === 'all'
    },
    [filterStatus]
  )

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction="column" rowGap={2} flexGrow={1}>
      <Grid item>
        <Grid item>
          <Typography variant="h1">Мои отклики</Typography>
        </Grid>
      </Grid>

      {!!responses?.length && (
        <Grid item>
          <Grid container justifyContent="flex-end">
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>Статус отклика</InputLabel>
                <Select
                  label="Статус отклика"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="all">Все</MenuItem>
                  <MenuItem value="accepted">Принятые</MenuItem>
                  <MenuItem value="rejected">Отклоненные</MenuItem>
                  <MenuItem value="sent">В ожидании</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      )}

      {responses?.filter(filterResponses)?.map((response) => (
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
            У пока вас нет откликов, откликнитесь прямо сейчас!
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default MyResponses
