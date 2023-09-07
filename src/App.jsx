import "./App.css";
import { Routes, Route } from "react-router";
import Events from "./pages/Events";
import Likes from "./pages/Likes";
import Matches from "./pages/Matches";
import Profile from "./pages/Profile";
import Message from "./pages/Message";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ProfileDetails from "./pages/ProfileDetails";
import EventDetails from "./pages/EventDetails";
import EventCreate from "./pages/EventCreate";
import Home from "./pages/Home";
import IsPrivate from "./components/IsPrivate";
import Navbar from "./components/Navbar";
import Swipe from "./pages/Swipe";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/swipe"
          element={
            <IsPrivate>
              <Swipe />
            </IsPrivate>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route
          path="/user/:userId/profile"
          element={
            <IsPrivate>
              <ProfileDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/events"
          element={
            <IsPrivate>
              <Events />
            </IsPrivate>
          }
        />
        <Route
          path="/events/:eventId/details"
          element={
            <IsPrivate>
              <EventDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/events/:eventId/edit"
          element={
            <IsPrivate>
              <EventDetails />
            </IsPrivate>
          }
        />
        <Route
          path="/events/new-event"
          element={
            <IsPrivate>
              <EventCreate />
            </IsPrivate>
          }
        />
        <Route
          path="/likes"
          element={
            <IsPrivate>
              <Likes />
            </IsPrivate>
          }
        />
        <Route
          path="/matches"
          element={
            <IsPrivate>
              <Matches />
            </IsPrivate>
          }
        />
        <Route
          path="/messages/:senderId/:receiverId"
          element={
            <IsPrivate>
              <Message />
            </IsPrivate>
          }
        />

        <Route path="/" element={<Home />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
