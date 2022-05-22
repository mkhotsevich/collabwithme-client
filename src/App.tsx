import React, { FC } from 'react'

import { Container } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppBar } from 'components'
import { useAuth, useNotifier } from 'hooks'
import {
  Collaborations,
  Profile,
  Responses,
  SignIn,
  SignUp,
  Statistics,
  Collaboration,
  MyCollaborations,
  MyCollaboration,
  MyResponses,
  User,
  Chats
} from 'pages'
import Dialog from 'pages/Chats/Dialog'

const App: FC = () => {
  useNotifier()
  const { isAuth } = useAuth()

  return (
    <React.Fragment>
      <AppBar />
      <Container>
        <Routes>
          {isAuth ? (
            <>
              <Route path="/collaborations" element={<Collaborations />} />
              <Route path="/collaborations/:id" element={<Collaboration />} />
              <Route path="/chats" element={<Chats />}>
                <Route path=":id" element={<Dialog />} />
              </Route>
              <Route path="/users/:id" element={<User />} />
              <Route
                path="/my-collaborations/:id"
                element={<MyCollaboration />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/my-collaborations" element={<MyCollaborations />} />
              <Route path="/my-responses" element={<MyResponses />} />
              <Route path="/responses" element={<Responses />} />
              <Route path="*" element={<Navigate to="/collaborations" />} />
            </>
          ) : (
            <>
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </>
          )}
        </Routes>
      </Container>
    </React.Fragment>
  )
}

export default App
