import { BrowserRouter, Routes, Route } from "react-router-dom";

// Custom components and pages
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SelectUserType from "./pages/SelectUserType";
import Events from "./pages/Events";

// User pages
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import UserEvents from "./pages/UserEvents";
import Landing from "./pages/Landing";

// Org pages
import OrgSignup from "./pages/OrgSignup";
import OrgLogin from "./pages/OrgLogin";
import OrgProfile from "./pages/OrgProfile";
import CreateEventForm from './pages/forms/CreateEventForm';
import ViewEvents from './pages/ViewEvents';
import EventDetails from './pages/EventDetails';
import History from './pages/history';
import Upcoming from './pages/upcoming';

// Contexts
import { ProfileContextProvider } from "./context/ProfileContext";
import { EventContextProvider } from "./context/EventContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="pages" >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/selectUserType" element={<SelectUserType />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup/volunteer" element={<UserSignup />} />
            <Route path="/signup/org" element={<OrgSignup />} />
            <Route path="/login/volunteer" element={<UserLogin />} />
            <Route path="/login/org" element={<OrgLogin />} />
            <Route path="/create-event" element={<CreateEventForm />} />
            <Route path="/view-events" element={<ViewEvents />} />
            <Route path="/event-details" element={<EventDetails />} />
            <Route path="/history" element={<History />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/profile/volunteer" element={
              <ProfileContextProvider>
                <UserProfile />
              </ProfileContextProvider>
            } />
            <Route path="/events/volunteer" element={
              <EventContextProvider>
                <UserEvents />
              </EventContextProvider>
            } />
            <Route path="/profile/org" element={
              <ProfileContextProvider>
                <OrgProfile />
              </ProfileContextProvider>
            } />
            <Route path="/events/user" element={
              <EventContextProvider>
                <Events />
              </EventContextProvider>
            } />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
