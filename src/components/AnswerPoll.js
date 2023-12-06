import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';
import Error from './Error';

const AnswerPoll = (props) => {



  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    // The useEffect code remains the same
    // ...

    // It might depend on what you want to achieve with useEffect
  }, [updateTrigger, /* other dependencies */]);

  const navigate = useNavigate();

  const { authedUser, question, author, dispatch, users } = props;

  if (!authedUser || !question || !author) {
    console.log('authed user, question, author in inside check', authedUser, question, author);
    return <Navigate to="/Error" />;
  } else {
    console.log('authed user, question, author in component', authedUser, question, author);
  }

  const checkForVoting = () => {
    const hasVotedForOptionOne = question?.optionOne.votes.includes(authedUser);
    const hasVotedForOptionTwo = question?.optionTwo.votes.includes(authedUser);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    return { hasVotedForOptionOne, hasVotedForOptionTwo, hasVoted };
  };

  const handleOptionOne = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(question.id);
    dispatch(handleAddAnswer(question.id, 'optionOne'));
    console.log('dispatch done');
    //setUpdateTrigger((prev) => !prev); // Toggle the state to trigger a re-render
    navigate("/")
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    dispatch(handleAddAnswer(question.id, 'optionTwo'));
    //setUpdateTrigger((prev) => !prev);
    navigate("/")
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case 'optionOne':
        return (question.optionOne.votes.length / numberVotesTotal) * 100 + ' %';
      case 'optionTwo':
        return (question.optionTwo.votes.length / numberVotesTotal) * 100 + ' %';
      default:
        return '';
    }
  };



  return (
    <div>
      {/* Your component rendering logic */}
      Poll by {question.author} <br />
      <img src={author.avatarURL} alt="Profile" />
      <br />
      asking:
      <br />
      Would you rather: <br />
      <button
        onClick={handleOptionOne}
        disabled={checkForVoting().hasVoted}
        className={
          'p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition ' +
          (checkForVoting().hasVotedForOptionOne ? 'bg-lime-400' : '')
        }
      >
        <div className={checkForVoting().hasVotedForOptionOne ? 'chosen' : ''}>
          <p className="font-bold mb-2">{question.optionOne.text}</p>
          {!checkForVoting().hasVoted && <p className="underline underline-offset-4 mb-3">Click</p>}
          {checkForVoting().hasVoted && (
            <p className="text-xs">
              Votes: {question.optionOne.votes.length} ({calcPercentage('optionOne', question)})
            </p>
          )}
        </div>
      </button>

      <button
        onClick={handleOptionTwo}
        disabled={checkForVoting().hasVoted}
        className={
          'p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition ' +
          (checkForVoting().hasVotedForOptionTwo ? 'bg-lime-400' : '')
        }
      >
        <p className="font-bold mb-2">{question.optionTwo.text}</p>
        {!checkForVoting().hasVoted && <p className="underline underline-offset-4 mb-3">Click</p>}
        {checkForVoting().hasVoted && (
          <p className="text-xs">
            Votes: {question.optionTwo.votes.length} ({calcPercentage('optionTwo', question)})
          </p>
        )}
      </button>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
    try {
  const currentQuestion = Object.values(questions).find((q) => q.id === useParams().id);
  const author = Object.values(users).find((user) => user.id === currentQuestion.author);

  return {
    users,
    authedUser,
    question: currentQuestion,
    author,
  };
    } catch (e) {
        return <Navigate to="/Error"/>;
        // throw new Error(`Question or user is not found.\n ${e}`);
    }
};

export default connect(mapStateToProps)(AnswerPoll);
