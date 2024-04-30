'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import DayTimeRanges from './day-time-ranges';
import { Rule } from '@/types/types';

function WeeklyAvailability() {
  // TODO: Existing rules should fetched from server
  const [rules, setRules] = useState<Rule[]>([
    { day: 'Sun', intervals: [{ from: '09:00', to: '17:00' }] },
    { day: 'Mon', intervals: [{ from: '09:00', to: '17:00' }] },
    { day: 'Tue', intervals: [{ from: '09:00', to: '17:00' }] },
    { day: 'Wed', intervals: [{ from: '09:00', to: '17:00' }] },
    { day: 'Thu', intervals: [{ from: '09:00', to: '17:00' }] },
    { day: 'Fri', intervals: [{ from: '09:00', to: '17:00' }] },
    { day: 'Sat', intervals: [{ from: '09:00', to: '17:00' }] },
  ]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: Post availability rules to server
        console.log('availabilityRules', rules);
      }}
    >
      <Box sx={{ borderRadius: 2, bgcolor: 'background.paper', p: 2 }}>
        <Typography variant="subtitle2" component="h3" color={'text.primary'}>
          Weekly Hours
        </Typography>
        <Typography variant="body2" component="p" color={'text.secondary'}>
          Pick the times when clients will be able to schedule appointments.
        </Typography>
        <DayTimeRanges day="Sun" rules={rules} setRules={setRules} />
        <DayTimeRanges day="Mon" rules={rules} setRules={setRules} />
        <DayTimeRanges day="Tue" rules={rules} setRules={setRules} />
        <DayTimeRanges day="Wed" rules={rules} setRules={setRules} />
        <DayTimeRanges day="Thu" rules={rules} setRules={setRules} />
        <DayTimeRanges day="Fri" rules={rules} setRules={setRules} />
        <DayTimeRanges day="Sat" rules={rules} setRules={setRules} />
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth={true}
        sx={{ mt: 2, justifySelf: 'center' }}
      >
        Save
      </Button>
    </form>
  );
}

export default WeeklyAvailability;
