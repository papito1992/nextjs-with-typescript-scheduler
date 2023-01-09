import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'
import {add, format, getDaysInMonth, sub} from 'date-fns'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {
  Button,
  Grid, Hidden,
  IconButton,
  Menu,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography
} from "@mui/material"
import {useTheme} from "@mui/material/styles"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TodayIcon from '@mui/icons-material/Today'
import GridViewIcon from '@mui/icons-material/GridView'
import {enUS, lt} from 'date-fns/locale';
import {LocalizationProvider, StaticDatePicker} from '@mui/x-date-pickers'
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'

function SchedulerToolbar(props: any) {
  const {
    locale,
    events,
    today,
    switchMode,
    alertProps,
    toolbarProps,
    onModeChange,
    onDateChange,
    onSearchResult,
    onAlertCloseButtonClicked
  } = props

  const theme = useTheme()
  const { t } = useTranslation(['common'])
  const [mode, setMode] = useState(switchMode)
  const [searchResult, setSearchResult] = useState()
  const [anchorMenuEl, setAnchorMenuEl] = useState(null)
  const [anchorDateEl, setAnchorDateEl] = useState(null)
  const [selectedDate, setSelectedDate] = useState(today || new Date())
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(selectedDate))

  const openMenu = Boolean(anchorMenuEl)
  const openDateSelector = Boolean(anchorDateEl)
  const isDayMode = mode === 'day'
  const isMonthMode = mode === 'month'

  const commonIconButtonProps = {
    size: "medium",
    edge: "start",
    color: "inherit",
    "aria-label": "menu"
  }

  const handleCloseMenu = () => {
    setAnchorMenuEl(null)
  }

  const handleOpenDateSelector = (event: any) => {
    console.log(event.currentTarget)
    setAnchorDateEl(event.currentTarget)
  }

  const handleCloseDateSelector = () => {
    setAnchorDateEl(null)
  }

  const handleChangeDate = (method: any) => {
    if (typeof method !== 'function') {
      return
    }
    let options = { months: 1 }
    if (isDayMode) {
      options = { days: 1 }
    }
    let newDate = method(selectedDate, options)
    setDaysInMonth(getDaysInMonth(newDate))
    setSelectedDate(newDate)
  }

  const handleCloseAlert = (e: any) => {
    onAlertCloseButtonClicked && onAlertCloseButtonClicked(e)
  }

  useEffect(() => {
    if (mode && onModeChange) { onModeChange(mode) }
    // eslint-disable-next-line
  }, [mode])

  useEffect(() => {
    onDateChange && onDateChange(daysInMonth, selectedDate)
    // eslint-disable-next-line
  }, [daysInMonth, selectedDate])

  useEffect(() => {
    onSearchResult && onSearchResult(searchResult)
    // eslint-disable-next-line
  }, [searchResult])

  useEffect(() => {
    if (switchMode !== mode) {
      console.log(switchMode)
      setMode(switchMode)
    }
  }, [switchMode])
  return (
    <Toolbar
      variant="dense"
      sx={{
        px: '0px !important',
        display: 'block',
        borderBottom: `1px ${theme.palette.divider} solid`,
      }}
    >
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="flex-end"
      >
        <Grid item xs={1} sm md>
          {toolbarProps.showDatePicker &&
            <Typography component="div" sx={{display: 'flex'}}>
              <Hidden smDown>
                <IconButton
                  sx={{  ml: 0, mr: -.1 }}
                  {...commonIconButtonProps}
                  onClick={() => handleChangeDate(sub)}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <Button
                  size="small"
                  id="basic-button"
                  aria-haspopup="true"
                  //endIcon={<TodayIcon />}
                  aria-controls="basic-menu"
                  onClick={handleOpenDateSelector}
                  sx={{ color: 'text.primary'}}
                  aria-expanded={openDateSelector ? 'true' : undefined}
                >
                  {format(
                    selectedDate,
                    isMonthMode ? 'MMMM-yyyy' : 'PPP',
                    { locale: lt }
                  )}
                </Button>
                <IconButton
                  sx={{ ml: .2 }}
                  {...commonIconButtonProps}
                  onClick={() => handleChangeDate(add)}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Hidden>
              <Hidden smUp>
                <IconButton
                  sx={{ml: 0, "aria-label":"menu"}}
                  {...commonIconButtonProps}
                  size="small"
                  onClick={handleOpenDateSelector}
                >
                  <TodayIcon />
                </IconButton>
              </Hidden>
              <Menu
                id="date-menu"
                anchorEl={anchorDateEl}
                open={openDateSelector}
                onClose={handleCloseDateSelector}
                MenuListProps={{'aria-labelledby': 'basic-button'}}
              >
                <LocalizationProvider
                  locale={lt}
                  dateAdapter={AdapterDateFns}
                >
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={selectedDate}
                    onChange={(newValue) => {
                      setDaysInMonth(getDaysInMonth(newValue))
                      setSelectedDate(newValue)
                      handleCloseDateSelector()
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Menu>
            </Typography>}
        </Grid>
        <Grid item xs sm md sx={{textAlign: 'right'}}>
          <Stack
            direction="row"
            sx={{
              pr: .5,
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
            <Hidden mdUp>
              <IconButton
                sx={{mr: 0, "aria-label":"menu"}}
                {...commonIconButtonProps}
                size="small"
                onClick={handleOpenDateSelector}
              >
                <GridViewIcon />
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              {toolbarProps?.showSwitchModeButtons &&
                <ToggleButtonGroup
                  exclusive
                  value={mode}
                  size="small"
                  color="primary"
                  aria-label="text button group"
                  sx={{ mt: .2, mr: 1.3, display: 'contents' }}
                  onChange={(e, newMode) => {
                    setMode(newMode)
                  }}
                >
                  {[
                    { label: t('month'), value: 'month' },
                    { label: t('day'), value: 'day' },
                  ].map(tb => (
                    <ToggleButton sx={{ mt: .5 }} key={tb.value} value={tb.value}>
                      {tb.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>}
            </Hidden>
          </Stack>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

SchedulerToolbar.propTypes = {
  today: PropTypes.object.isRequired,
  events: PropTypes.array.isRequired,
  switchMode: PropTypes.string.isRequired,
  alertProps: PropTypes.object,
  toolbarProps: PropTypes.object,
  onDateChange: PropTypes.func.isRequired,
  onModeChange: PropTypes.func.isRequired,
  onSearchResult: PropTypes.func.isRequired,
  onAlertCloseButtonClicked: PropTypes.func.isRequired,
}

SchedulerToolbar.defaultProps = {
  alertProps: {
    open: false,
    message: '',
    color: 'info',
    severity: 'info',
    showActionButton: true,
  },
  toolbarProps: {
    showSearchBar: true,
    showSwitchModeButtons: true,
    showDatePicker: true,
    showOptions: false
  }
}

export default SchedulerToolbar
