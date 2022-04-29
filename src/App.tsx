import './App.css';
import { Router } from './providers/router/router';
import { AuthProvider } from './providers/authProvider/authProvider';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
