// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getAPI } from 'api/axios';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import { useEffect } from 'react';



const Project = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Projects</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Project Name" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Project details Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Project details Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Project details Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid> */}

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />


    </Grid>
  )
}

export default Project