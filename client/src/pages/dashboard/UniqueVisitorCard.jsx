import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function UniqueVisitorCard({ repositories }) {
  const [slot, setSlot] = useState('15');
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h5">Commits Analytics</Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" alignItems="center" spacing={0}>
            <Button
              size="small"
              onClick={() => setSlot('all')}
              color={slot === 'all' ? 'primary' : 'secondary'}
              variant={slot === 'all' ? 'outlined' : 'text'}
            >
              Last 50 Days
            </Button>

            <Button
              size="small"
              onClick={() => setSlot('30')}
              color={slot === '30' ? 'primary' : 'secondary'}
              variant={slot === '30' ? 'outlined' : 'text'}
            >
              Last 30 Days
            </Button>
            <Button
              size="small"
              onClick={() => setSlot('15')}
              color={slot === '15' ? 'primary' : 'secondary'}
              variant={slot === '15' ? 'outlined' : 'text'}
            >
              Last 15 Days
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 }}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart slot={slot} repositories={repositories} />
        </Box>
      </MainCard>
    </>
  );
}
