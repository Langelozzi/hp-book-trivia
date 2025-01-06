import { useLocation } from "react-router-dom";
import { Question } from '../interfaces/question';
import QuestionCard from "../components/QuestionCard";

const QuestionPage = () => {
    const location = useLocation();
    const question = location.state as Question;

    return (
        <>
            <QuestionCard q={question} />
        </>
    )
};

export default QuestionPage;