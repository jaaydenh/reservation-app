'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { blue } from '@mui/material/colors';
import dayjs, { Dayjs } from 'dayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Box,
} from '@mui/material';

import ConfirmDialog from '@/app/confirm-dialog';
import { mockFetchProviderByIdWithAbort } from '@/api/mock-fetch';
import { Provider, TimeSlot } from '@/types/types';

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Box
      sx={{
        width: 38,
        height: 36,
        borderRadius: 50,
        bgcolor: isSelected ? blue[50] : 'transparent',
      }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        disabled={!isSelected}
      />
    </Box>
  );
}

function BookReservation({ providerId }: { providerId: number }) {
  const requestAbortController = useRef<AbortController | null>(null);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [currentDay, setCurrentDay] = useState<Dayjs>(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleConfirmClose = () => {
    setOpen(false);
  };

  const fetchHighlightedDays = useCallback(
    async (date: Dayjs) => {
      const controller = new AbortController();

      try {
        const providerData = (await mockFetchProviderByIdWithAbort(providerId, {
          signal: controller.signal,
        })) as unknown as Provider;

        // ideally the response from the server would only return
        // timeslots 24 hours in advance
        const daysToHighlight = providerData?.days
          ?.filter((day) => dayjs(day.date).isAfter(dayjs()))
          .reduce((acc, curr) => {
            if (
              curr.status === 'available' &&
              dayjs(curr.date).month() === dayjs(date).month()
            ) {
              acc.push(dayjs(curr.date).date());
            }
            return acc;
          }, [] as number[]);

        setProvider(providerData);
        setHighlightedDays(daysToHighlight || []);
        setIsLoading(false);
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }

      requestAbortController.current = controller;
    },
    [providerId]
  );

  useEffect(() => {
    fetchHighlightedDays(currentDay);

    return () => requestAbortController.current?.abort();
  }, [currentDay, fetchHighlightedDays]);

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDayChange = (date: Dayjs) => {
    const day = provider?.days.find((day) =>
      dayjs(day.date).isSame(date, 'day')
    );
    setCurrentDay(date);

    if (day) {
      // ideally the response from the server would only return
      // timeslots 24 hours in advance
      setTimeSlots(
        (day.slots.filter((slot) =>
          dayjs(slot.start_time).isAfter(dayjs().add(1, 'day'))
        ) as TimeSlot[]) || []
      );
    }
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1">
          15 Minute Appointment
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <DateCalendar
            value={currentDay}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            onChange={handleDayChange}
            disablePast={true}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
          />
          {timeSlots.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 2,
              }}
            >
              <Typography variant="subtitle2" component="h2">
                {currentDay.format('dddd, MMMM D')}
              </Typography>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                }}
              >
                {timeSlots.map((slot) => (
                  <ListItem alignItems="flex-start" key={slot.start_time}>
                    <ListItemButton
                      onClick={() => handleSelectTime(slot.start_time)}
                      sx={{
                        px: 9,
                        border: 1,
                        borderColor: blue[700],
                        borderRadius: 1,
                      }}
                    >
                      <ListItemText
                        sx={{ color: blue[700] }}
                        primary={dayjs(slot.start_time).format('h:mm A')}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </Paper>
      <ConfirmDialog
        open={open}
        time={dayjs(selectedTime).format('dddd, MMMM D h:mm A')}
        handleClose={handleConfirmClose}
      />
    </LocalizationProvider>
  );
}

export default BookReservation;
