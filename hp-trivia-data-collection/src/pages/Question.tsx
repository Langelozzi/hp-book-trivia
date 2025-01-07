import { useLocation, useNavigate } from "react-router-dom";
import { Question } from '../interfaces/question';
import QuestionCard from "../components/QuestionCard";
import { useSwipeable } from "react-swipeable";
import { Box, Typography } from "@mui/material";
import { useData } from "../contexts/DataContext";

const QuestionPage = () => {
    const { data } = useData();
    const location = useLocation();
    const navigate = useNavigate();

    const question = location.state as Question;
    const currentIndex = question.id - 1;

    const prevQuestion = data[currentIndex - 1] || null;
    const nextQuestion = data[currentIndex + 1] || null;

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

    // Add buttons that are stuck at bottom that will allow the user to navigate between questions in desktop mode (only in desktop view)
    return (
        <>
            <Typography align="center">
                {currentIndex + 1}/{data.length}
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