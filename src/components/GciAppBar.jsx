import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import GciAccountMenu from './GciAccountMenu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';


function LeftButton() {
    return (
        <>
            <IconButton size="large" edge="start" color="inherit" arial-label="menu">
                <MenuIcon />
            </IconButton>
        </>
    );
};



export default function GciAppBar({color }) {
    return (
        <>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position='fixed' component='header' color={color? color: 'default'}>
                    <Toolbar variant='dense'>
                        <Typography sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', display:'flex' }} component='div'>
                            <>
                            </>
                        </Typography>
                        <div>
                            <IconButton size="large" edge="start" color="inherit" arial-label="notification">
                                <NotificationsOutlinedIcon size='large'/>
                            </IconButton>
                            <GciAccountMenu />
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}
