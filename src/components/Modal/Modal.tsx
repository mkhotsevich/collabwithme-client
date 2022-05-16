import React, { FC } from 'react'

import { Modal as MuiModal, ModalProps, Paper, styled } from '@mui/material'

const ModalContainer = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '512px',
  padding: theme.spacing(2)
}))

const Modal: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <MuiModal {...props}>
      <ModalContainer>{children}</ModalContainer>
    </MuiModal>
  )
}

export default Modal
