import { unstable_noStore as noStore } from 'next/cache';
import React from 'react';
import { notFound } from 'next/navigation';
import { Container } from '@mui/material';

import BookReservation from './book-reservation';
import { mockFetchProviderById } from '@/api/mock-fetch';

export default function Provider({ params }: { params: { id: string } }) {
  noStore();

  const provider = mockFetchProviderById(Number(params.id));

  if (!provider) {
    return notFound();
  }

  return (
    <Container fixed sx={{ mt: 4 }}>
      <BookReservation providerId={provider.id} />
    </Container>
  );
}
