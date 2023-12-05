import { saveQuestion, saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading-bar"
import { addQuestionUser, addAnswerUser } from "./users"


export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const ADD_QUESTION = "ADD_QUESTION"
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION"

export function receiveQuestions(questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function addQuestion(question){
    return{
        type:ADD_QUESTION,
        question
    }
}

function addAnswerQuestion(authedUser, qid, answer){
    return{
        type: ADD_ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleAddQuestion(firstOption, secondOption) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        return saveQuestion(firstOption, secondOption, authedUser)
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(addQuestionUser(question))
            })
    };
}

export function handleAddAnswer(qid, answer){
    return(dispatch, getState) => {
        const { authedUser } = getState();
            return saveQuestionAnswer(authedUser, qid, answer).then(()=>{
                dispatch(addAnswerQuestion(authedUser, qid, answer));
                dispatch(addAnswerUser(authedUser,qid,answer));
            })
        }
    }