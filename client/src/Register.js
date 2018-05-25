import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { register } from './javascripts/register&login';

class Register extends Component {
    render() {
        return (
            <Fragment>
                <div className='container'>
                    <form className='register col-6 createPollForm' onSubmit={register}>
                        <label htmlFor="exampleInputEmail1" className='col-12 header'>Create a new account</label>
                        <hr />
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className='label col-12'>Username</label>
                            <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" placeholder="Create username" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1" className='label col-12'>Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Create password" required/>
                        </div>
                        <div className="form-group form-check col-12">
                            <NavLink to='/'>
                                <label className="form-check-label col-12" htmlFor="exampleCheck2">Already a member? sign in!</label>
                            </NavLink>
                        </div>
                        <button type="submit" className="btn btn-primary col-12">Register</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export { Register };