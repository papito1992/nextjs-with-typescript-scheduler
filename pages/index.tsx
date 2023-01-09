import * as React from 'react';
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";

import HomeBanner from "../src/components/HomeBanner";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  //         src="https://steamuserimages-a.akamaihd.net/ugc/956351885702572670/045E12A2A263EE02299844B1B7721A67EB9D973D/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
  return (
    <Box sx={{flexGrow: 1}}>
      <HomeBanner/>
      <Grid container rowSpacing={10} justifyContent={"center"} columnGap={10}>
        <Grid xs={12}>
          <Container>
            <Card sx={{
              // pt: 5,
              // mt: {xsDown},
              position: "relative",
              bottom: {md: "50px", xs:"30px"},
              height: "50vh",
            }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="500"
                image="https://picsum.photos/600/300?random=1"
              />
              <CardContent sx={{textAlign: "center"}}>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </Card>
          </Container>
        </Grid>
        {/*<Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }}>*/}

        <Grid xs={10}>
          <Item>1</Item>
        </Grid>
        <Grid xs={4}>
          <Item>2</Item>
        </Grid>
        <Grid xs={4}>
          <Item>3</Item>
        </Grid>
        <Grid xs={6} sx={{mb: 5}}>
          <Item>4</Item>
        </Grid>
        {/*</Grid>*/}
      </Grid>
    </Box>
    // <>
    //
    //   <Grid container xs={12}>
    //     <Grid xs={12}>
    //       test
    //     </Grid>
    //     <Grid xs={12}>
    //       test
    //     </Grid>
    //     <Grid xs={12} width="100%" position="relative">
    //       <Image
    //         alt="Mountains"
    //         src="https://source.unsplash.com/random"
    //         layout={"fill"}
    //         style={{
    //           objectFit: "contain",
    //           width:"100%",
    //           // position: "relative"
    //         }}
    //
    //       />
    //     </Grid>
    //     {/*<Image*/}
    //     {/*  alt="Mountains"*/}
    //     {/*  src="https://source.unsplash.com/random"*/}
    //     {/*  // placeholder="blur"*/}
    //     {/*  width='100%'*/}
    //     {/*  height={100}*/}
    //     {/*  objectFit='contain'*/}
    //     {/*  // alt='Brand logo'*/}
    //
    //     {/*  // sizes="100vw"*/}
    //     {/*  // style={{*/}
    //     {/*  //   objectFit: 'contain',*/}
    //     {/*  //   maxHeight: 200,*/}
    //     {/*  //*/}
    //     {/*  // }}*/}
    //     {/*/>*/}
    //   </Grid>
    //   {/*<Grid container md={12}>*/}
    //   {/*  <Grid item xs={12} sx={{bgcolor: "wheat"}}>*/}
    //   {/*    dwedwed*/}
    //   {/*  </Grid>*/}
    //
    //   {/*</Grid>*/}
    //
    // </>
  );
}
