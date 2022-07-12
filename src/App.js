import { Container } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Attempts from './components/Attempts/Attempts';
import Home from './components/Home/Home';
import QuestionForm from './components/Questions/QuestionForm';
import Quiz from './components/Quiz/Quiz';

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/quiz" exact element={<Quiz />} />
                    <Route path="/attempts" exact element={<Attempts />} />
                    <Route path="/question-form" exact element={<QuestionForm />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
