"use client"

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Button } from '@mui/joy';
import { useEffect } from 'react';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


function SwipeableTextMobileStepper(props:any) {
  const [h,setH] = React.useState(0);
  const [images,setImages] = React.useState([{label:'',imgPath:''}]);
  useEffect(()=>{
    setH(props.height);
    setImages(props.img);
  },[]);
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
      >
        {images.map((step) => (
          <Box key={step.label} sx={{ position: 'relative' }}>
            <Box
              component="img"
              sx={{
                height: h,
                width: '100%',
                // objectFit:'fill',
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
