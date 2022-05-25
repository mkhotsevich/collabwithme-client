import React, { FC, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Chip, Grid, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Input, Select, Modal } from 'components'
import { genders } from 'constants/genders'
import { useAppSelector } from 'hooks'
import { Link, Network } from 'models'
import {
  useCreateLinkMutation,
  useDeleteLinkMutation,
  useUpdateLinkMutation,
} from 'services/links.endpoints'
import { useGetNetworksQuery } from 'services/networks.endpoints'
import {
  useGetUserQuery,
  useUpdatePasswordMutation,
  useUpdatePersonalInfoMutation,
} from 'services/users.endpoints'

type PersonalInfoFormData = {
  email: string
  username: string
  firstName?: string
  lastName?: string
  gender?: string
}

type PasswordFormData = {
  currentPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

type LinkFormData = {
  link: string
  networkId: string
}

const personalInfoSchema: yup.SchemaOf<PersonalInfoFormData> = yup.object({
  email: yup.string().required('Обязательно'),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  username: yup.string().required('Обязательно'),
  gender: yup.string().optional(),
})

const passwordSchema: yup.SchemaOf<PasswordFormData> = yup.object({
  currentPassword: yup.string().required('Обязательно'),
  newPassword: yup.string().required('Обязательно'),
  newPasswordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Пароль не совпадают')
    .required('Обязательно'),
})

const linkSchema: yup.SchemaOf<LinkFormData> = yup.object({
  link: yup.string().required('Обязательно'),
  networkId: yup.string().required(),
})

const Profile: FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const userId = useAppSelector((state) => state.auth.user.id)
  const { data: user, isLoading } = useGetUserQuery(userId)
  const [updatePersonalInfo, { isLoading: isPersonalInfoUpdating }] =
    useUpdatePersonalInfoMutation()
  const [updatePassword, { isLoading: isPasswordUpdating }] =
    useUpdatePasswordMutation()
  const [createLink, { isLoading: isLinkCreating }] = useCreateLinkMutation()
  const [deleteLink] = useDeleteLinkMutation()
  const [updateLink, { isLoading: isLinkUpdating }] = useUpdateLinkMutation()
  const { data: networks } = useGetNetworksQuery()

  const remainedNetworks = networks?.filter(
    (n) => !user?.links?.some((l) => l.networkId === n.id)
  )

  const {
    control: personalInfoControl,
    reset: personalInfoReset,
    handleSubmit: personalInfoHandleSubmit,
    formState: { errors: personalInfoErrors },
  } = useForm<PersonalInfoFormData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      gender: '',
    },
    resolver: yupResolver(personalInfoSchema),
  })

  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    reset: passwordReset,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
    resolver: yupResolver(passwordSchema),
  })

  const {
    control: linkControl,
    formState: { errors: linkErrors },
    handleSubmit: linkHandleSubmit,
    setValue: linkSetValue,
    reset: linkReset,
  } = useForm<LinkFormData>({
    defaultValues: { link: '', networkId: '' },
    resolver: yupResolver(linkSchema),
  })

  const [openCreateLink, setOpenCreateLink] = useState<Network | null>(null)
  const [openUpdateLink, setOpenUpdateLink] = useState<Link | null>(null)
  const openCreateLinkHandler = (network: Network) => {
    setOpenCreateLink(network)
    linkSetValue('networkId', network.id.toString())
  }
  const openUpdateLinkHandler = (link: Link) => {
    setOpenUpdateLink(link)
    linkSetValue('networkId', link.networkId.toString())
    linkSetValue('link', link.link)
  }
  const closeCreateUpdateLinkHandler = () => {
    setOpenCreateLink(null)
    setOpenUpdateLink(null)
    linkReset()
  }

  useEffect(() => {
    personalInfoReset({
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      gender: genders?.find((g) => g.name === user?.gender)?.id || '',
    })
  }, [user, personalInfoReset])

  const updatePersonalInfoHandler: SubmitHandler<
    PersonalInfoFormData
  > = async ({ gender, ...data }) => {
    try {
      await updatePersonalInfo({
        ...data,
        gender: genders.find((g) => g.id === gender)?.name || 'Не указан',
      }).unwrap()
      enqueueSnackbar('Информация о пользователе успешно изменена', {
        variant: 'success',
      })
    } catch (e) {}
  }

  const updatePasswordHandler: SubmitHandler<PasswordFormData> = async (
    data
  ) => {
    try {
      await updatePassword(data).unwrap()
      enqueueSnackbar('Пароль успешно изменен', {
        variant: 'success',
      })
      passwordReset()
    } catch (e) {}
  }

  const createLinkHandler: SubmitHandler<LinkFormData> = async (data) => {
    try {
      await createLink({ ...data, networkId: +data.networkId }).unwrap()
      enqueueSnackbar('Ссылка успешно добавлена', {
        variant: 'success',
      })
      closeCreateUpdateLinkHandler()
    } catch (e) {}
  }

  const deleteLinkHander = async (id: number) => {
    try {
      await deleteLink(id).unwrap()
      enqueueSnackbar('Ссылка успешно удалена', {
        variant: 'success',
      })
    } catch (e) {}
  }

  const updateLinkHandler: SubmitHandler<LinkFormData> = async ({ link }) => {
    try {
      if (!openUpdateLink) return
      await updateLink({ id: openUpdateLink.id, link }).unwrap()
      enqueueSnackbar('Ссылка успешно изменена', {
        variant: 'success',
      })
      closeCreateUpdateLinkHandler()
    } catch (e) {}
  }

  if (isLoading) {
    return null
  }

  return (
    <>
      <Grid container direction="column" rowGap={4}>
        <Grid item>
          <Typography variant="h1">Настройки профиля</Typography>
        </Grid>

        <Grid item>
          <Grid container direction="column" rowGap={3}>
            <Grid item>
              <Typography variant="h2">Личные данные</Typography>
            </Grid>

            <Grid item>
              <Input
                control={personalInfoControl}
                name="email"
                label="Email"
                required
                error={!!personalInfoErrors.email}
                helperText={personalInfoErrors.email?.message}
              />
            </Grid>

            <Grid item>
              <Input
                control={personalInfoControl}
                name="username"
                label="Псевдоним"
                required
                error={!!personalInfoErrors.username}
                helperText={personalInfoErrors.username?.message}
              />
            </Grid>

            <Grid item>
              <Input
                control={personalInfoControl}
                name="firstName"
                label="Имя"
              />
            </Grid>

            <Grid item>
              <Input
                control={personalInfoControl}
                name="lastName"
                label="Фамилия"
              />
            </Grid>

            <Grid item>
              <Select
                control={personalInfoControl}
                name="gender"
                options={genders}
                label="Пол"
                error={!!personalInfoErrors.gender}
                helperText={personalInfoErrors.gender?.message}
              />
            </Grid>

            <Grid item textAlign="right">
              <LoadingButton
                loading={isPersonalInfoUpdating}
                onClick={personalInfoHandleSubmit(updatePersonalInfoHandler)}
              >
                Сохранить
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" rowGap={3}>
            <Grid item>
              <Typography variant="h2">Изменить пароль</Typography>
            </Grid>

            <Grid item>
              <Input
                control={passwordControl}
                name="currentPassword"
                label="Текущий пароль"
                error={!!passwordErrors.currentPassword}
                helperText={passwordErrors.currentPassword?.message}
                required
                type="password"
              />
            </Grid>

            <Grid item>
              <Input
                control={passwordControl}
                name="newPassword"
                label="Новый пароль"
                error={!!passwordErrors.newPassword}
                helperText={passwordErrors.newPassword?.message}
                required
                type="password"
              />
            </Grid>

            <Grid item>
              <Input
                control={passwordControl}
                name="newPasswordConfirmation"
                label="Новый пароль повторно"
                error={!!passwordErrors.newPasswordConfirmation}
                helperText={passwordErrors.newPasswordConfirmation?.message}
                required
                type="password"
              />
            </Grid>

            <Grid item textAlign="right">
              <LoadingButton
                loading={isPasswordUpdating}
                onClick={passwordHandleSubmit(updatePasswordHandler)}
              >
                Сохранить
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid container direction="column" rowGap={3}>
            <Grid item>
              <Typography variant="h2">Социальные профили</Typography>
            </Grid>

            <Grid item>
              <Grid container columnGap={2} rowGap={2}>
                {user?.links?.map((link) => (
                  <Grid key={link.id} item>
                    <Chip
                      size="medium"
                      label={link.network?.name}
                      color="success"
                      onDelete={() => deleteLinkHander(link.id)}
                      onClick={() => openUpdateLinkHandler(link)}
                    />
                  </Grid>
                ))}
                {remainedNetworks?.map((network) => (
                  <Grid key={network.id} item>
                    <Chip
                      size="medium"
                      label={network.name}
                      onClick={() => openCreateLinkHandler(network)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Modal
        open={!!openCreateLink || !!openUpdateLink}
        onClose={closeCreateUpdateLinkHandler}
      >
        <Grid container direction="column" rowGap={2}>
          <Grid item>
            {openCreateLink && (
              <Typography variant="h6">
                Добавить ссылку на {openCreateLink?.name}
              </Typography>
            )}
            {openUpdateLink && (
              <Typography variant="h6">
                Изменить ссылку на{' '}
                {networks?.find((n) => n.id === openUpdateLink.networkId)?.name}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <Input
              control={linkControl}
              name="link"
              label="Ссылка"
              error={!!linkErrors.link}
              helperText={linkErrors.link?.message}
              required
            />
          </Grid>

          <Grid item textAlign="right">
            <LoadingButton
              loading={isLinkCreating || isLinkUpdating}
              onClick={
                openCreateLink
                  ? linkHandleSubmit(createLinkHandler)
                  : linkHandleSubmit(updateLinkHandler)
              }
            >
              Сохранить
            </LoadingButton>
          </Grid>
        </Grid>
      </Modal>
    </>
  )
}

export default Profile
