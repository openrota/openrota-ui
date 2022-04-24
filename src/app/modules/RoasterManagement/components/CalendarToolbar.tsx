import React from 'react';
import moment from 'moment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const CalendarToolbar = ({ visibleTimeStart, visibleTimeEnd, setVisibleTimeStart, setVisibleTimeEnd }) => {
    const [unit, setUnit] = React.useState<string>('day');

    const onPrevClick = (): void => {
        if (unit === 'day') {
            const zoom = visibleTimeEnd - visibleTimeStart;
            setVisibleTimeStart(visibleTimeStart - zoom);
            setVisibleTimeEnd(visibleTimeEnd - zoom);
        }
        if (unit === 'week') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(-1, 'week')
                .startOf('week')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(-1, 'week')
                .endOf('week')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }

        if (unit === 'month') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(-1, 'month')
                .startOf('month')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(-1, 'month')
                .endOf('month')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'year') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(-1, 'year')
                .startOf('year')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(-1, 'year')
                .endOf('year')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
    }

    const onNextClick = (): void => {
        if (unit === 'day') {
            const zoom = visibleTimeEnd - visibleTimeStart;
            setVisibleTimeStart(visibleTimeStart + zoom);
            setVisibleTimeEnd(visibleTimeEnd + zoom);
        }
        if (unit === 'week') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(1, 'week')
                .startOf('week')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(1, 'week')
                .endOf('week')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }

        if (unit === 'month') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(1, 'month')
                .startOf('month')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(1, 'month')
                .endOf('month')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'year') {
            const newVisibleTimeStart = moment(visibleTimeStart)
                .add(1, 'year')
                .startOf('year')
                .valueOf();

            const newVisibleTimeEnd = moment(visibleTimeStart)
                .add(1, 'year')
                .endOf('year')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
    }

    const handleTimeHeaderChange = (unit): void => {
        setUnit(unit)

        if (unit === 'day') {
            const newVisibleTimeStart = moment()
                .startOf('day')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('day')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'week') {
            const newVisibleTimeStart = moment()
                .startOf('week')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('week')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }

        if (unit === 'month') {
            const newVisibleTimeStart = moment()
                .startOf('month')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('month')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'year') {
            const newVisibleTimeStart = moment()
                .startOf('year')
                .valueOf();

            const newVisibleTimeEnd = moment()
                .endOf('year')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
    };

    const handleTodayClick = (): void => {
        setUnit('day');
        const newVisibleTimeStart = moment()
            .startOf('date')
            .valueOf();

        const newVisibleTimeEnd = moment()
            .endOf('date')
            .valueOf();

        setVisibleTimeStart(newVisibleTimeStart);
        setVisibleTimeEnd(newVisibleTimeEnd);
    };

    const handleDateChange = (str, date): void => {

        if (unit === 'day') {
            const newVisibleTimeStart = moment(date)
                .startOf('day')
                .valueOf();

            const newVisibleTimeEnd = moment(date)
                .endOf('day')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'week') {
            const newVisibleTimeStart = moment(date)
                .startOf('week')
                .valueOf();

            const newVisibleTimeEnd = moment(date)
                .endOf('week')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }

        if (unit === 'month') {
            const newVisibleTimeStart = moment(date)
                .startOf('month')
                .valueOf();

            const newVisibleTimeEnd = moment(date)
                .endOf('month')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
        if (unit === 'year') {
            const newVisibleTimeStart = moment(date)
                .startOf('year')
                .valueOf();

            const newVisibleTimeEnd = moment(date)
                .endOf('year')
                .valueOf();

            setVisibleTimeStart(newVisibleTimeStart);
            setVisibleTimeEnd(newVisibleTimeEnd);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <div style={{ textAlign: 'center' }}>
                        <IconButton aria-label="Action" onClick={onPrevClick}>
                            <NavigateBeforeIcon />
                        </IconButton>
                        <IconButton aria-label="Action" onClick={onNextClick}>
                            <NavigateNextIcon />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div style={{ position: 'relative', bottom: '10px', display: 'inline-block' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date"
                                inputFormat="YYY-MM-dd"
                                value={moment().format("YYYY-MM-DD").toString()}
                                onChange={(str, date) => handleDateChange(str, date)}
                                renderInput={(params) => <TextField {...params} />}

                            />
                        </LocalizationProvider>
                    </div>

                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={5} >
                    <Button onClick={() => handleTodayClick()}>
                        {"Today"}
                    </Button>
                </Grid>
                <Grid item xs={3} alignItems="flex-end">
                    <ButtonGroup variant="text" aria-label="text button group" style={{ float: 'right' }}>
                        <Button id="daily" onClick={() => handleTimeHeaderChange("day")} >
                            {"Daily"}
                        </Button>
                        <Button onClick={() => handleTimeHeaderChange("week")}>
                            {"Weekly"}
                        </Button>
                        <Button onClick={() => handleTimeHeaderChange("month")}>
                            {"Monthly"}
                        </Button>
                        <Button onClick={() => handleTimeHeaderChange("year")}>
                            {"Yearly"}
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid></Box>

    )
}

export default CalendarToolbar;