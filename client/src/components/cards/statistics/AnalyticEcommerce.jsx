import PropTypes from 'prop-types';

// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, extra }) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Stack spacing={0.5}>

        <Grid item xs={12} sm container>

          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div">
             {title}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              variant="combined"
              color={color}
              icon={<RiseOutlined style={iconSX} />}
              label={`Report`}
              sx={{ ml: 1.25, pl: 1 }}
              size="small"

            />
          </Grid>
        </Grid>
        <Grid item xs container direction="column">
          <Typography variant="body2" gutterBottom>
            Full resolution 1920x1080 • JPEG
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ID: 1030114
          </Typography>
        </Grid>

      </Stack>

    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string
};
