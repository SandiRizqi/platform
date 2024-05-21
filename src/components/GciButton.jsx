import React from 'react';
import { Button, CircularProgress } from '@mui/material';

export default function GciButton({children, variant, disabled, color, isLoading, onClick}) {
  if (isLoading) {
    return (
      <Button variant={variant}  color={color ? color: 'primary'} sx={{borderRadius: '10px'}} startIcon={<CircularProgress size={16}/>} disabled >Loading... .</Button>
    )
  }
  return (
    <Button variant={variant} disabled={disabled} color={color ? color: 'primary'} sx={{borderRadius: '10px'}} onClick={onClick}>{children}</Button>
  )
}
