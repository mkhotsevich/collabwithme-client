import React, { FC } from 'react'

import { Grid, Typography, styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from 'hooks'
import { Room } from 'models'

const ChatContainer = styled(Grid)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer'
}))

type ChatProps = {
  chat: Room
}

const Chat: FC<ChatProps> = ({ chat }) => {
  const { id } = useParams<{ id: string }>()
  const userId = useAppSelector(state => state.auth.user.id)
  const navigate = useNavigate()
  const user = chat.users.find(user => user.id !== userId)
  const selected = id === chat.id.toString()

  return (
    <ChatContainer
      container
      direction="column"
      rowGap={1}
      sx={{ p: 2 }}
      wrap="nowrap"
      onClick={() => navigate(`/chats/${chat.id}`)}
    >
      <Grid item xs>
        <Typography variant="h6" color={selected ? 'primary' : 'white'}>
          {user?.username}
        </Typography>
      </Grid>
    </ChatContainer>
  )
}

export default Chat
