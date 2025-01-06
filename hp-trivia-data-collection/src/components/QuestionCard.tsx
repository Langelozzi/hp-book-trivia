import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Question } from '../interfaces/question';

interface QuestionCardProps {
    q: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ q }) => {
    // State to manage the visibility of the answer
    const [showAnswer, setShowAnswer] = useState(false);

    const toggleAnswer = () => {
        setShowAnswer((prev) => !prev); // Toggle the visibility
    };

    useEffect(() => {
        setShowAnswer(false);
    }, [q])

    return (
        <Card sx={{ marginBottom: 2 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {q.q} {/* Display the question */}
                </Typography>

                {/* Conditionally display the answer */}
                {showAnswer && (
                    <Typography variant="body1" color="textSecondary" paragraph>
                        {q.a} {/* Display the answer when `showAnswer` is true */}
                    </Typography>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" onClick={toggleAnswer}>
                    {showAnswer ? 'Hide Answer' : 'Show Answer'} {/* Toggle button text */}
                </Button>
            </CardActions>
        </Card>
    );
};

export default QuestionCard;
