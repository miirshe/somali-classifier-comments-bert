// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Skeleton } from '@mui/material'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

export type UserDataType = {
  title: string
  value: string
  avatarIcon: string
  avatarColor?: ThemeColor
  loading?: boolean
}

const HorizontalWithSubtitle = (props: UserDataType) => {
  // Props
  const { title, value, avatarIcon, avatarColor, loading = false } = props

  return (
    <Card>
      <CardContent className='flex justify-between gap-1'>
        {loading ? (
          <>
            <div className='flex flex-col gap-1 flex-grow'>
              <Skeleton variant='text' width='70%' />
              <div className='flex items-center gap-2 flex-wrap'>
                <Skeleton variant='text' width='40%' height={32} />
              </div>
            </div>
            <Skeleton variant='rounded' width={42} height={42} />
          </>
        ) : (
          <>
            <div className='flex flex-col gap-1 flex-grow'>
              <Typography color='text.primary'>{title}</Typography>
              <div className='flex items-center gap-2 flex-wrap'>
                <Typography variant='h4'>{value}</Typography>
              </div>
            </div>
            <CustomAvatar color={avatarColor} skin='light' variant='rounded' size={42}>
              <i className={classnames(avatarIcon, 'text-[26px]')} />
            </CustomAvatar>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default HorizontalWithSubtitle
