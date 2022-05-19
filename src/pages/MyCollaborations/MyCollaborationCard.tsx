import React, { FC, VoidFunctionComponent } from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Chip
} from '@mui/material'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { Collaboration } from 'models'

type MyCollaborationCardProps = {
  collaboration: Collaboration
}

const MyCollaborationCard: FC<MyCollaborationCardProps> = ({
  collaboration
}) => {
  const navigate = useNavigate()

  const clickHandler = () => {
    navigate(`/my-collaborations/${collaboration.id}`)
  }

  return (
    <Card>
      <CardActionArea onClick={clickHandler}>
        <CardContent>
          <Grid container direction="column" rowSpacing={1}>
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">{collaboration.name}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="caption">
                    Дата публикации:{' '}
                    {format(new Date(collaboration.createdDate), 'dd.MM.yyyy')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {collaboration.description}
              </Typography>
            </Grid>

            <Grid item>
              <Grid container alignItems="center" columnSpacing={1}>
                <Grid item>
                  <Typography>Категория:</Typography>
                </Grid>
                {collaboration.categories.map(category => (
                  <Grid item key={category.id}>
                    <Chip label={category.name} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item>
              <Grid container alignItems="center" columnSpacing={1}>
                <Grid item>
                  <Typography>Социальные сети:</Typography>
                </Grid>
                {collaboration.networks.map(network => (
                  <Grid item key={network.id}>
                    <Chip label={network.name} />
                  </Grid>
                ))}
                <Grid item sx={{ ml: 'auto' }}>
                  <Typography>
                    Отклики: {collaboration.responses.length}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default MyCollaborationCard
