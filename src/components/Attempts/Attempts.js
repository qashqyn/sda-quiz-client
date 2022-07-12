import React, { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAttempts } from "../../actions/quiz";
import AttemptCard from "./AttemptCard";

const Attempts = () => {
    const {attempts} = useSelector((state)=>state.quiz);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!attempts){
            dispatch(getAttempts());
        }
    }, [dispatch])

    return (
        <div id="attempts">
            <div className="mt-5 mb-5">
                <h1 className="h1 text-center">
                    Повторение мать учения
                </h1>
                <h3 className="h3 text-center">
                    
                </h3>
                <Row xs={1} md={2} className="mt-5">
                    <Col>
                        <a className='btn w-100' href='/'>Главная</a>
                    </Col>
                    <Col>
                        <a className='btn w-100' href='/quiz'>Пройти тест</a>
                    </Col>
                </Row>
            </div>
            <div>
                {attempts ? attempts.map((attempt, key) => (
                    <AttemptCard attempt={attempt} key={key} />
                )) : (
                    <div className='m-5 h-100 text-center'>
                        <Spinner animation="grow" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attempts;