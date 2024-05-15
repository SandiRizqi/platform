import React from 'react';
import { Avatar, IconButton } from '@mui/material';
import img from '@/assets/images/avatar.png'

export default function GciAvatar({ url, size }) {
    return (
        <>
            <IconButton size={size} disableFocusRipple>
                <Avatar
                    alt='avatar'
                    
                    src={url ? url : img} />
            </IconButton>
        </>
    )
}
