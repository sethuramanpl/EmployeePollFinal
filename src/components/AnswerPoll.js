import React from 'react'
import { connect } from "react-redux";
import { Navigate, useParams } from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';
import { useNavigate } from 'react-router-dom';
import Error from './Error';

const AnswerPoll = (props) => {

    let navigate = useNavigate();

    const { authedUser, question, author, dispatch} = props

    if (!authedUser || !question || !author) {
        return <Navigate to="/Error"/>;
    }

    const hasVotedForOptionOne  = question.optionOne.votes.includes(authedUser)
    const hasVotedForOptionTwo  = question.optionTwo.votes.includes(authedUser)
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo

    const handleOptionOne = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionOne"));
        navigate("/home");
    };

    const handleOptionTwo = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionTwo"));
        navigate("/home");
    };

    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + " %";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + " %";
            default:
                return "";
        }
    };

  return (
    <div>

        Poll by {question.author} <br></br>
        <img src={author.avatarURL} alt="Profile" />
        <br></br>
        asking:
        <br />
        Would you rather: <br></br>
        <button onClick={handleOptionOne} disabled={hasVoted}
                        className={"p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " + (hasVotedForOptionOne ? "bg-lime-400" : "")}>
                    <div className={hasVotedForOptionOne ? "chosen" : ""}>
                        <p className="font-bold mb-2">{question.optionOne.text}</p>
                        {!hasVoted &&
                        <p className="underline underline-offset-4 mb-3">Click</p>
                        }
                        {hasVoted &&
                        <p className="text-xs">Votes: {question.optionOne.votes.length} ({calcPercentage("optionOne", question)})</p>
                        }
                    </div>
                </button>

                <button onClick={handleOptionTwo} disabled={hasVoted}
                        className={"p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " + (hasVotedForOptionTwo ? "bg-lime-400" : "")}>
                    <p className="font-bold mb-2">{question.optionTwo.text}</p>
                    {!hasVoted &&
                    <p className="underline underline-offset-4 mb-3">Click</p>
                    }
                    {hasVoted &&
                    <p className="text-xs">Votes: {question.optionTwo.votes.length} ({calcPercentage("optionTwo", question)})</p>
                    }
                </button>

    </div>
  )
}

const mapStateToProps = ({questions, users,authedUser}) => {
    try{
        const question = Object.values(questions).find((question)=>question.id === useParams().id);
        const author = Object.values(users).find((user)=>user.id === question.author)
        console.log('thisis the question' + JSON.stringify(question));
        console.log('thisis the author' + JSON.stringify(author));
        console.log(question.optionTwo.votes.includes(authedUser))
        return{
            questions,
            users,
            authedUser,
            question,
            author,
        };
    }catch(e){
        return <Navigate to="/Error" />
    }



}
export default connect(mapStateToProps)(AnswerPoll);