import React from 'react';
import styles from "./page.module.css";
import { CircularProgress } from '@mui/material';

export default function Loading() {
  return (
    <div className={styles.CenterContainer}><CircularProgress /></div>
  )
}
