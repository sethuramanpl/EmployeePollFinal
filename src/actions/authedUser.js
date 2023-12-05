export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_OUT_AUTHED_USER = "LOGOUT_OUT_AUTHED_USER"

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logoutAuthedUser(){
  return{
    type: LOGOUT_OUT_AUTHED_USER,
  }
}

export function handleLogout (){
  return(dispatch) => {
    return dispatch(logoutAuthedUser());
  }
}
