"use client"
import React from 'react'
import { Container, Divider, Grid, Stack, Typography } from '@mui/material'
import { Icon } from "@iconify/react"
const Footer = () => {
    return (
        <Container className='mt-32 space-y-4 mb-16'>
            <div className='w-full'>
                <Divider />
            </div>
            <div className='flex flex-col md:flex-row justify-between items-center gap-5 '>
                <div className='w-fit space-y-4'>
                    <Typography className='leading-10 tracking-widest' variant='h6'><strong>Somali Classifier</strong></Typography>
                    <div className='flex justify-center md:justify-start items-center gap-4 '>
                        <Icon icon="ic:outline-facebook" width="25" height="25" />
                        <Icon icon="mdi:github" width="25" height="25" />
                        <Icon icon="mingcute:linkedin-fill" width="25" height="25" />
                    </div>
                </div>
                <div className='w-fit space-y-4 text-center md:text-start '>
                    <Stack spacing={2}>
                        <Typography variant='body2'>
                            <span>made with </span>
                            <strong>JUST CA20</strong>
                        </Typography>
                        <Typography variant='body2'>
                            © 2024 Somali Classifier. All rights reserved.
                        </Typography>

                    </Stack>
                </div>
            </div>
        </Container>
    )
}

export default Footer