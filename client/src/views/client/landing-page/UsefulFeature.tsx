// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import Paper from '@/assets/svg/client/landing-page/Paper'
import Check from '@/assets/svg/client/landing-page/Check'
import User from '@/assets/svg/client/landing-page/User'
import LaptopCharging from '@/assets/svg/client/landing-page/LaptopCharging'
import Rocket from '@/assets/svg/client/landing-page/Rocket'
import Document from '@/assets/svg/client/landing-page/Document'

// Styles Imports
import frontCommonStyles from '@views/client/styles.module.css'
import { MdiComments } from '@/assets/svg/client/landing-page/comments'
import { JamLanguage } from '@/assets/svg/client/landing-page/language'
import { UisAnalysis } from '@/assets/svg/client/landing-page/analysis'
import { MaterialSymbolsReport } from '@/assets/svg/client/landing-page/report'
import { IcBaselineFacebook } from '@/assets/svg/client/landing-page/facebook'

// Data
const feature = [
  {
    icon: <MdiComments color='var(--mui-palette-primary-main)' />,
    title: 'Hate Speech',
    description: 'Identifies comments that promote hate or violence against a particular group.'
  },
  {
    icon: <JamLanguage color='var(--mui-palette-primary-main)' />,
    title: 'Harassment',
    description: 'Detects language intended to intimidate or belittle individuals..'
  },
  {
    icon: <UisAnalysis color='var(--mui-palette-primary-main)' />,
    title: 'Real-Time Analysis',
    description: 'Our platform provides instantaneous analysis of comments, allowing users to see the toxicity score in real-time.'
  },
  {
    icon: <UisAnalysis color='var(--mui-palette-primary-main)' />,
    title: 'Sentiment Analysis',
    description: 'Beyond toxicity, our model can gauge the overall sentiment of comments, categorizing them as toxic(sun ah), obscene(fuxshi), threat(hanjabaad),insult(caay), identity-hate(singi-naceyb),non-toxic(aan sun aheyn), neutral, or negative.'
  },
  {
    icon: <MaterialSymbolsReport color='var(--mui-palette-primary-main)' />,
    title: 'Comprehensive Reporting',
    description: 'Our platform offers detailed reports that provide insights into the types and frequency of toxic comments.'
  },
  {
    icon: <IcBaselineFacebook color='var(--mui-palette-primary-main)' />,
    title: 'Facebook Integration',
    description: 'Seamlessly connect your Facebook account to the platform and gain access to comprehensive analysis tools for your page.'
  }
]

const UsefulFeature = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='features' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 pbs-12 pbe-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='tonal' color='primary' label=' Comprehensive Features' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4' className='text-center'>
                <span className='relative z-[1] font-extrabold'>
                  Discover
                  <img
                    src='/images/client/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                  />
                </span>{' '}
                the Powerful Tools and Capabilities That Drive Our Platform
              </Typography>
            </div>
            {/* <Typography className='text-center'>
              Not just a set of tools, the package includes ready-to-deploy conceptual application.
            </Typography> */}
          </div>
        </div>
        <div>
          <Grid container spacing={6}>
            {feature.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  {item.icon}
                  <Typography className='mbs-2' variant='h5'>
                    {item.title}
                  </Typography>
                  <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default UsefulFeature
