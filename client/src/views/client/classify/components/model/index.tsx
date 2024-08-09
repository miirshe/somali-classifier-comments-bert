// components/ActivePageTokenModal.tsx
import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'

import { setAccessToken, setPageId } from '@/redux-store/slices/pagePostsSlice'
import type { RootState } from '@/redux-store'

const ActivePageTokenModal = ({ open, handleClose }: { open: any; handleClickOpen: any; handleClose: any }) => {
  const page_id = useSelector((state: RootState) => state.pagePosts?.pageId)
  const access_token = useSelector((state: RootState) => state.pagePosts?.accessToken)
  const [pageId, setPageIdInput] = useState(page_id ?? '')
  const [accessToken, setAccessTokenInput] = useState(access_token ?? '')

  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(setPageId(pageId))
    dispatch(setAccessToken(accessToken))
    handleClose()
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Active Page Token</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Page ID'
            type='text'
            fullWidth
            value={pageId}
            onChange={e => setPageIdInput(e.target.value)}
          />
          <TextField
            margin='dense'
            label='Access Token'
            type='text'
            fullWidth
            value={accessToken}
            onChange={e => setAccessTokenInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ActivePageTokenModal
