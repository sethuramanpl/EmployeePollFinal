import { Link } from "react-router-dom";
import {connect} from "react-redux";
import { handleLogout } from "../actions/authedUser";
import { useNavigate } from 'react-router-dom';

import React from 'react'

const Nav = ({dispatch, authedUser}) => {

    let navigate = useNavigate();

    const clickLogout = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
        navigate("/Login");

    }

  return (
    <div className="nav">
        <ul>
            <li>
                <Link to="/home">Home</Link>
            </li>
            <li>
                <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
                <Link to="/new">New Poll</Link>
            </li>
            <span>User: {authedUser}</span>
            <li>
                <Link onClick={clickLogout}>Logout</Link>
            </li>
        </ul>
    </div>
  )
}

const mapStateToProps = ({authedUser}) => ({
    authedUser,
});
export default connect(mapStateToProps)(Nav)