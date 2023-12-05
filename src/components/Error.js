import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Error = () => {

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/Login");
  }

  return (
    <div>
        <h2>Page not found.</h2>
        <button onClick={clickHandler}>Retrun to Login Page</button>
    </div>
  )
}

export default connect()(Error)