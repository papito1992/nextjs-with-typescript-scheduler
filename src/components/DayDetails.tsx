import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {format, getDayOfYear} from 'date-fns'
import AppBar from "@mui/material/AppBar";
import {Tab, Tabs} from "@mui/material";
import {SyntheticEvent} from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {useForm, SubmitHandler} from 'react-hook-form';
import {literal, object, string, TypeOf} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useState} from 'react';
import {LoadingButton} from '@mui/lab';
import Checkbox from '@mui/material/Checkbox';
import {
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
} from '@mui/material';

const events = [
  {
    id: "event-1",
    label: "Medical consultation",
    groupLabel: "Dr Shaun Murphy",
    user: "Dr Shaun Murphy",
    color: "#f28f6a",
    startHour: "04:00 AM",
    endHour: "05:00 AM",
    date: "2023-01-01",
    createdAt: new Date(),
    createdBy: "Kristina Mayer"
  }
]

const registerSchema = object({
  name: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 100 characters'),
  amount: string().nonempty('Amount is required').max(50),
  // password: string()
  //   .nonempty('Password is required')
  //   .min(8, 'Password must be more than 8 characters')
  //   .max(32, 'Password must be less than 32 characters'),
  // passwordConfirm: string().nonempty('Please confirm your password'),
  // terms: literal(true, {
  //   invalid_type_error: 'Accept Terms is required',
  // }),
});
//   .refine((data) => data.password === data.passwordConfirm, {
//   path: ['passwordConfirm'],
//   message: 'Passwords do not match',
// });
type RegisterInput = TypeOf<typeof registerSchema>;
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  // p: 4,
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {


  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    // 'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DayDetails(props) {
  const {
    register,
    formState: {errors, isSubmitSuccessful},
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const [loading, setLoading] = useState(false);
  const {event, row, day, mode} = props
  console.log(row.label)

  const formattedDate = format(day?.date, 'yyyy-MM-dd')
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log(values);
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Grid container xs={12} display="flex" justifyContent="center" alignItems="center">
      <Grid lg={8} md={10} xs={12} sx={{bgcolor: 'background.paper', mt: {xs: 0, md: 10}}}>
        <Box sx={{borderBottom: 2, borderColor: 'divider'}}>
          <Grid container alignItems="center" pl={2}>
            <Grid xs={3} container justifyContent="flex-start" alignItems="center">
              {row.label}
            </Grid>
            <Grid xs={"auto"}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                <Tab label="Food & Body" {...a11yProps(0)} />
                <Tab label="Mind & Soul" {...a11yProps(1)} />
                <Tab label="Activities" {...a11yProps(2)} />
                <Tab label="Personal Info" {...a11yProps(3)} />
              </Tabs>
            </Grid>
          </Grid>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{maxWidth: '30rem'}}>
            <Typography variant='h4' component='h1' sx={{mb: '2rem'}}>
              Meal at {row.label}
            </Typography>
            <Box
              component='form'
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <TextField
                sx={{mb: 2}}
                label='Name'
                fullWidth
                required
                error={!!errors['name']}
                helperText={errors['name'] ? errors['name'].message : ''}
                {...register('name')}
              />
              {/*<TextField*/}
              {/*  sx={{ mb: 2 }}*/}
              {/*  label='Amount approx'*/}
              {/*  fullWidth*/}
              {/*  required*/}
              {/*  type='email'*/}
              {/*  error={!!errors['email']}*/}
              {/*  helperText={errors['email'] ? errors['email'].message : ''}*/}
              {/*  {...register('email')}*/}
              {/*/>*/}
              <TextField
                sx={{mb: 2}}
                label='Amount approx'
                fullWidth
                required
                helperText={errors['amount'] ? errors['amount'].message : ''}
                {...register('amount')}
              />
              <LoadingButton
                variant='contained'
                fullWidth
                type='submit'
                loading={loading}
                sx={{py: '0.8rem', mt: '1rem'}}
              >
                Save
              </LoadingButton>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Three
        </TabPanel>
      </Grid>
    </Grid>
  )
}
