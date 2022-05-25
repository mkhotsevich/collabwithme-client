import React, { FC } from 'react'

import { Grid, Paper, styled } from '@mui/material'

import { useAppSelector } from 'hooks'
import { Message as MessageType } from 'models'

type MessageProps = {
  message: MessageType
}

const MessageContainer = styled(Paper)(() => ({}))

const Message: FC<MessageProps> = ({ message }) => {
  const userId = useAppSelector((state) => state.auth.user.id)
  return (
    <Grid
      container
      justifyContent={userId === message.userId ? 'flex-end' : 'flex-start'}
    >
      <Grid item>
        <MessageContainer elevation={0} sx={{ p: 1 }}>
          {message.message}
        </MessageContainer>
      </Grid>
    </Grid>
  )
}

export default Message
