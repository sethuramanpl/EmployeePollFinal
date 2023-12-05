import React from 'react'
import { connect } from "react-redux";
import { setAuthedUser } from '../actions/authedUser';
import Card from './Card';


const Dashboard = (props) => {

    const {authedUser, questions, users} = props

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser)
        && !question.optionTwo.votes.includes(authedUser));

    const answered = (question) => (question.optionOne.votes.includes(authedUser)
        || question.optionTwo.votes.includes(authedUser));



   // props.dispatch(setAuthedUser(props.authedUser)) // dispatch(setAuthedUser(username)) updaet to username later
    //console.log('props in dashboar' + JSON.stringify(props))
        return (
            <div>
                <h1>Dashboard</h1>
                <h2> New Questions</h2>
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
                    </div>
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

            </div>
        )
}



const mapStateToProps = ({questions, users,authedUser}) => {


    //   const questionArray = Object.keys(questions);

    //   console.log('question array:' + questionArray)
    //   console.log('autheed user details:' + authedUser)
    //   const answeredQuestionsOne = Object.keys(questions).filter((qid)=>questions[qid].optionOne.votes.includes(authedUser)) ;
    //   const answeredQuestionsTwo =  Object.keys(questions).filter((qid)=>questions[qid].optionTwo.votes.includes(authedUser));
    // const answeredQuestions = [...answeredQuestionsOne, ...answeredQuestionsTwo]
    // console.log(answeredQuestionsOne, answeredQuestionsTwo)
    //   console.log(answeredQuestions)
      //console.log(questions['8xf0y6ziyjabvozdd253nd'].optionOne.votes[0] === 'sarahedo')
 //     const userentries = Object.entries(users[authedUser]).find(([key])=>key === "answers")[1];
//    const userAnsweredIds = Object.keys(userentries);

// //    const userkeys = Object.keys(users[authedUser])
// //    const uservalue = Object.values(users[authedUser])
// //    console.log('userentries' + JSON.stringify(userentries))
// //    console.log('userkeys' + JSON.stringify(userkeys))
// //    console.log('uservalue' + JSON.stringify(uservalue))
//  console.log('userAnsweredIds' + userAnsweredIds)

 return{
    questions : Object.values(questions).sort((a,b) => b.timestamp - a.timestamp),
    users,
    authedUser,

 }

}
export default connect(mapStateToProps)(Dashboard);