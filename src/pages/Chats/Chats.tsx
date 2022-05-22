import React, { FC, useEffect, useRef } from 'react'

import { Grid, Typography, Paper, styled } from '@mui/material'
import { Outlet, useParams } from 'react-router-dom'

import { useGetRoomsQuery } from 'services/chats.endpoints'

import Chat from './Chat'

const OverflowPaper = styled(Paper)<{ selected?: boolean }>(({ selected }) => ({
  overflow: 'auto',
  '::-webkit-scrollbar': {
    display: 'none'
  },
  ...(selected && {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })
}))

const Chats: FC = () => {
  const { id: roomId } = useParams<{ id: string }>()
  const chatsRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)

  const { data: chats } = useGetRoomsQuery()

  useEffect(() => {
    const height = blockRef.current?.clientHeight.toString() + 'px'
    if (dialogRef.current && chatsRef.current && height) {
      dialogRef.current.style.height = height
      chatsRef.current.style.height = height
    }
  })

  return (
    <Grid container direction="column" rowGap={2} flexGrow={1}>
      <Grid item>
        <Typography variant="h1">Чат</Typography>
      </Grid>

      <Grid container item flexGrow={1}>
        <Grid container flexGrow={1} columnSpacing={2} ref={blockRef}>
          <Grid item xs={4} flexGrow={1}>
            <OverflowPaper ref={chatsRef}>
              {chats?.map(chat => (
                <Grid item key={chat.id}>
                  <Chat chat={chat} />
                </Grid>
              ))}
            </OverflowPaper>
          </Grid>
          <Grid item xs={8} flexGrow={1}>
            <OverflowPaper ref={dialogRef} selected={!roomId}>
              {roomId ? (
                <Outlet />
              ) : (
                <Typography>Выберите чат, чтобы начать диалог</Typography>
              )}
            </OverflowPaper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Chats
