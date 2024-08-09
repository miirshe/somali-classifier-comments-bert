// components/Classify.tsx
'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import { Card, CardContent, Container } from '@mui/material'

import PagePosts from './components/pagePosts'
import ClassifySingleComment from './components/classifySingleComment'
import ClassifyMultipleComments from './components/classifyMultipleComments'

const Classify = () => {
  // States
  const [value, setValue] = useState<string>('1')
  const [selectedPostId, setSelectedPostId] = useState<string>('')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handlePostIdClick = (postId: string) => {
    setSelectedPostId(postId)
    setValue('3')
  }

  return (
    <Container maxWidth='lg' className='px-8 py-16'>
      <Card>
        <CardContent>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='icon tabs example'>
              <Tab value='1' label='Classify Single Comment' icon={<i className='tabler-message' />} />
              <Tab value='2' label='Page Posts' icon={<i className='tabler-messages' />} />
              <Tab value='3' label='Predictions' icon={<i className='tabler-eye' />} />
            </TabList>
            <TabPanel value='1'>
              <ClassifySingleComment />
            </TabPanel>
            <TabPanel value='2'>
              <PagePosts handlePostIdClick={handlePostIdClick} />
            </TabPanel>
            <TabPanel value='3'>
              <ClassifyMultipleComments postId={selectedPostId} />
            </TabPanel>
          </TabContext>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Classify
