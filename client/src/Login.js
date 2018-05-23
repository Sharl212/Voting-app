import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { login } from './javascripts/register&login';
import { pollsRequest } from './javascripts/polls_request';

class Login extends Component {
    render() {
        return (
            <Fragment>
                <div className='container'>
                    <form className='login col-6' onSubmit={login}>
                        <label for="exampleInputEmail1" className='col-12 header'>Login</label>
                        <hr />
                        <div className="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input name="text" className="form-control" id="exampleInputUsername2" aria-describedby="emailHelp" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input name="password" type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" />
                        </div>
                        <div className="form-group form-check">
                            <NavLink to='/register'>
                                <label className="form-check-label" for="exampleCheck2">Create an account for FREE!</label>
                            </NavLink>
                        </div>
                        <button type="submit" className="btn btn-success">Login</button>
                    </form>
                </div>
            </Fragment >
        )
    }
}

export { Login };