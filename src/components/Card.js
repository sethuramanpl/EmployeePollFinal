import React from 'react'
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Card = ({question, author}) => {
    const navigate = useNavigate();

    const clickhandle = (e) => {
        e.preventDefault();
        console.log(question.id)
        navigate(`/questions/${question.id}`)
    }
  return (
    <Link to={`/questions/${question.id}`} className="card-container">
            <div className="card">
              <h3>{author.name}</h3>
              {new Date(question.timestamp).toDateString()}
              <button onClick={clickhandle}><p className="underline underline-offset-4">Show</p></button>
            </div>
    </Link>
  )
}

export default connect()(Card);
