import React, { useState } from 'react'
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import Card from './Card';


const Dashboard = (props) => {

    const [isToggle, setIsToggle] = useState(true);

    const {authedUser, questions, users} = props

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser)
        && !question.optionTwo.votes.includes(authedUser));

    const answered = (question) => (question.optionOne.votes.includes(authedUser)
        || question.optionTwo.votes.includes(authedUser));

        const toggleChange = ()=>{
            setIsToggle(!isToggle)
           }

        return (
            <div>
                <button onClick={toggleChange} disabled={isToggle}>Show UnAnswered/New Questions</button>
                <button onClick={toggleChange} disabled={!isToggle}>Show Answered Questions</button>

                <h1>Dashboard</h1>
                {
                    isToggle ? (<><h2> New Questions / Unaswered Questions</h2>
                    <div className="card-wrapper">
                            <ul>
                                    {questions
                                        .filter(unanswered)
                                        .map((question) => (
                                            <li key={question.id}>
                                                <Card question={question} author={users[question.author]}/>
                                            </li>
                                        ))
                                        }
                            </ul>
                    </div></>) : (<>
                                <h2> Answered Questions</h2>
                                <div className="card-wrapper">
                                        <ul>
                                        {questions
                                            .filter(answered)
                                            .map((question) => (
                                                <li key={question.id}>
                                                    <Card question={question} author={users[question.author]}/>
                                                </li>
                                            ))}
                                        </ul>
                                </div>
                            </>)
                }
            </div>
        )
}

const mapStateToProps = ({questions, users,authedUser}) => {

 return{
    questions : Object.values(questions).sort((a,b) => b.timestamp - a.timestamp),
    users,
    authedUser,
 }
}
export default connect(mapStateToProps)(Dashboard);