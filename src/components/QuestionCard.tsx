import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionsNr: number;
    totalQuestions: number;
}
const QuestionCard: React.FC<Props> = ({ question, answers, callback,
    userAnswer, questionsNr, totalQuestions }) => {
    return (
        <div>
            <p className="number">
                Questions : {questionsNr}/{totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map(answer => (
                    <button disabled={userAnswer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />

                    </button>
                ))}
            </div>

        </div>
    )
}

export default QuestionCard
