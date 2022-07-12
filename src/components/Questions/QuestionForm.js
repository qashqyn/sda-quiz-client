import React, { useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";

import './styles.scss';
import NoImg from '../../images/noimg.jpg';
import { useDispatch } from "react-redux";
import { addQuestion } from "../../actions/quiz";

const QuestionForm = () => {
    const [formData, setFormData] = useState({question_image: '', question: '', description_image: '', description: ''});

    const [options, setOptions] = useState([{text: '', is_answer: true}, {text: ''}]);

    const dispatch = useDispatch();

    const addOption = (e) => {
        e.preventDefault();
        setOptions(options.concat({text: ''}));
    }
    const removeOption = (e) =>{
        e.preventDefault()
        const tmp = options.map(el => Object.assign({}, el));
        tmp.splice(e.target.dataset.index, 1);
        setOptions(tmp);
    }

    const setOptionValue = (e)=>{
        e.preventDefault();
        const tmp = options.map(el => Object.assign({}, el));
        tmp[e.target.dataset.index].text = e.target.value;
        setOptions(tmp);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addQuestion({...formData, options}));
        setFormData({question_image: '', question: '', description_image: '', description: ''});
        setOptions([{text: '', is_answer: true}, {text: ''}]);
    };  

    return (
        <div id="question-form" className="pb-5">
            <div className='mb-5 mt-5'>
                <h2 className='h2 text-center'>Добавить вопрос</h2>
                <Row xs={1} md={2} className="mt-5">
                    <Col>
                        <a className='btn w-100' href='/'>Главная</a>
                    </Col>
                    <Col>
                        <a className='btn w-100' href='/quiz'>Пройти тест</a>
                    </Col>
                </Row>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} md={3}>
                        <Form.Label>Картинка вопроса</Form.Label>
                        <Image src={formData.question_image ? formData.question_image : NoImg}/>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Group>
                            <Form.Label>Ссылка на картинку</Form.Label>
                            <Form.Control type="text" value={formData.question_image} name="question_image" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Описание вопроса</Form.Label>
                            <Form.Control as="textarea" value={formData.question} rows={3} name="question" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group>
                    <Form.Label>Варианты</Form.Label>
                    <p>Минимум 2 варианта ответа. Первый вариант считаеться правильным.</p>
                    <div id="options">
                        {options.map((option, key)=>(
                            <div className="option-input" key={key}>
                                <Form.Control type="text" value={option.text} data-index={key} onChange={setOptionValue}/>
                                {key > 1 && (
                                    <Button data-index={key} onClick={removeOption}>Remove</Button>
                                )}
                            </div>
                        ))}
                    </div>
                    <a className="btn mt-3 add-option-btn w-100" onClick={addOption}>Добавить вариант</a>
                </Form.Group>
                {/* <Row>
                    <Col xs={12} md={3}>
                        <Form.Label>Картинка ответа</Form.Label>
                        <Image src={formData.desciption_image ? formData.desciption_image : NoImg}/>
                    </Col>
                    <Col xs={12} md={9}>
                        <Form.Group>
                            <Form.Label>Ссылка на картинку</Form.Label>
                            <Form.Control type="text" value={formData.description_image} name="desciption_image" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Описание ответа</Form.Label>
                            <Form.Control as="textarea" rows={3} value={formData.description} name="description" onChange={handleChange} />
                        </Form.Group>
                    </Col>
                </Row> */}
                <Form.Group>
                    <Form.Label>Описание ответа</Form.Label>
                    <Form.Control as="textarea" rows={3} value={formData.description} name="description" onChange={handleChange} />
                </Form.Group>
                <Button  type="submit" >Добавить вопрос</Button>
            </Form>
        </div>
    );
};

export default QuestionForm;