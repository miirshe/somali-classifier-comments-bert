import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'

import CardHeader from '@mui/material/CardHeader'
import type { TextFieldProps } from '@mui/material/TextField'

// Component Imports
import { Button, Grid, Typography } from '@mui/material'

import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

type Props = {
  globalFilter: string | number
  setGlobalFilter: (value: string) => void
  title: String
  showButton?: boolean
  ButtonLabel: String
  rowsPerPage: number
  setRowsPerPage: (limit: number) => void
  addButtonClick: () => void
  setCurrentPage: (page: number) => void
}

const Header = ({
  globalFilter,
  setGlobalFilter,
  title,
  ButtonLabel,
  rowsPerPage,
  setRowsPerPage,
  addButtonClick,
  setCurrentPage,
  showButton
}: Props) => {
  //
  const [value, setValue] = useState<string | number>(globalFilter)

  useEffect(() => {
    setValue(globalFilter)
  }, [globalFilter])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlobalFilter(value)
    }, 500)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Grid className='py-2 px-8'>
      <div>
        <div className='flex justify-between items-center'>
          <div className='text-2xl py-3'>{title}</div>
          <div className='flex items-center gap-5'>
            <Button
              variant='contained'
              color='primary'
              className='flex items-center gap-3 py-2'
              onClick={addButtonClick}
            >
              <i className='tabler-plus text-[22px]' />
              <span>{ButtonLabel}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className='flex justify-between items-center py-3 mt-5'>
        <div className='flex justify-between items-center gap-1'>
          <Typography>Show</Typography>
          <div className='w-[20%] min-w-[100px]'>
            <CustomTextField
              select
              fullWidth
              defaultValue={rowsPerPage}
              id='custom-select-native'
              SelectProps={{ native: true }}
              onChange={e => {
                setCurrentPage(1)
                setRowsPerPage(Number(e.target.value))
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={-1}>All</option>
            </CustomTextField>
          </div>
          <Typography>Entries</Typography>
        </div>
        <div className='search'>
          <CustomTextField value={value} onChange={e => setValue(e.target.value)} placeholder='Search..' />
        </div>
      </div>
    </Grid>
  )
}

export default Header
