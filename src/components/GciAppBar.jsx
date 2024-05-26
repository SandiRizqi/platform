'use client'
import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme, Avatar} from '@mui/material';
import GciAccountMenu from './GciAccountMenu';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import logo from '@/assets/logo/icon-192x192.png';


const LogoButton = (
    <IconButton  disableRipple>
        <Avatar src={logo.src} />
    </IconButton>
)

export default function GciAppBar({color }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <Box sx={{ flexGrow: 1}}>
                <AppBar position='fixed' component='header' color={color? color: 'default'} >
                    <Toolbar variant='dense'>
                        {matches && LogoButton }
                        <Typography sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', display:'flex' }} component='div'>
                            {matches && (
                                <>
                                
                                </>
                            )}
                        </Typography>
                        <div>
                           
                                <IconButton size="large" edge="start" color="inherit" arial-label="notification" disableRipple >
                                    <NotificationsOutlinedIcon size='large' color='secondary' />
                                </IconButton>
                           
                            <GciAccountMenu />
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}
