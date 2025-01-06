import { useLocation } from "react-router-dom";
import { Question } from "../interfaces/question";

const QuestionPage = () => {
    const location = useLocation();
    const question = location.state as Question;

    return (
        <>
            {question.q}
        </>
    )
};

export default QuestionPage;