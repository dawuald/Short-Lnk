import React from 'react';
import { Meteor } from 'meteor/meteor';

import { Link } from 'react-router';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    render() {
        return (
            <div className='boxed-view'>
                <div className='boxed-view__box'>
                    <h1>Short Lnk</h1>
                    
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
                        <input ref="email" type="email" name="email" placeholder="Email" />
                        <input ref="password" type="password" name="password" placeholder="Password" />
                        <button className="button">Login</button>
                    </form>

                    <Link to="/signup">Create account</Link>
                </div>
            </div>
        );
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email},password,(err) => {
            if(err){
                this.setState({error: 'Unable to login. Check email and/or password'});
            } else {
                this.setState({error: ''});
            }
        });
    }
}