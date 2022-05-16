import React, { FC } from 'react'

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Typography,
  CardActions,
  styled
} from '@mui/material'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import { Collaboration } from 'models'
import { useCreateResponseMutation } from 'services/responses.endpoints'

// const CollaborationLink = styled(Typography, {p})(({ theme }) => ({
//   textDecoration: 'none',
//   color: theme.palette.primary.main
// }))

type CollaborationCardProps = {
  collaboration: Collaboration
}

const CollaborationCard: FC<CollaborationCardProps> = ({ collaboration }) => {
  const userId = useAppSelector(state => state.auth.user.id)
  const responded = collaboration.responses.some(
    response => response.userId === userId
  )
  const owner = collaboration.userId === userId

  const [createResponse] = useCreateResponseMutation()

  const createResponseHandler = () => {
    createResponse({ collaborationId: collaboration.id, explanation: '' })
  }

  return (
    <Card>
      <CardContent>
        <Grid container direction="column" rowSpacing={1}>
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  component={Link}
                  to={`/collaborations/${collaboration.id}`}
                  variant="h6"
                >
                  {collaboration.name}
                </Typography>
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
            <Typography variant="body1">{collaboration.description}</Typography>
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
            </Grid>
          </Grid>

          <Grid item>
            <Typography display="inline">Автор: </Typography>
            <Typography
              component={Link}
              to={`/profile/${collaboration.userId}`}
              color="black"
              display="inline"
            >
              {collaboration.user.username}
            </Typography>
          </Grid>

          <Grid item textAlign="right">
            {!owner && (
              <Button
                onClick={() => createResponseHandler()}
                disabled={responded}
              >
                Откликнуться
              </Button>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CollaborationCard
