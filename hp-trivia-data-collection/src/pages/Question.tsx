import { useLocation, useNavigate } from "react-router-dom";
import { Question } from '../interfaces/question';
import QuestionCard from "../components/QuestionCard";
import { useSwipeable } from "react-swipeable";
import { Box, IconButton, Typography } from "@mui/material";
import { useData } from "../contexts/DataContext";
import FeedbackForm from "../components/FeedbackForm";
import { updateRecord } from "../api/firebase-crud";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const QuestionPage = () => {
    const { data, refetchData } = useData();
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

    const handleFormSubmit = async (data: FormData) => {
        // Add your logic to save the data here (e.g., API call)
        console.log(data);
        await updateRecord(question.id.toString(), {
            checked: true,
            ...data
        });
        await refetchData();
    };

    // Add buttons that are stuck at bottom that will allow the user to navigate between questions in desktop mode (only in desktop view)
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                {/* Left Arrow Button */}
                <IconButton onClick={() => { handleSwipeRight() }}>
                    <ArrowBack sx={{ color: 'white' }} />
                </IconButton>

                {/* Centered Typography */}
                <Typography align="center" sx={{ flex: 1 }}>
                    {currentIndex + 1}/{data.length}
                </Typography>

                {/* Right Arrow Button */}
                <IconButton onClick={() => { handleSwipeLeft() }}>
                    <ArrowForward sx={{ color: 'white' }} />
                </IconButton>
            </Box>

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
                    <FeedbackForm q={question} onSubmit={handleFormSubmit} />
                </Box>
            </Box>
        </>
    );
};

export default QuestionPage;