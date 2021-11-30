import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/navbar/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {user && <Home />}
                  {!user && <Navigate to="/login" />}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user && <Navigate to="/" />}
                  {!user && <Login />}
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  {!user && <Signup />}
                  {user && <Navigate to="/" />}
                </>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
