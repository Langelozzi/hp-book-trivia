import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import OverviewCard from '../components/OverviewCard';
import { useData } from '../contexts/DataContext';
import { Question } from '../interfaces/question';

const Home: React.FC = () => {
    const { data, loading } = useData();
    const navigate = useNavigate();

    const onCardClick = (q: Question) => {
        navigate('/question', { state: q });
    };

    return (
        <Box
            sx={{
                height: '90vh',
                overflow: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {loading ? (
                // Show loading message while data is being fetched
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress />
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Loading...
                    </Typography>
                </Box>
            ) : (
                // Render the cards once data is loaded
                data.map((q) => (
                    <Box sx={{ marginBottom: 2 }} key={q.id}>
                        <OverviewCard
                            number={q.id}
                            text={q.q}
                            isComplete={q.checked}
                            onClick={() => onCardClick(q)}
                        />
                    </Box>
                ))
            )}
        </Box>
    );
};

export default Home;