// components/PagePosts.tsx
'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import { Grid } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'

// Component imports
import { createColumnHelper } from '@tanstack/react-table'

import CustomDataTable from './CustomDataTable'


// Type Imports
import type { FacebookPost } from './types'
import { useGetPagePostsMutation } from '@/redux-store/pagePostsApi'
import type { RootState } from '@/redux-store'
import ActivePageTokenModal from '../model'

// Column Definitions
const columnHelper = createColumnHelper<FacebookPost>()

function PagePosts({ handlePostIdClick }: { handlePostIdClick: (postId: string) => void }) {
  // ** States
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [search, setSearch] = useState<string>('')
  const [posts, setPosts] = useState<FacebookPost[]>([])

  const pageId = useSelector((state: RootState) => state.pagePosts?.pageId)
  const accessToken = useSelector((state: RootState) => state.pagePosts?.accessToken)

  const [getPagePosts, { data: pagePosts, isFetching, isLoading }] = useGetPagePostsMutation()

  useEffect(() => {
    if (pageId && accessToken) {
      getPagePosts({ page_id: pageId, access_token: accessToken })
    }
  }, [pageId, accessToken, getPagePosts, currentPage, rowsPerPage])

  useEffect(() => {
    if (pagePosts?.data) {
      const filteredPosts = pagePosts.data.filter(post => post.message)

      setPosts(filteredPosts)
    }
  }, [pagePosts])

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onPostIdClick = (postId: string) => {
    handlePostIdClick(postId)
  }

  // Columns definition
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: row => (
          <span onClick={() => onPostIdClick(row.getValue())} className='cursor-pointer text-blue-500'>
            {row.getValue()}
          </span>
        )
      }),
      columnHelper.accessor('message', {
        header: 'Message',
        cell: row => `${row.getValue()?.slice(0, 30)}...` || 'No message'
      }),
      columnHelper.accessor('created_time', {
        header: 'Created Time',
        cell: row => moment(row.getValue()).format('MMM DD, YYYY, h:mm A')
      })
    ],
    []
  )

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CustomDataTable
            columns={columns}
            data={{ data: posts }}
            title='Page Posts'
            ButtonLabel={'Active Page Token'}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            search={search}
            setSearch={setSearch}
            isLoading={isLoading}
            isFetching={isFetching}
            addButtonClick={handleClickOpen}
          />
        </Grid>
        <ActivePageTokenModal open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      </Grid>
    </>
  )
}

export default PagePosts
