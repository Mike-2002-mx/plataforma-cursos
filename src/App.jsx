import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
import './i18n/config';
import './App.css';
import { LanguageProvider } from './context/LanguajeContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

{/* <CoursesProvider>
<CourseContentProvider>
  <AppRoutes />
</CourseContentProvider>
</CoursesProvider> */}