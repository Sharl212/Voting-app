import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { login } from './javascripts/register&login';

class Login extends Component {
    render() {
        return (
            <Fragment>
                <div className='container'>
                    <form className='login col-6 createPollForm' onSubmit={login}>
                        <label htmlFor="exampleInputEmail1" className='col-12 header'>Sign in</label>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className='label col-12'>Username</label>
                            <input name="text" className="form-control" id="exampleInputUsername2" aria-describedby="emailHelp" placeholder="Enter username"  required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className='label col-12'>Password</label>
                            <input name="password" type="password" className="form-control" id="exampleInputPassword2" placeholder="Password" required/>
                        </div>
                        <div className="form-group form-check col-12">
                            <NavLink to='/register'>
                                <label className="form-check-label col-12" htmlFor="exampleCheck2">Not a member yet? Create a new account!</label>
                            </NavLink>
                        </div>
                        <button type="submit" className="btn btn-success col-12">Login</button>
                    </form>
                </div>
            </Fragment >
        )
    }
}

export { Login };