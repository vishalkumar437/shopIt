import { Box } from '@mui/material'
import React from 'react'
import Category from '../components/category/page'
import Carousel from '../components/carousel/Carousel'
import BestOf from '../components/BestOf' 

export default function Landing() {
  return (
    <Box sx={{width:"100%"}}>
      <Category/>
      <Carousel/>
      <BestOf/>
      <BestOf/>
    </Box>
  )
}
