import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle"
import Routes from "./pages/Routes"
import AuthContextProvider from './pages/Context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}

export default App;
