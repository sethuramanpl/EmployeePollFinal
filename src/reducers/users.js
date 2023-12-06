import { ADD_QUESTION_USER, RECEIVE_USERS,ADD_ANSWER_USER } from "../actions/users";

export default function users(state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return{
                ...state,
                ...action.users
            }
        case ADD_QUESTION_USER:
            return{
                ...state,
                [action.author]:{
                    ...state[action.author], questions: state[action.author].questions.concat(action.qid)
                }

            }
        case ADD_ANSWER_USER:
            console.log('add answer user reducer' + JSON.stringify(action))
            return{
                ...state,
                [action.authedUser]:{
                    ...state[action.authedUser],answers: {...state[action.authedUser].answers, [action.qid]: action.answer}
                }
            }
        default:
            return state;
    }
}