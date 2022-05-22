import React, { FC, useEffect, useRef } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import SendIcon from '@mui/icons-material/Send'
import { Divider, Grid, IconButton } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import * as yup from 'yup'

import { Input } from 'components'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Message as MessageType } from 'models'
import {
  useGetMessagesQuery,
  chatsEndpointsUtil
} from 'services/chats.endpoints'

import Message from './Message'

type FormData = {
  message: string
}

const schema: yup.SchemaOf<FormData> = yup.object({
  message: yup.string().required()
})

const Dialog: FC = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.auth.user.id)
  const { id } = useParams<{ id: string }>()
  const { data: messages } = useGetMessagesQuery(id)
  const socket = useRef<Socket>()

  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { message: '' },
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (!process.env.REACT_APP_BASE_URL || !id) return
    socket.current = io(process.env.REACT_APP_BASE_URL, {
      transports: ['websocket']
    })

    socket.current.emit('joinRoom', { roomId: +id })

    socket.current.on('messageToClient', (data: MessageType) => {
      dispatch(
        chatsEndpointsUtil.updateQueryData('getMessages', id, draftMessages => {
          draftMessages.push(data)
        })
      )
    })

    return () => {
      socket.current?.emit('leaveRoom', { roomId: +id })
      socket.current?.disconnect()
    }
  }, [id, dispatch])

  const sendMessage: SubmitHandler<FormData> = data => {
    if (!id) return
    socket.current?.emit('messageToServer', {
      senderId: userId,
      roomId: +id,
      message: data.message
    })
    reset()
  }

  if (!messages) {
    return null
  }

  return (
    <Grid
      container
      direction="column"
      sx={{
        position: 'relative',
        height: '100%',
        p: 2,
        overflow: 'auto',
        '::-webkit-scrollbar': {
          display: 'none'
        }
      }}
      justifyContent="space-between"
      wrap="nowrap"
    >
      <Grid
        item
        sx={{
          height: '100%',
          overflow: 'auto',
          '::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <Grid
          id="scrollableDiv"
          sx={{
            height: '100%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            '::-webkit-scrollbar': {
              display: 'none'
            }
          }}
        >
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={+messages.length}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            next={() => {}}
            hasMore={false}
            loader={<></>}
          >
            <Grid container direction="column" rowGap={2}>
              {messages?.map(message => (
                <Grid key={message.id} item>
                  <Message message={message} />
                </Grid>
              ))}
            </Grid>
          </InfiniteScroll>
        </Grid>
      </Grid>

      <Grid item sx={{ mt: 2 }}>
        <Divider sx={{ mb: 2 }} />

        <Grid container alignItems="center" columnSpacing={2}>
          <Grid item flexGrow={1}>
            <Input
              control={control}
              name="message"
              placeholder="Введите сообщение..."
            />
          </Grid>

          <Grid item>
            <IconButton onClick={handleSubmit(sendMessage)}>
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Dialog
