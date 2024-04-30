import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';
import { notFound } from 'next/navigation';

import { Button, Container, Paper, Typography, Divider } from '@mui/material';
import Link from 'next/link';

import { mockFetchClientById } from '@/api/mock-fetch';
import Reservation from './reservation';

export default function Client({ params }: { params: { id: string } }) {
  noStore();

  // This route should be protected by user authorization
  // Client id should be a guid, cuid, or nanoid

  // Assumption: server returns only reservations in the future
  const client = mockFetchClientById(Number(params.id));

  if (!client) {
    return notFound();
  }

  return (
    <Container fixed sx={{ mt: 4, height: '100vh' }}>
      <Paper
        elevation={2}
        sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        <Typography variant="h6" component="h1">
          Reservations
        </Typography>
        {client.reservations.length === 0 && (
          <Typography variant="body2" component="p">
            No reservations
          </Typography>
        )}
        {client.reservations.map((reservation) => (
          <>
            <Reservation
              reservation={reservation}
              key={reservation.start_time}
            />
            <Divider />
          </>
        ))}
        <Button variant="contained" sx={{ mt: 6 }}>
          <Link href={`/`}>Schedule New Appointment</Link>
        </Button>
      </Paper>
    </Container>
  );
}
