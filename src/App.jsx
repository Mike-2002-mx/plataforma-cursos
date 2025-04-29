import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CoursesProvider } from './context/CoursesContext';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CoursesProvider>
          <AppRoutes />
        </CoursesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
