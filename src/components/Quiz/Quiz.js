import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateAttempt, getQuestions } from '../../actions/quiz';
import QuestionCard from '../Questions/QuestionCard';
import { Row, Col, Card, Button, ProgressBar, Spinner } from 'react-bootstrap';

const Quiz = () => {
    const {questions} = useSelector((state)=>state.quiz)
    
    const [current, setCurrent] = useState(0);
    const [closed, setClosed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [answers, setAnswers] = useState({});
    
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!questions){
            dispatch(getQuestions(20));
        }
    }, [dispatch])
    
    const setAnswer = (index, answer) => {
        setAnswers({...answers, [index]: answer});
    }
    const calculate = () => {
        let count = 0;
        let attempt = [];
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            if(!answers[i])
                continue;
            let isCorrect = false;
            const userAns = answers[i];
            for (let j = 0; j < question.options.length; j++) {
                const option = question.options[j];
                if(option.text === userAns && option.is_answer){
                    isCorrect = true;
                    count++;    
                    break;
                }
            }
            attempt.push({_id: question._id, success: isCorrect});
        }
        setCorrectCount(count);
        setClosed(true);
        dispatch(calculateAttempt(attempt));
    }

    const nextQuestion = (e) =>{
        e.preventDefault();
        setCurrent(current+1);
        if(current+1 === questions.length){
            calculate();
        }
    }

    return (
        <div id="quiz" className='pb-5'>
            {(questions && questions.length>0) ? (
                closed ? (
                    <>
                        <div className='mb-5 mt-5'>
                            <h2 className='h2 text-center'>Результат</h2>
                            <h1 className='h1 text-center'>{Math.round(correctCount/questions.length * 100)}%</h1>
                            <h4 className='h5 text-center'>{correctCount}/{questions.length}</h4>
                            <Row xs={1} md={2} className="mt-5">
                                <Col>
                                    <a className='btn w-100' href='/'>Главная</a>
                                </Col>
                                <Col>
                                    <a className='btn w-100' href='/quiz'>Новый тест</a>
                                </Col>
                            </Row>
                        </div>
                        <h3 className='h3 mb-3 text-center'>
                            Ваши ответы:
                        </h3>
                        {questions.map((question, key) => (
                            <QuestionCard show={true} showAll={true} ans={answers[key]} question={question} index={key} key={key}/>
                        ))}
                    </>
                ) : (
                    <>  
                        <div className='mb-5 mt-5'>
                            <h1 className='h2 text-center'>Вопрос {current+1}/{questions.length}</h1>
                        </div>
                        <ProgressBar className='mb-3' now={(questions && current!==0) ? (current / questions.length  * 100) : 0} />
                        {questions.map((question, key) => (
                            <QuestionCard show={current===key} question={question} index={key} key={key} setAnswer={setAnswer} next={nextQuestion} />
                        ))}
                        <Button className='w-100 close-btn' onClick={calculate}>Закончить тест</Button>
                    </>
                )
            ) : (
                <div className='m-5 h-100 text-center'>
                    <Spinner animation="grow" />
                </div>
            )}
        </div>
    );
};

export default Quiz;