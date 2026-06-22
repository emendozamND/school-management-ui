
import { Routes, Route } from 'react-router-dom';
import { Login } from './login.jsx';
import { Dashboard } from './Dashboard.jsx';
import { StudentNew } from './StudentNew.jsx';
import { StudentEdit } from './StudentEdit.jsx';
import { StudentCalifications } from './StudentCalifications.jsx';

function App() {
  return (
    <Routes>
      <Route path ="/" element={ <Login /> } />
      <Route path ="/dashboard" element={ <Dashboard /> } />
      <Route path ="/studentnew" element={<StudentNew />} />
      <Route path ="/studentEdit/:studentId" element={<StudentEdit />} />
      <Route path ="/student/califications/:matriculaId" element={<StudentCalifications />} />
      </Routes>
  )
}

export default App
