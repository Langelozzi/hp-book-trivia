import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import Home from './pages/Home';
import QuestionPage from './pages/Question';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button variant='contained' color='secondary' component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/question" element={<QuestionPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

