import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'

export const Sidebar = ({ drawerWidth }) => {

    // Poner el nombre del usuario
    const {displayName, photoURL} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.journal);

    return (
        <Box
            component={'aside'}
            sx={{
                width: { sm: drawerWidth },
                flexShrink: { sm: 0 },
            }}
        >

            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >

                <Toolbar>
                    {/* <Grid container direction='row' alignItems='center'>
                        <img src={photoURL} alt="profile" />
                    </Grid> */}
                    <Typography variant="h6" component='div' noWrap>{displayName}</Typography>

                </Toolbar>
                <Divider />

                <List>
                    {/* List items */}
                    {
                        notes.map((note) => (
                            <SideBarItem key={note.id} {...note} />
                        ))
                    }
                </List>

            </Drawer>
        </Box>
    )
}
