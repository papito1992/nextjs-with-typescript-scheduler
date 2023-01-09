import * as React from 'react';
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import SchedulerToolbar from "../src/components/ToolbarSeachBar"
import MonthModeView from "../src/components/MonthModeView.js"
import HomeBanner from "../src/components/HomeBanner";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import dayjs, {Dayjs} from 'dayjs';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {useReducer, useState} from "react";
import {format} from "util";
import SchedulerBoost from '../src/components/SchedulerBoost'
export default function Boost() {


  // @ts-ignore
  return (
    <Paper elevation={5} sx={{p: 0}}>
      <SchedulerBoost/>
    </Paper>
  );
}
// <Box sx={{flexGrow: 1, mt: 10}}>
//   <Grid
//     xs={12}
//     container
//     rowSpacing={10}
//     // justifyContent={"center"}
//     columnGap={10}>
//     <Grid xs={3}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker
//           label="Basic example"
//           value={value}
//           onChange={setValue}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </LocalizationProvider>
//     </Grid>
//     <Grid>
//       {dayjs().daysInMonth()}
//     </Grid>
//   </Grid>
// </Box>
