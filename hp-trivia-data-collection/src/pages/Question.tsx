import { useLocation, useNavigate } from "react-router-dom";
import { Question } from '../interfaces/question';
import QuestionCard from "../components/QuestionCard";
import rawData from '../data/q.json'
import { useSwipeable } from "react-swipeable";
import { Box, Typography } from "@mui/material";

const QuestionPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const question = location.state as Question;
    const currentIndex = question.id - 1;

    const prevQuestion = rawData[currentIndex - 1] || null;
    const nextQuestion = rawData[currentIndex + 1] || null;

    const handleSwipeLeft = () => {
        if (nextQuestion) {
            navigate('/question', { state: nextQuestion });
        }
    };

    const handleSwipeRight = () => {
        if (prevQuestion) {
            navigate('/question', { state: prevQuestion });
        }
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
        delta: 50
    });

    return (
        <>
            <Typography align="center">
                {currentIndex + 1}/{rawData.length}
            </Typography>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                {...swipeHandlers} // Add swipe handlers
            >
                <Box>
                    <QuestionCard q={question} />
                </Box>
            </Box>
        </>
    )
};

export default QuestionPage;