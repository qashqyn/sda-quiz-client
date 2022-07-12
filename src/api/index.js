import axios from 'axios';

const API = axios.create({ baseURL: 'https://sda-quiz.herokuapp.com/', validateStatus: function (status) { return true } });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const login = (data) => API.post('/users/login', data);

export const addQuestion = (data) => API.post('/quiz', data);

export const fetchQuestions = (count) => API.get(`/quiz?count=${count}`);
export const fetchAttempts = () => API.get(`/quiz/attempts`);
export const calculateAttempt = (attempt) => API.post(`/quiz/attempts`, attempt);