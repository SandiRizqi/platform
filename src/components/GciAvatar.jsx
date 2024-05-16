import React from 'react';
import { Avatar, IconButton } from '@mui/material';


export default function GciAvatar({ alt, url, size, onClick }) {
    return (
        <>
            <IconButton size={size} onClick={onClick} disableFocusRipple>
                <Avatar
                    alt={alt}              
                    src={url}
                    sx={{
                        width: 32,
                        height: 32
                    }} />
            </IconButton>
        </>
    )
}
