import React, { useState } from 'react'
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from "react-router-dom";

const Login = ({users, dispatch}) => {
// console.log('list of users' + (props.users))
const navigate = useNavigate();

const [username, setUsername] = useState('sarahedo');
const [password, setPassword] = useState('123');
const [loginError, setLoginError] = useState('');


const handleUsername = (e) => {
    setUsername(e.target.value)
}

const handlePassword = (e) => {
    setPassword(e.target.value)
}

const handleLoginClick = (e) => {
    e.preventDefault();
    //const {users} = props
    // const user = users[username];
    // console.log('The user is' + user);
    // if(user && user.password === password){
    //     console.log('Login successful!');
    //     setLoginError('');
    // } else {
    //   // Failed login
    //   console.log('Login failed!');
    //   setLoginError('Invalid username or password');
    // }
    if (Array.isArray(users)) {
        users.map((user) => console.log(user));
    } else {
        const isUserValid = Object.values(users).some((user)=>(user.id === username && user.password === password))
        if (isUserValid) {
            // Successful login, you can perform further actions here
            console.log('Login successful!');
            setLoginError('');
            dispatch(setAuthedUser(username)); // dispatch(setAuthedUser(username)) updaet to username later
            navigate("/home"); //
          } else {
            // Failed login
            console.log('Login failed!');
            setLoginError('Invalid username or password');
          }
    }
}

  return (
    <>
        <div className="login-container">
            <h1>Welcome to Employee Portal.</h1>
            <img src="https://avatars.githubusercontent.com/u/000000?v=1" alt="Poll" />
            <form onSubmit={handleLoginClick}>
                <label htmlFor="Username">Username: </label>
                <input data-testid="username" type="text" value={username} placeholder='username' onChange={handleUsername}/>
                <br></br>
                <label htmlFor="Password:">Password: </label>
                <input data-testid="password" type="password" value={password} placeholder='password'onChange={handlePassword}/>
                <br></br>
                <button data-testid="submit" type='submit' onClick={handleLoginClick} disabled={!username || !password}>Login!</button>
            </form>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        </div>
    </>
  )
}

const mapStateToProps = ({users}) => ({
    users
})

export default connect(mapStateToProps)(Login)