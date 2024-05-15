import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


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
                <AppBar position='static' component='header' color={color? color: 'default'}>
                    <Toolbar variant='dense'>
                        <Typography sx={{ flexGrow: 1 }} component='div'>
                            <LeftButton />
                        </Typography>
                        {}
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    )
}