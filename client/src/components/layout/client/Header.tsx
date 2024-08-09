'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import { useSession } from 'next-auth/react'

import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import ModeDropdown from '@components/layout/shared/ModeDropdown'
import FrontMenu from './FrontMenu'
import CustomIconButton from '@core/components/mui/IconButton'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import styles from './styles.module.css'
import UserDropdown from '../shared/UserDropdown'

const Header = ({ mode }: { mode: Mode }) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Hooks
  const isBelowLgScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true
  })

  const { status, data: session } = useSession()

  console.log('session:', session?.user)

  if (status === 'loading') return null

  return (
    <header className={classnames(frontLayoutClasses.header, styles.header)}>
      <div className={classnames(frontLayoutClasses.navbar, styles.navbar, { [styles.headerScrolled]: trigger })}>
        <div className={classnames(frontLayoutClasses.navbarContent, styles.navbarContent)}>
          {isBelowLgScreen ? (
            <div className='flex items-center gap-2 sm:gap-4'>
              <IconButton onClick={() => setIsDrawerOpen(true)} className='-mis-2'>
                <i className='tabler-menu-2 text-textPrimary' />
              </IconButton>
              <Link href='/'>
                <Logo />
              </Link>
              <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          ) : (
            <div className='flex items-center gap-10'>
              <Link href='/'>
                <Logo />
              </Link>
              <FrontMenu mode={mode} isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
            </div>
          )}
          <div className='flex items-center gap-2 sm:gap-4'>
            <ModeDropdown />
            {status === 'unauthenticated' && (
              <div className='flex flex-col lg:flex-row items-center gap-3'>
                <Button component={Link} href='/auth/login' className='whitespace-nowrap' target='_blank'>
                  Login
                </Button>
                <Button
                  component={Link}
                  variant='contained'
                  href='/auth/register'
                  className='whitespace-nowrap'
                  target='_blank'
                >
                  Register Now
                </Button>
              </div>
            )}
            {status === 'authenticated' && <UserDropdown data={session?.user} />}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
