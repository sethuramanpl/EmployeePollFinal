import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { useEffect } from "react";
import { handleInitialData } from "../actions/shared";
import Leadership from "./Leadership";
import PollCreation from "./PollCreation";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import AnswerPoll from "./AnswerPoll";
import Error from "./Error";
import '../styles/app.css'
import PrivateRoute from "./PrivateRoute";

function App(props) {

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
    {props.userLoggedIn === true ? null : <Nav />}
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" exact element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/leaderboard" element={<PrivateRoute><Leadership /></PrivateRoute>} />
      <Route path="/new" element={<PrivateRoute><PollCreation /></PrivateRoute>} />
      <Route path="/questions/:id" element={<PrivateRoute><AnswerPoll /></PrivateRoute>} />
      <Route path="/error" exact element={<Error/>}/>
      <Route path="/Logout" exact element={<Login/>}/>
    </Routes>
    </div>
  );
}
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  userLoggedIn: authedUser === null,
});
export default connect(mapStateToProps)(App);
