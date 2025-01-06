import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import data from '../data/q.json'
import OverviewCard from '../components/OverviewCard';

const Home = () => {
    return (
        <Box
            sx={{
                height: '85vh', // Full viewport height
                overflow: 'auto', // Makes the Box scrollable
            }}
        >
            {data.map((q, index) => {
                return (
                    <Box
                        sx={{
                            marginBottom: 2
                        }}
                        key={index}
                    >
                        <OverviewCard number={index + 1} text={q.q} isComplete={true} onClick={() => { }} />
                    </Box>
                )
            })}
        </Box>
    );
};

export default Home;