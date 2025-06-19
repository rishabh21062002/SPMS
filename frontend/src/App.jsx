import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './component/Navbar';
import Footer from './component/Footer';
import Container from './component/Container'; // Main content of home page
import AllstudentEnrolled from './component/AllstudentEnrolled';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/enrolledStudents" element={<AllstudentEnrolled />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;