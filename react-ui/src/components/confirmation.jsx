import React from 'react';
import './confirmation.css';
import { Link } from 'react-router-dom';


class confirmation extends React.Component {
    ToGoogle = event => {
        window.location.href ='https://mail.google.com/a/ryerson.ca';
    };
    render() { 
        return (
            <div className = "container-fluid confirmation-div">
                <h1 className="display-1">
                    Thanks for joining us!
                </h1>
                <div className = "inner-div">
                    <h4>
                        <Link to='/'>Go Back to Login</Link>
                    </h4>
                    <br/>
                </div>
            </div>
        );
    }
}
 
export default confirmation;