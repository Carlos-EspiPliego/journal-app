import { Grid, Typography } from '@mui/material'
import React from 'react'

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid item className='box-shadow' xs={3}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    width: { md: 450 },
                }} >
                <Typography variant='h5' align='center' sx={{ padding: 2 }}>{ title }</Typography>
                
                {children}

            </Grid>
        </Grid>
    )
}
