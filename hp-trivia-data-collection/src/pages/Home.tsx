import { Box } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OverviewCard from '../components/OverviewCard';
import rawData from '../data/q.json';

const Home = () => {
    const [data, setData] = useState(rawData);

    const navigate = useNavigate();

    const onCardClick = (q: any) => {
        navigate('/question', { state: q })
    }

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
                        <OverviewCard number={index + 1} text={q.q} isComplete={q.checked} onClick={() => { onCardClick(q) }} />
                    </Box>
                )
            })}
        </Box>
    );
};

export default Home;