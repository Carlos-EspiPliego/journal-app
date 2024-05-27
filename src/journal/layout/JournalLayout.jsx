import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { Navbar, Sidebar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
            {/* Navbar */}
            <Navbar drawerWidth={drawerWidth} />
            {/* sidebar */}
            <Sidebar drawerWidth={drawerWidth} />

            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />

                {children}

            </Box>

        </Box>
    )
}
