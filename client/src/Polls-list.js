import React, { Component, Fragment } from 'react';

import $ from 'jquery';
import { render } from '.';

class PollsList extends Component {
    constructor() {
        super();

        this.state = {
            polls: [],
            polls_list: [],
            votedFor: [],
            polls_ids: [],
            currentID: []
        }

        this.fetchPolls = this.fetchPolls.bind(this); // to access `this` keyword inside `fetchPolls`
        this.newPoll = this.newPoll.bind(this); // to access `this` keyword inside `newPoll`
        this.newVote = this.newVote.bind(this); // to access `this` keyword inside `change`
        this.uniqueID = this.uniqueID.bind(this); // to access `this` keyword inside `change`
        this.change = this.change.bind(this); // to access `this` keyword inside `change`
    }
    componentDidMount() {
        $.ajax({
            url: "/mypolls",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: (polls_list) => {
                this.fetchPolls(polls_list);
            },
            error: (err, status, xhr) => {
                console.log(err);
            }
        });
    }

    fetchPolls(polls_list) {
        for (let i = 0; i < polls_list.length; i++) {
            let data = polls_list[i];
            // let id = polls_list[i]._id;

            this.setState({ polls: this.state.polls.concat(data) });
        }
    }

    newPoll(e) {
        e.preventDefault();
        $.ajax({
            url: "/polls",
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                option1: $('#option1').val(),
                option2: $('#option2').val()
            }),
            success: function (user) {
                console.log(user);
                window.location.reload();
            },
            error: function (err, status, xhr) {
                console.log(err);
            }
        });
    };

    newVote(e) {
        e.preventDefault();
        let id = this.state.currentID;

        console.log('new vote', this.state.votedFor)
        console.log(id);
        $.ajax({
            url: "/voting/" + id,
            type: 'patch',
            contentType: 'application/json',
            data: JSON.stringify({ selectedOption: this.state.votedFor }),
            success: function () {
                window.location.reload();
                // render();
            },
            error: function (err, status, xhr) {
                console.error(err);
            }
        });
    }

    uniqueID(e) {
        this.state.currentID = []; //clean up
        this.setState({currentID: e.target.value});
        console.log(e.target.value);
    }

    change(e){
        this.state.votedFor = []; //clean up
        this.setState({votedFor: e.target.value});
        console.log(e.target.value);
    }

    render() {

        return (
            <Fragment>
                <form onSubmit={this.newPoll} className='col-6 createPollForm'>
                    <div className='row'>
                        <h1 className='createAnewPoll col-12'> Create a new poll </h1>
                        <div className="form-group col-12">
                            <label for="exampleInputEmail1" className='col-12 label'>Option 1</label>
                            <input type='text' class="form-control col-12" id='option1' aria-describedby="emailHelp" placeholder="Ex: Sea food" required autoComplete='off' />
                        </div>
                        <div className="form-group col-12">
                            <label for="exampleInputPassword1" className='col-12 label'>Option 2</label>
                            <input type="text" className="form-control col-12" id='option2' placeholder="Ex: Chinese food" />
                        </div>
                        <div className="form-group col-12">
                            <button type="submit" className="btn btn-warning col-12">ADD</button>
                            <figure className='row'>
                                <small className='createAnewPoll col-12'>You must be logged in to perform this action.</small>
                            </figure>
                        </div>
                    </div>
                </form>

                <form onSubmit={this.newVote} className='col-12'>
                    <ul className="list-group col-12" id='polls_list'>
                        <li className="list-group-item active">Which one deserve the highest score? Select one of the two options.</li>
                        {this.state.polls.map((polls) => {

                            return (
                                <Fragment>
                                    <br/>
                                    <select className="custom-select list" size="2">
                                        <option className="list-group-item" name='option1' value='option1' onClick={this.change}>
                                            {polls.poll[0].option1} {polls.poll[0].voteCounterOpt1}
                                        </option>
                                        <option className="list-group-item" name='option2' value='option2' onClick={this.change}>
                                            {polls.poll[0].option2} {polls.poll[0].voteCounterOpt2}
                                        </option>
                                    </select>
                                    <button className='btn btn-success vote' value={polls._id} onClick={this.uniqueID} type='submit'>Vote</button>
                                </Fragment>
                            );
                        })}
                    </ul>
                </form>

            </Fragment>
        )
    }
}

export { PollsList };