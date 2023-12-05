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

function App(props) {

  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
    {props.loading === true ? null : <Nav />}
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/home" exact element={<Dashboard />} />
      <Route path="/leaderboard" element={<Leadership />} />
      <Route path="/new" element={<PollCreation />} />
      <Route path="/poll/:id" element={<AnswerPoll />} />
      <Route path="/error" exact element={<Error/>}/>
      <Route path="/Logout" exact element={<Login/>}/>
    </Routes>
    </div>
  );
}
const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});
export default connect(mapStateToProps)(App);
