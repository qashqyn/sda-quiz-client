import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";

import './styles.scss';

const QuestionCard = ({show=false,question, ans, setAnswer, showAll=false, index, next}) => {
    
    const [userAns, setUserAns] = useState(null);
    const [options, setOptions] = useState([]);

    const handleChoose = (e) =>{
        e.preventDefault();
        setUserAns(e.target.value)
    }

    useEffect(()=>{
        if(userAns){
            setAnswer(index, userAns);
        }
    }, [userAns, index]);

    useEffect(()=>{
        if(question && options.length === 0){
            const ops = question.options
            .map(option => ({ option, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({option})=>option);
            setOptions(ops);
        }
    }, [question, options])
    const [userCorrect, setUserCorrect] = useState(false);
    useEffect(()=>{
        if(ans && options.length>0){
            let crct = false;
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                if(option.text === ans && option.is_answer){
                    crct = true;
                    break;
                }
            }
            setUserCorrect(crct);
        }
    }, [ans, options])

    return show && (
        <div className={`question-card mb-5 ${showAll ? (userCorrect ? 'correct' : 'wrong') : ''}`}>
            <div className="question-card-body">
                <div className="question-card-heading">
                    {question.question}
                </div>
                {question.question_image && (
                    <div className="question-image">
                        <Image src={question.question_image} />
                    </div>
                )}
                <div className="question-card-content">
                    <Row>
                        {options.map((option, key)=> (
                            <Col key={key} xs={12} md={6} className="mb-3">
                                {showAll ? (
                                    <div className={`option ${option.is_answer ? 'correct' : ''} ${(ans && ans===option.text && !option.is_answer) ? 'wrong' : ''}`}>
                                        {option.text}
                                    </div>
                                ) : (
                                    <label className={`option ${(userAns && userAns===option.text) ? 'active' : ''} `}>{option.text}
                                        <input name={`q-${index}`} value={option.text} onClick={handleChoose} type="radio"/> 
                                    </label>
                                )}
                            </Col>
                        ))}
                    </Row>
                </div>
                <div className="question-card-footer">
                    {showAll ? (question.description && (
                        <div>
                            {question.description}
                        </div>
                    )) : (
                        <div className={`btn ${!userAns ? 'disabled' : ''}`} onClick={next} >Следующий</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;