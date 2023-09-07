"use client"

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Button } from '@mui/joy';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Sale Buy Now',
    imgPath:
      'https://t3.ftcdn.net/jpg/00/74/80/30/360_F_74803077_tAM730fGIeVYoFTDLTgt8AIMXZCqh1rQ.jpg',
  },
  {
    label: 'Limited Offer',
    imgPath:
      'https://t4.ftcdn.net/jpg/04/62/25/91/240_F_462259136_ieLHu3BL11q66HMrKFTtzleU8QPPmEOT.jpg',
  },
  {
    label: 'Buy Now',
    imgPath:
      'https://t3.ftcdn.net/jpg/02/34/57/98/240_F_234579858_78QgXcVOI3b4DPCBuGuudFzIGygA1aWz.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const maxSteps = images.length;
  const handleNext = () => {
    
    setActiveStep((prevActiveStep:any) =>{
        if(prevActiveStep<maxSteps-1)
        return prevActiveStep + 1;
        else 
        return 0;
    } );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep:any) =>{
        if(prevActiveStep==0)
        return maxSteps-1;
        else 
        return prevActiveStep-1;
    } );
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        containerStyle={{ maxWidth: '100%' }}
      >
        {images.map((step, index) => (
          <Box key={step.label} sx={{ width: '100%', position: 'relative' }}>
            <Box
              component="img"
              sx={{
                height: 255,
                width: '100%',
                overflow: 'hidden',
              }}
              src={step.imgPath}
              alt={step.label}
            />
          </Box>
        ))}
      </AutoPlaySwipeableViews>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'absolute', bottom: "50%" }}>
        <Button sx={{backgroundColor:"white", color:"#ccc"}} onClick={handleBack}>
          {"<"}
        </Button>
        <Button sx={{backgroundColor:"white", color:"#ccc"}} onClick={handleNext}>
          {">"}
        </Button>
      </Box>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
