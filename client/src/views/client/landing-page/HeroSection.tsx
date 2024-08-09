// React Imports
import { useState, useEffect } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import { useSession } from 'next-auth/react'

import type { SystemMode } from '@core/types'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styles Imports
import styles from './styles.module.css'
import frontCommonStyles from '@views/client/styles.module.css'

const HeroSection = ({ mode }: { mode: SystemMode }) => {
  // States
  const [transform, setTransform] = useState('')

  // Vars
  const dashboardImageLight = '/images/client/landing-page/Online world-pana.svg'
  const dashboardImageDark = '/images/client/landing-page/Online world-pana.svg'
  const elementsImageLight = '/images/client/landing-page/hero-elements-light.png'
  const elementsImageDark = '/images/client/landing-page/hero-elements-dark.png'
  const heroSectionBgLight = '/images/client/landing-page/hero-bg-light.png'
  const heroSectionBgDark = '/images/client/landing-page/hero-bg-dark.png'

  // Hooks
  const { mode: muiMode } = useColorScheme()
  const dashboardImage = useImageVariant(mode, dashboardImageLight, dashboardImageDark)
  const elementsImage = useImageVariant(mode, elementsImageLight, elementsImageDark)
  const heroSectionBg = useImageVariant(mode, heroSectionBgLight, heroSectionBgDark)

  const _mode = (muiMode === 'system' ? mode : muiMode) || mode

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMouseMove = (event: MouseEvent) => {
        const rotateX = (window.innerHeight - 2 * event.clientY) / 100
        const rotateY = (window.innerWidth - 2 * event.clientX) / 100

        setTransform(
          `perspective(1200px) rotateX(${rotateX < -40 ? -20 : rotateX}deg) rotateY(${rotateY}deg) scale3d(1,1,1)`
        )
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  const { data, status } = useSession()

  return (
    <section id='home' className='overflow-hidden pbs-[75px] -mbs-[75px] relative'>
      <img
        src={heroSectionBg}
        alt='hero-bg'
        className={classnames('bs-[95%] sm:bs-[85%] md:bs-[80%]', styles.heroSectionBg, {
          [styles.bgLight]: _mode === 'light',
          [styles.bgDark]: _mode === 'dark'
        })}
      />
      <div className={classnames('pbs-[88px] overflow-hidden', frontCommonStyles.layoutSpacing)}>
        <div className='md:max-is-[650px] mbs-0 mbe-7 mli-auto text-center relative'>
          <Typography
            className={classnames('font-extrabold sm:text-[42px] text-2xl mbe-4 leading-[60px]', styles.heroText)}
          >
            Comprehensive Toxic Comments Classification Platform
          </Typography>
          <Typography variant='subtitle2' className='text-base font-medium leading-10' color='text.primary'>
            Harnessing Advanced AI Techniques to Mitigate Harmful Comments in Somali Language Across Digital Platforms
          </Typography>
          <div className='flex mbs-6 items-baseline justify-center relative'>
            {/* <div className='flex gap-2 absolute inline-start-[0%] block-start-[41%] max-md:hidden'>
              <Typography className='font-medium'>Join community</Typography>
              <img src='/images/client/landing-page/join-community-arrow.png' alt='arrow' height='48' width='60' />
            </div> */}
            {status == 'unauthenticated' && (
              <Button component={Link} size='large' href='/auth/login' variant='contained' color='primary'>
                Get Early Access
              </Button>
            )}
            {status == 'authenticated' && (
              <Button component={Link} size='large' href='/classify' variant='contained' color='primary'>
                Get Early Access
              </Button>
            )}
          </div>
        </div>
      </div>
      <div
        className={classnames('relative  text-center ', frontCommonStyles.layoutSpacing)}
        style={{ transform: transform }}
      >
        <Link href='/' target='_blank' className='block relative'>
          <img src={dashboardImage} alt='dashboard-image' className={classnames('mli-auto', styles.heroSecDashboard)} />
          {/* <div className={classnames('absolute', styles.heroSectionElements)}>
            <img src={elementsImage} alt='dashboard-elements' />
          </div> */}
        </Link>
      </div>
    </section>
  )
}

export default HeroSection
