import { _getUsers } from "./_DATA";
import { _getQuestions } from "./_DATA";
import { _saveQuestion } from "./_DATA";
import { _saveQuestionAnswer } from "./_DATA";

export function getInitialData(){
    return Promise.all([
        _getUsers(),
        _getQuestions(),
    ]).then(([users, questions])=>({
        users,
        questions
    }))
}

export function saveQuestion(optionOneText, optionTwoText, author){
    return _saveQuestion({optionOneText, optionTwoText, author})
}

export function saveQuestionAnswer(authedUser, qid, answer){
    return _saveQuestionAnswer({ authedUser, qid, answer })
}