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
            <div >
                {answers.map(answer => (
                    <div key={answer}>
                        <button disabled={userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />

                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default QuestionCard
