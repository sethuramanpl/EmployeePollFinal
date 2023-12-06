import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = ({children, userLoggedIn}) => {
    const redirectUrl = window.location.href.toString().split(window.location.host)[1];

    return userLoggedIn ? children : <Navigate to={`/login?redirectTo=${redirectUrl}`}/>;
};

const mapStateToProps = ({authedUser}) => ({
    userLoggedIn: !!authedUser
});

export default connect(mapStateToProps)(PrivateRoute);
