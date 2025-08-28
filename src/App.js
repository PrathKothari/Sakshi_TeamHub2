import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TeamDetails from './pages/TeamDetails';
import Login from './pages/Login';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Signup from './pages/Signup'; 
import JoinTeam from "./pages/joinTeam";
import CreateTeam from './pages/create_team'; 
import ProfilePage from './pages/profileUpdate';
import MyTeams from './pages/MyTeams';
import Events from './pages/Events';
import TeamChat from './components/TeamChat'; // Import TeamChat

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div className="app-layout">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team/:id" element={<TeamDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/join-team" element={<JoinTeam />} />
                <Route path="/create-team" element={<CreateTeam />} />
                <Route path="/updateprofile" element={<ProfilePage />} />
                <Route path="/my-teams" element={<MyTeams />} />
                <Route path="/events" element={<Events />} />
                <Route path="/team-chat/:teamId" element={<TeamChat />} /> {/* Add TeamChat route */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
