import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { register } from './javascripts/register&login';

class Register extends Component {
    render() {
        return (
            <Fragment>
                <div className='container'>
                    <form className='register col-6' onSubmit={register}>
                        <label for="exampleInputEmail1" className='col-12 header'>Register</label>
                        <hr />
                        <div className="form-group">
                            <label for="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" placeholder="Create username" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Create password" />
                        </div>
                        <div className="form-group form-check">
                            <NavLink to='/'>
                                <label className="form-check-label" for="exampleCheck2">Already a user? sign in</label>
                            </NavLink>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export { Register };