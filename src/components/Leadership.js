import React from 'react'
import { connect } from "react-redux";

const Leadership = (props) => {
  return (

    <table>
    <thead>
      <tr>
        <th>Users</th>
        <th>Answered</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      {props.sortedUsers.map((user) => (
        <tr key={user.id}>
          <td>{user.name}<br></br>{user.id}</td>
          <td>{user.numAnswers}</td>
          <td>{user.numQuestions}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

const mapStateToProps = ({users}) => {
    //const userNames = Object.keys(users).sort((a,b)=>users[b].questions.length - users[a].questions.length);

    const usersWithStats = Object.values(users).map((user)=>({
        ...user,
        numAnswers: Object.keys(user.answers).length,
        numQuestions:user.questions.length
    }));
    // Sort users by the number of answers in descending order
  const sortedUsers = usersWithStats.sort((a, b) => b.numAnswers - a.numAnswers);


    console.log('i am here' + JSON.stringify(usersWithStats))
    console.log('sorted users' + JSON.stringify(sortedUsers))
    return{
        //userNames,
        usersWithStats,
        sortedUsers
    }

}
export default connect(mapStateToProps)(Leadership)
//export default Leadership