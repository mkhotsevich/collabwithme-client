import React, { FC } from 'react'

import { Container } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AppBar } from 'components'
import { useAppSelector, useNotifier } from 'hooks'
import { Collaborations, SignIn, SignUp } from 'pages'

const App: FC = () => {
  useNotifier()
  const isAuth = useAppSelector(state => !!state.auth.token)

  return (
    <React.Fragment>
      <AppBar />
      <Container>
        <Routes>
          {isAuth ? (
            <>
              <Route path="/collaborations" element={<Collaborations />} />
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
