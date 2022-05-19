import React, { FC, useCallback, useState } from 'react'

import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'

import { Collaboration } from 'models'
import { useGetCategoriesQuery } from 'services/categories.endpoints'
import { useGetCollaborationsQuery } from 'services/collaborations.endpoints'
import { useGetNetworksQuery } from 'services/networks.endpoints'

import CollaborationCard from './CollaborationCard'

const Collaborations: FC = () => {
  const [search, setSearch] = useState('')
  const [filterCategories, setFilterCategories] = useState<number[]>([])
  const [filterNetworks, setFilterNetworks] = useState<number[]>([])
  const [dateSort, setDateSort] = useState<string>('new')
  const { data: collaborations, isLoading } = useGetCollaborationsQuery()
  const { data: categories } = useGetCategoriesQuery()
  const { data: networks } = useGetNetworksQuery()

  const filterCollaborations = useCallback(
    (collaboration: Collaboration) => {
      const includesSearchName = collaboration.name
        .toLowerCase()
        .includes(search.toLowerCase())

      const includesCategories = filterCategories.every(cat =>
        collaboration.categories.some(coll => cat === coll.id)
      )

      const includesNetworks = filterNetworks.every(net =>
        collaboration.networks.some(coll => net === coll.id)
      )

      if (includesSearchName && includesCategories && includesNetworks) {
        return true
      }

      return false
    },
    [search, filterCategories, filterNetworks]
  )

  const sortCollaboration = useCallback(
    (a: Collaboration, b: Collaboration) => {
      const aDate = new Date(a.createdDate).getTime()
      const bDate = new Date(b.createdDate).getTime()
      if (dateSort === 'new') {
        return aDate - aDate
      }
      return bDate - aDate
    },
    [dateSort]
  )

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction="column" rowSpacing={2}>
      <Grid item>
        <Typography variant="h1">Коллаборации</Typography>
      </Grid>

      <Grid item>
        <TextField
          value={search}
          label="Поиск"
          onChange={e => setSearch(e.target.value)}
        />
      </Grid>

      <Grid item>
        <Grid container justifyContent="space-between" columnSpacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                label="Категория"
                multiple
                value={filterCategories}
                onChange={e => setFilterCategories(e.target.value as number[])}
              >
                {categories?.map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Социальная сеть</InputLabel>
              <Select
                label="Социальная сеть"
                multiple
                value={filterNetworks}
                onChange={e => setFilterNetworks(e.target.value as number[])}
              >
                {networks?.map(c => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Сортировка</InputLabel>
              <Select
                label="Сортировка"
                value={dateSort}
                onChange={e => setDateSort(e.target.value)}
              >
                <MenuItem value="new">Сначала новые</MenuItem>
                <MenuItem value="old">Сначала старые</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container direction="column" rowSpacing={2}>
          {collaborations
            ?.filter(filterCollaborations)
            ?.sort(sortCollaboration)
            ?.map(collaboration => (
              <Grid key={collaboration.id} item>
                <CollaborationCard collaboration={collaboration} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Collaborations
