import React, {useState, useEffect, useReducer} from 'react'
import PropTypes from "prop-types"
// import i18n from '../locales/locale'
import {useTranslation} from 'react-i18next'
import {useTheme} from "@mui/material/styles"
import {Grid, Paper, Fade, Zoom, Slide, Modal} from "@mui/material"
import {ClickAwayListener} from '@mui/base';

import {
  format,
  getDaysInMonth,
  getDay,
  sub,
  startOfMonth,
  parse,
  add,
  startOfDay,
  startOfWeek,
  getWeeksInMonth,
  isSameDay
} from 'date-fns'

// import WeekModeView from "./WeekModeView.jsx"
// import DayModeView from "./DayModeView.tsx"
// import TimeLineModeView from "./TimeLineModeView.jsx"
// import DateFnsLocaleContext from '../locales/dateFnsContext'
import {ar, de, enAU, enGB, es, fr, ja, ko, ru, zhCN} from "date-fns/locale"
import MonthModeView from "./MonthModeView";
import DayModeView from "./DayModeView";
import SchedulerToolbar from "./Toolbar";
import DayDetails from "./DayDetails";


/**
 * @name SchedulerBoost
 * @description
 * @param props
 * @constructor
 */
function SchedulerBoost(props) {
  const {
    events = [
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
      },
      {
        id: "event-22",
        label: "Medical consultation",
        groupLabel: "Dr Claire Brown",
        user: "Dr Claire Brown",
        color: "#099ce5",
        startHour: "09:00 AM",
        endHour: "10:00 AM",
        date: "2023-01-09",
        createdAt: new Date(),
        createdBy: "Kristina Mayer"
      },
      {
        id: "event-222",
        label: "Medical consultation",
        groupLabel: "Dr Claire Brown",
        user: "Dr Claire Brown",
        color: "#8eb0be",
        startHour: "09:00 AM",
        endHour: "10:00 AM",
        date: "2023-01-01",
        createdAt: new Date(),
        createdBy: "Kristina Mayer"
      },
      {
        id: "event-3",
        label: "Medical consultation",
        groupLabel: "Dr Menlendez Hary",
        user: "Dr Menlendez Hary",
        color: "#263686",
        startHour: "13 PM",
        endHour: "14 PM",
        date: "2022-05-10",
        createdAt: new Date(),
        createdBy: "Kristina Mayer"
      },
      {
        id: "event-4",
        label: "Consultation prénatale",
        groupLabel: "Dr Shaun Murphy",
        user: "Dr Shaun Murphy",
        color: "#f28f6a",
        startHour: "08:00 AM",
        endHour: "09:00 AM",
        date: "2022-05-11",
        createdAt: new Date(),
        createdBy: "Kristina Mayer"
      }
    ],
    locale,
    options = {defaultMode: 'month'},
    alertProps,
    onCellClick = (event, row, day, mode) => {
      const test = {event, row, day, mode}
      console.log(mode)
      handleDayDetails(test)
      handleOpen()
      // console.log(test.row)
      // console.log(event)
      // console.log(row)
    },
    legacyStyle,
    onTaskClick,
    toolbarProps,
    onEventsChange,
    onAlertCloseButtonClicked
  } = props
  const today = new Date()
  const theme = useTheme()
  const {t, i18n} = useTranslation(['common'])
  const weeks = [
    t('mon'), t('tue'), t('wed'),
    t('thu'), t('fri'), t('sat'),
    t('sun')
  ]
  const [open, setOpen] = React.useState(false);
  const [dayDetails, setDayDetails] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = useState({})
  const [searchResult, setSearchResult] = useState()
  const [selectedDay, setSelectedDay] = useState(today)
  const [alertState, setAlertState] = useState(alertProps)
  const [mode, setMode] = useState(options?.defaultMode || 'month')
  const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(today))
  const [startWeekOn, setStartWeekOn] = useState(options?.startWeekOn || 'mon')
  const [selectedDate, setSelectedDate] = useState(format(today, 'MMMM-yyyy'))
  const [weekDays, updateWeekDays] = useReducer((state) => {
    if (options?.startWeekOn?.toUpperCase() === 'SUN') {
      return [
        t('sun'), t('mon'), t('tue'),
        t('wed'), t('thu'), t('fri'),
        t('sat')
      ]
    }
    return weeks
  }, weeks)

  const isDayMode = mode === 'day'
  const isWeekMode = mode === 'week'
  const isMonthMode = mode === 'month'
  const isTimelineMode = mode === 'timeline'
  const TransitionMode = (
    options?.transitionMode === 'zoom' ? Zoom :
      options?.transitionMode === 'fade' ? Fade : Slide
  )

  let dateFnsLocale = enAU
  if (locale === 'fr') {
    dateFnsLocale = fr
  }
  if (locale === 'ko') {
    dateFnsLocale = ko
  }
  if (locale === 'de') {
    dateFnsLocale = de
  }


  /**
   * @name getMonthHeader
   * @description
   * @return {{headerClassName: string, headerAlign: string, headerName: string, field: string, flex: number, editable: boolean, id: string, sortable: boolean, align: string}[]}
   */
  const getMonthHeader = () => {
    //if (startWeekOn?.toUpperCase() === 'SUN') {
    //weekDays[0] = t('sun')
    //weekDays[1] = t('mon')
    //}
    return weekDays.map((day, i) => ({
      id: `row-day-header-${i + 1}`,
      flex: 1,
      sortable: false,
      editable: true,
      align: 'center',
      headerName: day,
      headerAlign: 'center',
      field: `rowday${i + 1}`,
      headerClassName: 'scheduler-theme--header'
    }))
  }
  const getMonthRows = () => {
    let rows = [], daysBefore = []
    let iteration = getWeeksInMonth(selectedDay)
    let startOnSunday = (
      startWeekOn?.toUpperCase() === 'SUN' &&
      t('sun').toUpperCase() === weekDays[0].toUpperCase()
    )
    let monthStartDate = startOfMonth(selectedDay)        // First day of month
    let monthStartDay = getDay(monthStartDate)            // Index of the day in week
    let dateDay = parseInt(format(monthStartDate, 'dd'))  // Month start day
    // Condition check helper
    const checkCondition = (v) => (
      startOnSunday ? v <= monthStartDay : v < monthStartDay
    )
    if (monthStartDay >= 1) {
      // Add days of precedent month
      // If Sunday is the first day of week, apply b <= monthStartDay
      // and days: (monthStartDay-b) + 1
      for (let i = 1; checkCondition(i); i++) {
        let subDate = sub(
          monthStartDate,
          {days: monthStartDay - i + (startOnSunday ? 1 : 0)}
        )
        let day = parseInt(format(subDate, 'dd'))
        let data = events.filter((event) => (
          isSameDay(
            subDate,
            parse(event?.date, 'yyyy-MM-dd', new Date())
          )
        ))
        daysBefore.push({
          id: `day_-${day}`,
          day: day,
          date: subDate,
          data: data
        })
      }
    } else if (!startOnSunday) {
      for (let i = 6; i > 0; i--) {
        let subDate = sub(monthStartDate, {days: i})
        let day = parseInt(format(subDate, 'dd'))
        let data = events.filter((event) => (
          isSameDay(subDate, parse(event?.date, 'yyyy-MM-dd', new Date()))
        ))
        daysBefore.push({
          id: `day_-${day}`,
          day: day,
          date: subDate,
          data: data
        })
      }
    }

    if (daysBefore.length > 0) {
      rows.push({id: 0, days: daysBefore})
    }

    // Add days and events data
    for (let i = 0; i < iteration; i++) {
      let obj = []

      for (
        let j = 0;
        // This condition ensure that days will not exceed 31
        // i === 0 ? 7 - daysBefore?.length means that we substract inserted days
        // in the first line to 7
        j < (i === 0 ? 7 - daysBefore.length : 7) && (dateDay <= daysInMonth);
        j++
      ) {
        let date = parse(
          `${dateDay}-${selectedDate}`,
          'dd-MMMM-yyyy',
          new Date()
        )
        let data = events.filter((event) => (
          isSameDay(
            date,
            parse(event?.date, 'yyyy-MM-dd', new Date())
          )
        ))
        obj.push({
          id: `day_-${dateDay}`,
          date,
          data,
          day: dateDay
        })
        dateDay++
      }

      if (i === 0 && daysBefore.length > 0) {
        rows[0].days = rows[0].days.concat(obj)
        continue
      }
      if (obj.length > 0) {
        rows.push({id: i, days: obj})
      }
    }

    // Check if last row is not fully filled
    let lastRow = rows[iteration - 1]
    let lastRowDaysdiff = 7 - lastRow?.days?.length
    let lastDaysData = []

    if (lastRowDaysdiff > 0) {
      let day = lastRow.days[lastRow?.days?.length - 1]
      let addDate = day.date
      for (let i = dateDay; i < (dateDay + lastRowDaysdiff); i++) {
        addDate = add(addDate, {days: 1})
        let d = format(addDate, 'dd')
        // eslint-disable-next-line
        let data = events.filter((event) => (
          isSameDay(
            addDate,
            parse(event?.date, 'yyyy-MM-dd', new Date())
          )
        ))
        lastDaysData.push({
          id: `day_-${d}`,
          date: addDate,
          day: d,
          data
        })
      }
      rows[iteration - 1].days = rows[iteration - 1].days.concat(lastDaysData)
    }

    return rows
  }

  const getDayHeader = () => ([{
    date: selectedDay,
    weekDay: format(selectedDay, 'iii', {locale: dateFnsLocale}),
    day: format(selectedDay, 'dd', {locale: dateFnsLocale}),
    month: format(selectedDay, 'MM', {locale: dateFnsLocale})
  }])

  const getDayRows = () => {
    const HOURS = 24
    let data = []
    let dayStartHour = startOfDay(selectedDay)

    for (let i = 0; i <= HOURS; i++) {
      let id = `line_${i}`
      let label = format(dayStartHour, 'HH:mm aaa')

      if (i > 0) {
        let obj = { id: id, label: label, days: [] }
        let columns = getDayHeader()
        let column = columns[0]
        let matchedEvents = events.filter((event) => {
          let eventDate = parse(event?.date, 'yyyy-MM-dd', new Date())
          return (
            isSameDay(column?.date, eventDate) &&
            event?.startHour?.toUpperCase() === label?.toUpperCase()
          )
        })
        obj.days.push({
          id: `column-_m-${column?.month}_d-${column?.day}_${id}`,
          date: column?.date,
          data: matchedEvents
        })

        data.push(obj)
        dayStartHour = add(dayStartHour, {minutes: 60})
      }
    }
    return data
  }

  const getTimeLineRows = () => (
    //events.filter((event) => {
    //let eventDate = parse(event?.date, 'yyyy-MM-dd', new Date())
    //return isSameDay(selectedDay, eventDate)
    //})
    events
  )

  /**
   * @name handleDateChange
   * @description
   * @param day
   * @param date
   * @return void
   */
  const handleDateChange = (day, date) => {
    setDaysInMonth(day)
    setSelectedDay(date)
    setSelectedDate(format(date, 'MMMM-yyyy'))
  }

  /**
   * @name handleModeChange
   * @description
   * @param newMode
   * @return void
   */
  const handleModeChange = (newMode) => {
    setMode(newMode)
  }

  const handleDayDetails = (details) => {
    setDayDetails(details)
  }

  /**
   * @name onSearchResult
   * @description
   * @param item
   * @return void
   */
  const onSearchResult = (item) => {
    setSearchResult(item)
  }

  const handleEventsChange = async (item) => {
    // todo later implement saving / updating here
    // onEventsChange(item)
    let eventIndex = events.findIndex(e => e.id === item?.id)
    if (eventIndex !== -1) {
      let oldObject = Object.assign({}, events[eventIndex])
      if (alertState?.showNotification && !alertState.open) {
        setAlertState({
          ...alertState,
          open: true,
          message: `
            ${item?.label} successfully moved from ${oldObject?.date}
            ${oldObject?.startHour} to ${item?.date} ${item?.startHour}
          `
        })
        setTimeout(() => {
          setAlertState({...alertState, open: false, message: ''})
        }, alertState.delay)
      }
    }
  }

  useEffect(() => {
    if (isMonthMode) {
      setState({
        ...state,
        columns: getMonthHeader(),
        rows: getMonthRows()
      })
    }
      // else if (isWeekMode) {
      //   setState({
      //     ...state,
      //     columns: getWeekHeader(),
      //     rows: getWeekRows()
      //   })
    // }
    else if (isDayMode) {
      setState({
        ...state,
        columns: getDayHeader(),
        rows: getDayRows()
      })
    } else if (isTimelineMode) {
      setState({
        ...state,
        columns: getDayHeader(),
        rows: getTimeLineRows()
      })
    } else {
      console.log("no match")
    }
    // eslint-disable-next-line
  }, [
    mode,
    weekDays,
    daysInMonth,
    selectedDay,
    selectedDate,
    dateFnsLocale,
    i18n.language,
    startWeekOn
  ])

  useEffect(() => {
    if (locale !== i18n.language) { //localStorage.getItem('i18nextLng')
      localStorage.setItem('i18nextLng', locale.toLowerCase())
      // i18n.changeLanguage(locale.toLowerCase())
      updateWeekDays()
    }
  }, [locale])

  useEffect(() => {
    if (options?.defaultMode !== mode) {
      setMode(options?.defaultMode)
    }
  }, [options?.defaultMode])

  useEffect(() => {
    if (options?.startWeekOn !== startWeekOn) {
      setStartWeekOn(options?.startWeekOn)
    }
    updateWeekDays()
  }, [options?.startWeekOn])


  return (
    <Paper variant="outlined" elevation={0} sx={{p: 0}}>
      <SchedulerToolbar
        today={today}
        events={events}
        locale={locale}
        switchMode={mode}
        alertProps={alertState}
        toolbarProps={toolbarProps}
        onDateChange={handleDateChange}
        onModeChange={handleModeChange}
        onSearchResult={onSearchResult}
        onAlertCloseButtonClicked={onAlertCloseButtonClicked}
      />
      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="start"
      >
        {open &&
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          ><DayDetails {...dayDetails}/>
          </Modal>
        }
        {isMonthMode &&
          <TransitionMode in>
            <Grid item xs={12}>
              <MonthModeView
                locale={locale}
                options={options}
                date={selectedDate}
                rows={state?.rows}
                columns={state?.columns}
                legacyStyle={legacyStyle}
                onTaskClick={onTaskClick}
                onCellClick={onCellClick}
                searchResult={searchResult}
                onDateChange={handleDateChange}
                onEventsChange={handleEventsChange}
              />
            </Grid>
          </TransitionMode>}
        {isDayMode &&
          <TransitionMode in>
            <Grid item xs={12}>
              <DayModeView
                locale={locale}
                events={events}
                options={options}
                date={selectedDate}
                rows={state?.rows}
                columns={state?.columns}
                onTaskClick={onTaskClick}
                onCellClick={onCellClick}
                searchResult={searchResult}
                onDateChange={handleDateChange}
                onEventsChange={handleEventsChange}
              />
            </Grid>
          </TransitionMode>}
      </Grid>
    </Paper>
  )
}

SchedulerBoost.propTypes = {
  events: PropTypes.array,
  options: PropTypes.object,
  alertProps: PropTypes.object,
  toolbarProps: PropTypes.object,
  onEventsChange: PropTypes.func,
  onCellClick: PropTypes.func,
  onTaskClick: PropTypes.func,
  onAlertCloseButtonClicked: PropTypes.func,
}

SchedulerBoost.defaultProps = {
  locale: 'en',
  legacyStyle: false
}

export default SchedulerBoost
