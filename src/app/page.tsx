import { mockFetchProviders } from '@/api/mock-fetch';
import { Paper, Typography, Container, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  const providers = mockFetchProviders();

  return (
    <Container fixed sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h6" component="h1" sx={{ mb: 4 }}>
          Book an appointment with a provider
        </Typography>
        {providers.map((provider) => (
          <div key={provider.id}>
            <Button variant="contained" fullWidth sx={{ mt: 4 }}>
              <Link href={`/provider/${provider.id}`}>{provider.name}</Link>
            </Button>
          </div>
        ))}
      </Paper>
    </Container>
  );
}
