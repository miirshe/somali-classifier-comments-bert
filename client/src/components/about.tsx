import { Container, Stack, Typography } from '@mui/material'
import React from 'react'

const About = () => {
    return (
        <Container className="space-y-4 mt-40">
            <div className='flex flex-row justify-center items-center gap-3'>
                <Stack spacing={4}>
                    <Typography className="text-center leading-10 tracking-widest" variant="h4">About Us</Typography>
                    <Typography className='text-center leading-10 tracking-widest'>Our platform helps users easily classify and analyze comments on social media based on the Somali language. We aim to provide accurate and real-time processing to ensure a safer and more positive online environment.
                    </Typography>
                </Stack>
            </div>

        </Container>
    )
}

export default About
