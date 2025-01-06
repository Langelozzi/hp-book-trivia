import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

// Define props type
interface OverviewCardProps {
    number: number;
    text: string;
    isComplete: boolean;
    onClick: () => void; // Function to handle click
}

const OverviewCard: React.FC<OverviewCardProps> = ({ number, text, isComplete, onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                gap: 2,
                cursor: 'pointer', // Makes the card clickable
                backgroundColor: isComplete ? '#e0e0e0' : '#ffffff', // Grey for completed
                '&:hover': {
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Add hover effect
                },
            }}
        >
            {/* Number */}
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {number}
            </Typography>

            {/* Text */}
            <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {text}
            </Typography>

            {/* Check/Uncheck Icon */}
            <Box>
                {isComplete ? (
                    <CheckCircleOutlineIcon color="success" />
                ) : (
                    <CircleOutlinedIcon color="disabled" />
                )}
            </Box>
        </Card>
    );
};

export default OverviewCard;
