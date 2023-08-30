import { Box } from '@mui/material'
import React from 'react'
import Category from '../components/category/page'
import Carousel from '../components/carousel/Carousel'
import Cards from '../components/cards'

export default function Home() {
  return (
    <Box sx={{width:"100%"}}>
      <Category/>
      <Carousel/>
      <Cards/>
      <Cards/>
      
    </Box>
  )
}
