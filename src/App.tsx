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
  MyCollaborations,
  Collaboration
} from 'pages'

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
              <Route path="/profile" element={<Profile />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/my-collaborations" element={<MyCollaborations />} />
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
