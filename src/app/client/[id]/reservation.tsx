import dayjs from 'dayjs';
import { Box, Button, Typography } from '@mui/material';
import { blue, red, green } from '@mui/material/colors';
import Link from 'next/link';

function Reservation({ reservation }: { reservation: any }) {
  const { start_time, length, status, provider_name, providerId } = reservation;

  // TODO: check if reservation has expired
  // current time > 30 mins after reservation.reserve_time

  return (
    <Box key={start_time}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle2" component="h2">
          {dayjs(start_time).format('dddd, MMMM D h:mm A')}
        </Typography>

        <Typography variant="body2" component="p">
          {length} minutes
        </Typography>
      </Box>
      <Typography variant="subtitle2" component="h3">
        {provider_name}
      </Typography>
      {status === 'confirmed' && (
        <Typography variant="body2" component="p" sx={{ color: green[700] }}>
          Confirmed
        </Typography>
      )}
      {status === 'pending' && (
        <>
          <Typography variant="body2" component="p" sx={{ color: blue[700] }}>
            Pending
          </Typography>
          <Button variant="contained" size="small" sx={{ mt: 1 }}>
            Confirm
          </Button>
        </>
      )}
      {status === 'expired' && (
        <>
          <Typography variant="body2" component="p" sx={{ color: red[700] }}>
            Expired
          </Typography>
          <Button variant="contained" size="small" sx={{ mt: 1 }}>
            <Link href={`/provider/${providerId}`}>Reschedule </Link>
          </Button>
        </>
      )}
    </Box>
  );
}

export default Reservation;
