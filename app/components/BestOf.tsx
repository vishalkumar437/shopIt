import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActionArea,
    CardMedia,
    Button,
  } from "@mui/material";
import Link from "next/link";
  
  export default function BestOf() {
    const categories = [
      {
        title: "Laptop",
        image: "https://rukminim2.flixcart.com/image/312/312/kzogn0w0/computer/j/u/m/14a-ca0504tu-thin-and-light-laptop-hp-original-imagbmt6dsjhwwhz.jpeg?q=70",
        startingPrice: "₹12,999",
      },
      {
        title: "Trimmer",
        image: "https://rukminim2.flixcart.com/image/200/200/kactpjk0/shaver/m/6/z/philips-s1121-45-s1121-45-original-imafry2qgxcwnm9r.jpeg?q=70",
        startingPrice: "₹299",
      },
      {
        title: "Mobile",
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/r/n/-original-imagmgy5jk8ytxnw.jpeg?q=70",
        startingPrice: "₹999",
        link:"/products",
      },
      {
        title: "Monitors",
        image: "https://rukminim2.flixcart.com/image/200/200/xif0q/monitor/k/l/b/-original-imagsgh8zzgbu2tf.jpeg?q=70",
        startingPrice: "₹9,999",
      },
      {
        title: "Printers",
        image: "https://rukminim2.flixcart.com/image/200/200/printer/j/j/y/hp-laserjet-m1005-multifunction-original-imadxhzpeb9qbrfg.jpeg?q=70",
        startingPrice: "₹9,999",
      },
      {
        title: "Shavers",
        image: "https://rukminim2.flixcart.com/image/200/200/kactpjk0/shaver/m/6/z/philips-s1121-45-s1121-45-original-imafry2qgxcwnm9r.jpeg?q=70",
        startingPrice: "₹999",
      },
      {
        title: "Cameras",
        image: "https://rukminim2.flixcart.com/image/200/200/kokdci80/dslr-camera/v/e/x/z-24-200mm-z5-nikon-original-imag2zuekuxgxsgg.jpeg?q=70",
        startingPrice: "₹19,999",
      },
      
    ];
  
    const handleRouting = ()=>{
      console.log("click")
    }
    return (
      <Box
        sx={{
          display: "flex",
          overflowX: "scroll", 
          gap: "10px", 
          marginTop:"5px",
          scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        }}
      >
        <Card sx={{ backgroundColor: "cyan", textAlign: "center", minWidth: "200px" }}>
          <CardMedia
            component="img"
            height="140"
            image="/path-to-electronics-image.jpg"
            alt="Electronics"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Best Of Electronics
            </Typography>
            <Button variant="contained">View All</Button>
          </CardContent>
        </Card>
        {categories.map((category, index) => (
          <Link href="/products">
          <Card
            key={index}
            sx={{ flex: "0 0 auto", minWidth: "200px", textAlign: "center" }}
          >
            <CardActionArea sx={{height:"100%"}} >
              <CardMedia
                component="img"
                height="160"
                style={{ objectFit: "contain", width: "100%" }}
                image={category.image}
                alt={category.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {category.title}
                </Typography>
                <Typography component="div">From {category.startingPrice} /-</Typography>
                <Typography>Browse</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>
          
        ))}
      </Box>
    );
  }
  