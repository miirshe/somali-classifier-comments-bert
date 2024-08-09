'use client'

// React Imports
import { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useDispatch, useSelector } from 'react-redux'

// MUI Imports
import { Grid, Typography, Box } from '@mui/material'

// Recharts Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { TooltipProps } from 'recharts'

// Styled Component Imports
const AppRecharts = dynamic(() => import('@/libs/styles/AppRecharts'))

// Type Imports
import type { RootState } from '@/redux-store'
import { usePredictMultipleCommentsMutation } from '@/redux-store/pagePostsApi'

// Labels
const labels = ['Sun ah', 'Fuxshi', 'Goodis', 'Caay', 'Sinji-nacayb', 'Aan sun aheyn']

const labelTranslations = {
  'Sun ah': 'Toxic',
  Fuxshi: 'Obscene',
  Goodis: 'Threat',
  Caay: 'Insult',
  'Sinji-nacayb': 'Identity-hate',
  'Aan sun aheyn': 'Non-Toxic'
}

const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57']

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography color='text.primary'>{label}</Typography>
        {payload.map((i: any) => (
          <Box key={i.dataKey} className='flex items-center gap-2.5' sx={{ '& i': { color: i.fill } }}>
            <i className='tabler-circle-filled text-[10px]' />
            <Typography variant='body2'>{`${i.dataKey} : ${i.value}%`}</Typography>
          </Box>
        ))}
      </div>
    )
  }

  return null
}

const ClassifyMultipleComments = ({ postId }: { postId: string }) => {
  const [predictions, setPredictions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const accessToken = useSelector((state: RootState) => state.pagePosts?.accessToken)

  const [predictMultiple, { data, isFetching }] = usePredictMultipleCommentsMutation()

  useEffect(() => {
    if (postId && accessToken) {
      predictMultiple({ post_id: postId, access_token: accessToken }).then(response => {
        setPredictions(response.data || [])
        setIsLoading(false)
      })
    }
  }, [postId, accessToken, predictMultiple])

  // Aggregate predictions
  const aggregatedData = labels.reduce(
    (acc, label) => {
      acc[label] = predictions.reduce((sum, prediction) => sum + prediction[label], 0)

      return acc
    },
    {} as Record<string, number>
  )

  // Calculate total and percentages
  const total = Object.values(aggregatedData).reduce((sum, value) => sum + value, 0)

  const aggregatedPercentages = labels.reduce(
    (acc, label) => {
      acc[label] = total > 0 ? ((aggregatedData[label] / total) * 100).toFixed(2) : '0.00'

      return acc
    },
    {} as Record<string, string>
  )

  const chartData = labels.map(label => ({
    name: `${labelTranslations[label]} (${label})`,
    Prediction: aggregatedPercentages[label]
  }))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h6'>Aggregated Predictions for Post ID: {postId}</Typography>
        {isLoading || isFetching ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <Box mt={5}>
              <AppRecharts>
                <ResponsiveContainer width='100%' height={350}>
                  <BarChart data={chartData} barSize={40}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {colors.map((_, index) => {
                      return <Bar dataKey='Prediction' fill={colors[index]} key={index} />
                    })}
                  </BarChart>
                </ResponsiveContainer>
              </AppRecharts>
            </Box>
            <Grid item xs={12} className='mt-3'>
              <Box mt={2}>
                <Typography variant='h6'>Aggregated Categories</Typography>
                {labels.map((label, index) => (
                  <Typography key={label} variant='body1' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, backgroundColor: colors[index], display: 'inline-block' }} />
                    {`${labelTranslations[label]} (${label}) : (${aggregatedPercentages[label]}%)`}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default ClassifyMultipleComments
