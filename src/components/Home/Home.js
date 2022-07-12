import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import './styles.scss';

import Img from '../../images/sample.png';

const Home = () => {
    return (
        <div id="home">
            <Container>
                <div className="mt-5 mb-5">
                    <h1 className="h1 text-center">
                        ПДД ТЕСТ
                    </h1>
                    <h3 className="h3 text-center">
                        Только для принцессы 
                    </h3>
                </div>

                <Row xs={1}>
                    <Col className="mb-3">
                        <a className="btn w-100" href="/quiz">
                            Начать тест
                        </a>
                    </Col>
                    <Col className="mb-3">
                        <a className="btn w-100" href="/attempts">
                            Повторение мать учения
                        </a>
                    </Col>
                    <Col>
                        <a className="btn w-100" href="/question-form">
                            Добавить вопрос
                        </a>
                    </Col>
                </Row>
                <div className="text-center mt-5 mb-5">
                    <Image src={Img} />
                </div>
            </Container>
        </div>
    );
};

export default Home;