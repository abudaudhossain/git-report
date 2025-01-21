// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Repository from 'components/cards/statistics/Repository';
import Loader from 'components/Loader';
import { useStore } from 'contexts/StoreContext';
import { useEffect, useState } from 'react';
import { getRepositories } from 'utils/repositories';

const Project = () => {
  const { user } = useStore()
  const [repositories, setRepositories] = useState([])
  useEffect(() => {
    getRepositories(setRepositories, {
      headers: {
        authorization: `bearer ${user.accessToken}`
      }
    })
  }, [user])
  if (!repositories.length) return <Loader />
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Repositories</Typography>
      </Grid>


      {
        repositories.map(repository => {
          return (<Grid item xs={12} sm={6} md={4} lg={3}>
            <Repository repository={repository} />
          </Grid>)
        })
      }

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
    </Grid>
  )
}

export default Project