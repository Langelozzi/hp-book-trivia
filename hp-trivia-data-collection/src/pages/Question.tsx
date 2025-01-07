import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Question } from "../interfaces/question";
import QuestionCard from "../components/QuestionCard";
import { useSwipeable } from "react-swipeable";
import { Box, IconButton, Typography, Snackbar, Alert } from "@mui/material";
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

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSwipeLeft = () => {
        if (nextQuestion) {
            navigate('/question', { state: nextQuestion });
        }
    };

    const handleSwipeRight = () => {
        if (prevQuestion) {
            navigate('/question', { state: prevQuestion });
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleSwipeLeft,
        onSwipedRight: handleSwipeRight,
        delta: 50,
    });

    const handleFormSubmit = async (formData: FormData) => {
        try {
            console.log(formData);
            await updateRecord(question.id.toString(), {
                checked: true,
                ...formData,
            });
            await refetchData();

            // Show success message
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Failed to save data", error);
        }
    };

    return (
        <>
            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <IconButton onClick={handleSwipeRight}>
                    <ArrowBack sx={{ color: 'white' }} />
                </IconButton>
                <Typography align="center" sx={{ flex: 1 }}>
                    {currentIndex + 1}/{data.length}
                </Typography>
                <IconButton onClick={handleSwipeLeft}>
                    <ArrowForward sx={{ color: 'white' }} />
                </IconButton>
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                {...swipeHandlers}
            >
                <Box>
                    <QuestionCard q={question} />
                    <FeedbackForm q={question} onSubmit={handleFormSubmit} />
                </Box>
            </Box>

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Saved successfully
                </Alert>
            </Snackbar>
        </>
    );
};

export default QuestionPage;
