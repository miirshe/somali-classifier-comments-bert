'use client'

// React Imports
import { useState } from 'react'

import dynamic from 'next/dynamic'

// React Hook Form Imports
import type { SubmitHandler } from 'react-hook-form'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// MUI Imports
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Stack, Typography, Grid } from '@mui/material'

// Recharts Imports
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { TooltipProps } from 'recharts'

// Styled Component Imports
const AppRecharts = dynamic(() => import('@/libs/styles/AppRecharts'))

// Redux Imports
import { usePredictCommentMutation } from '@/redux-store/pagePostsApi'

// Form Data Type
type FormData = {
  comment: string
}

// Labels
const labels = [
  { english: 'Toxic', somali: 'Sun ah' },
  { english: 'Obscene', somali: 'Fuxshi' },
  { english: 'Threat', somali: 'Goodis' },
  { english: 'Insult', somali: 'Caay' },
  { english: 'Identity-hate', somali: 'Sinji-nacayb' },
  { english: 'Non-Toxic', somali: 'Aan sun aheyn' }
]

const colors = ['##ec1414', '#FFA500', '#8B0000', '#FFD700', '#800080', '#32CD32']

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography color='text.primary'>{label}</Typography>
        {payload.map((i: any) => (
          <Box key={i.dataKey} className='flex items-center gap-2.5' sx={{ '& i': { color: i.fill } }}>
            <i className='tabler-circle-filled text-[10px]' />
            <Typography variant='body2'>{`${i.dataKey} : ${i.value}`}</Typography>
          </Box>
        ))}
      </div>
    )
  }

  return null
}

// Component
const ClassifySingleComment = () => {
  const [prediction, setPrediction] = useState<any>(null)

  const Schema = yup.object({
    comment: yup.string().required('Comment is required')
  })

  const form = useForm<FormData>({
    resolver: yupResolver(Schema),
    defaultValues: {
      comment: ''
    }
  })

  const [predictComment] = usePredictCommentMutation()

  const onsubmit: SubmitHandler<FormData> = async values => {
    try {
      const response = await predictComment(values).unwrap()

      if (response) {
        console.log('Response data:', response)
        setPrediction(response)
      } else {
        console.log('Response error:', response)
      }
    } catch (error) {
      console.log('Submit comment failed:', error)
    }
  }

  const chartData = prediction
    ? labels.map((label, index) => ({
        name: `${label.english} (${label.somali})`,
        Prediction: prediction[label.somali],
        fill: colors[index] // Assign the fill color from the colors array
      }))
    : []

  return (
    <Stack spacing={5} sx={{ my: 5 }}>
      <Box>
        <Typography variant='h4'>Classify Single Comment</Typography>
        <Typography variant='subtitle1'>Enter a comment below to classify its content.</Typography>
      </Box>
      <form onSubmit={form.handleSubmit(onsubmit)} className='flex flex-col justify-center gap-2'>
        <Controller
          name='comment'
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              type='text'
              fullWidth
              multiline
              maxRows={4}
              rows={4}
              placeholder='Write your comment...'
              error={!!error?.comment}
              helperText={error?.comment?.message}
            />
          )}
        />
        <Button variant='contained' color='primary' type='submit' className='w-full md:w-fit'>
          Predict
        </Button>
      </form>

      {prediction && (
        <>
          <Box mt={5}>
            <AppRecharts>
              <ResponsiveContainer width='100%' height={350}>
                <BarChart data={chartData} barSize={40}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey='Prediction' isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </AppRecharts>
          </Box>
          <Grid item xs={12}>
            <Box mt={2}>
              <Typography variant='h6'>Categories</Typography>
              {labels.map((label, index) => (
                <Typography key={label.somali} variant='body1' sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 16, height: 16, backgroundColor: colors[index], display: 'inline-block' }} />
                  {`${label.english} (${label.somali}) : ${prediction[label.somali]}`}
                </Typography>
              ))}
            </Box>
          </Grid>
        </>
      )}
    </Stack>
  )
}

export default ClassifySingleComment
