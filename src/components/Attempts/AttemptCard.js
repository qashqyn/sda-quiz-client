import React from "react";
import { Image } from "react-bootstrap";

const AttemptCard = ({attempt}) => {
    return (
        <div className="question-card mb-5">
            <div className="question-card-body">
                <div className="question-card-heading">
                    <div>
                        {attempt.question}
                    </div>
                    <span>{attempt.successes}/{attempt.attempts}</span>
                </div>
                {attempt.question_image && (
                    <div className="question-image">
                        <Image src={attempt.question_image} />
                    </div>
                )}
                <div className="question-card-content">
                        {attempt.options.map((option, key)=> option.is_answer && (
                            <div className='option correct' key={key}>
                                {option.text}
                            </div>
                        ))}
                </div>
                <div className="question-card-footer">
                    {attempt.description}
                </div>
            </div>
        </div>
    );
};

export default AttemptCard;