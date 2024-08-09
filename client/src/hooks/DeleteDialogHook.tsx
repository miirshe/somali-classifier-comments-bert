import React, { useState, useCallback } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Slide from '@mui/material/Slide'
import Button from '@mui/material/Button'
import { TransitionProps } from '@mui/material/transitions'
import { FiLoader } from 'react-icons/fi'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface UseDeleteDialogProps {
  title: string
  content: string
  updateStatus?: boolean
}

interface DeleteDialogProps extends UseDeleteDialogProps {
  open: boolean
  onClose: (confirmed: boolean) => void
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ title, content, updateStatus, open, onClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => onClose(false)}
      aria-describedby='alert-dialog-slide-description'
      className='bg-[#1a202c]/30 backdrop-blur-sm border border-[#2d3748] rounded-lg'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-title' className='text-[18px] font-semibold '>
          {title}
        </DialogContentText>
        <DialogContentText id='alert-dialog-slide-description' className='text-[14px] mt-2'>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button className='py-2 px-3 rounded bg-primary text-white' onClick={() => onClose(false)}>
          Cancel
        </Button>
        {updateStatus ? (
          <Button
            className='py-2 px-3 rounded bg-orange-500 text-white text-base space-x-1'
            onClick={() => onClose(true)}
          >
            <span>Update</span>
          </Button>
        ) : (
          <Button className='py-2 px-3 rounded bg-red-500 text-white text-base space-x-1' onClick={() => onClose(true)}>
            <i className='tabler-trash text-[18px]' /> <span>Delete</span>
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

const useDeleteDialog = ({ title, content, updateStatus }: UseDeleteDialogProps) => {
  const [open, setOpen] = useState(false)
  const [onConfirm, setOnConfirm] = useState<(confirmed: boolean) => void>(() => {})

  const confirmDelete = useCallback(() => {
    return new Promise<boolean>(resolve => {
      setOnConfirm(() => resolve)
      setOpen(true)
    })
  }, [])

  const handleClose = useCallback(
    (confirmed: boolean) => {
      setOpen(false)
      onConfirm(confirmed)
    },
    [onConfirm]
  )

  const DeleteDialogComponent = useCallback(() => {
    return (
      <DeleteDialog title={title} content={content} updateStatus={updateStatus} open={open} onClose={handleClose} />
    )
  }, [title, content, open, handleClose])

  return { confirmDelete, DeleteDialogComponent }
}

export default useDeleteDialog
