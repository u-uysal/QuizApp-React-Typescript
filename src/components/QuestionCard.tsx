import React from 'react'
import { AnswerObject } from "../App"
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles"

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionsNr: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({ question, answers, callback,
    userAnswer, questionsNr, totalQuestions }) => {
    return (
        <Wrapper>
            <p className="number">
                Questions : {questionsNr}/{totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div >
                {answers.map(answer => (
                    <ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />

                        </button>
                    </ButtonWrapper>
                ))}
            </div>

        </Wrapper>
    )
}

export default QuestionCard
