import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';
import { notFound } from 'next/navigation';
import { mockFetchProviderById } from '@/api/mock-fetch';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import WeeklyAvailability from './weekly-availability';

export default async function Routine({ params }: { params: { id: string } }) {
  noStore();

  // This route should be protected by user authorization

  const providers = mockFetchProviderById(Number(params.id));

  if (!providers) {
    return notFound();
  }

  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        pt: 4,
        pb: 4,
      }}
    >
      <Typography variant="h6" component="h1">
        {providers.name}
      </Typography>
      <WeeklyAvailability />
    </Container>
  );
}
