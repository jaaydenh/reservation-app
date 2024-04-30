'use client';

import { useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TimePicker from './time-picker';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { SelectChangeEvent } from '@mui/material/Select';
import { Rule } from '@/types/types';

function DayTimeRanges({
  day,
  rules,
  setRules,
}: {
  day: string;
  rules: Rule[];
  setRules: (rules: Rule[]) => void;
}) {
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const rule = rules.find((rule) => rule.day === day);
  const { intervals } = rule || { intervals: [] };

  const handleDelete = (index: number) => {
    if (intervals.length === 1) {
      setIsAvailable(false);
    } else {
      if (index > 0) {
        const nextRules = [...rules];
        const nextRule = nextRules.find((rule) => rule.day === day);
        const newIntervals = [
          ...intervals.filter((interval, i) => i !== index - 1),
        ];
        if (nextRule) {
          nextRule.intervals = newIntervals;
        }
        setRules(nextRules);
      }
    }
  };

  const handleCheck = () => {
    setIsAvailable((prev) => !prev);
  };

  const handleAdd = () => {
    if (!isAvailable) {
      setIsAvailable(true);
    } else {
      const lastInterval = intervals[intervals.length - 1];

      const nextRules = [...rules];
      const nextRule = nextRules.find((rule) => rule.day === day);
      const newIntervals = [
        ...intervals,
        {
          from: lastInterval.to,
          to: lastInterval.to,
        },
      ];
      if (nextRule) {
        nextRule.intervals = newIntervals;
      }
      setRules(nextRules);
    }
  };

  const handleFromChange = (e: SelectChangeEvent, index: number) => {
    const nextRules = [...rules];
    const nextRule = [...rules].find((rule) => rule.day === day);
    const newIntervals = [...intervals];
    newIntervals[index].from = e.target.value;
    if (nextRule) {
      nextRule.intervals = newIntervals;
    }
    setRules(nextRules);
  };

  const handleToChange = (e: SelectChangeEvent, index: number) => {
    const nextRules = [...rules];
    const nextRule = nextRules.find((rule) => rule.day === day);
    const newIntervals = [...intervals];
    newIntervals[index].to = e.target.value;
    if (nextRule) {
      nextRule.intervals = newIntervals;
    }
    setRules(nextRules);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mt: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={isAvailable} onChange={handleCheck} />}
          sx={{ color: 'text.secondary', width: 100, alignSelf: 'flex-start' }}
          label={day.toLocaleUpperCase()}
        />

        {isAvailable && (
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            {intervals.map((interval, index) => (
              <Box key={index} display={'flex'} flexDirection={'row'}>
                <TimePicker
                  time={interval.from}
                  type="from"
                  index={index}
                  onChange={handleFromChange}
                />
                -
                <TimePicker
                  time={interval.to}
                  type="to"
                  index={index}
                  onChange={handleToChange}
                />
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => handleDelete(index)}
                  sx={{ height: 'fit-content', alignSelf: 'center' }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {!isAvailable && (
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Unavailable
          </Typography>
        )}

        <IconButton
          aria-label="delete"
          size="small"
          onClick={handleAdd}
          sx={{ height: 'fit-content', alignSelf: 'center' }}
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </LocalizationProvider>
  );
}

export default DayTimeRanges;
