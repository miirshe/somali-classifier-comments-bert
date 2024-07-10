import Image from 'next/image'
import React from 'react'
import { ModeToggle } from './mode-toggle'
import { Avatar, Container, Grid, Stack, Typography } from '@mui/material'

const Navbar = () => {
    return (
        <Container>
            <div className='flex flex-row justify-between items-center gap-5 mt-3'>
                <div className='flex items-center gap-3'>
                    {/* <Avatar alt="logo" src="/images/cover.jpg" /> */}
                    <Typography className='leading-10 tracking-widest' variant='h6'><strong>Somali Classifier</strong></Typography>
                </div>
                <ModeToggle/>
            </div>
        </Container>
    )
}

export default Navbar
