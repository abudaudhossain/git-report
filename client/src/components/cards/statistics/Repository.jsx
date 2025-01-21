import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

// project import
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function Repository({ color = 'primary', repository }) {
    return (
        <MainCard contentSX={{ p: 2.25 }}>
            <Stack spacing={0.5}>
                <Grid item xs={12} sm container>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            {repository.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {repository?.name ? (
                            <Button
                                component={Link}
                                to={`/projects/${repository.name}`}
                                variant="contained"
                                color={color}
                                size="small"
                            >
                                Report
                            </Button>
                        ) : (
                            <Button variant="contained" color="error" size="small" disabled>
                                Invalid Repository
                            </Button>
                        )}
                    </Grid>

                </Grid>
                <Grid item xs container direction="column">
                    <Typography variant="body2" gutterBottom>
                        {repository.fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        ID: {repository.githubId}
                    </Typography>
                </Grid>

            </Stack>

        </MainCard>
    );
}


Repository.propTypes = {
    color: PropTypes.string, // Define the expected shape of the theme configuration
    repository: PropTypes.shape({
        githubId: PropTypes.string,
        name: PropTypes.string,
        fullName: PropTypes.string,
    }),
};
