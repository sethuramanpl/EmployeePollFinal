import React, { useState } from 'react'
import { connect } from "react-redux";
import authedUser from '../reducers/authedUser';
import { handleAddQuestion } from '../actions/questions';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate } from "react-router-dom";

const PollCreation = (props) => {

    const navigate = useNavigate();
    const [optionOne, setOptionOne ]  = useState('')
    const [optionTwo, setOptionTwo ]  = useState('')

    const handleOptionsOne = (e) => {
        setOptionOne(e.target.value)
    }

    const handleOptionsTwo = (e) => {
        setOptionTwo(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.dispatch(setAuthedUser(props.authedUser)) // dispatch(setAuthedUser(username)) updaet to username later
        props.dispatch(handleAddQuestion(optionOne,optionTwo))
        navigate("/home")
    }

  return (

    <>
    <h2>Would You Rather</h2>
    <h3>Create Your Own Poll</h3>
    <form onSubmit={handleSubmit}>
        <label htmlFor="firstOption">First Option:</label>
        <br></br>
        <textarea data-testid="optionOne" type="text" value={optionOne} placeholder='Type Option one' onChange={handleOptionsOne}/>
        <br></br>
        <label htmlFor="secondOption">Second Option:</label>
        <br></br>
        <textarea data-testid="optionTwo" type="textarea" value={optionTwo} placeholder='Type Option two' onChange={handleOptionsTwo}/>
        <br></br>
        <button data-testid="submitButton" type='submit'disabled={!optionOne || !optionTwo}>Submit</button>
    </form>
    </>
  )
}

const mapStateToProps = ({authedUser, users}) => ({
    users,
    authedUser
})
export default connect(mapStateToProps)(PollCreation)