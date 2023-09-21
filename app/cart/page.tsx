import { Box } from '@mui/material'
import React from 'react'
import CardProductCart from '../components/CardProductCart/page'

export default function page() {
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
        <Box
            sx={{
                backgroundColor:"#ccccc0",
                height:"70vh",
                width:"50vw"
            }}
        >
            <CardProductCart/>
        </Box>
        <Box sx={{
                backgroundColor:"lightgrey",
                height:"70vh",
                width:"30vw"
            }}>

        </Box>
    </div>
  )
}
