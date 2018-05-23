import React, { Component, Fragment } from 'react';
import $ from 'jquery';

import { pollsRequest } from './javascripts/polls_request';


class PollsList extends Component {
    constructor() {
        super();
        this.state = {
            polls: []
        }

        this.fetchPolls = this.fetchPolls.bind(this); // to access `this` keyword inside `fetchPolls`
    }
    componentDidMount() {
        $.ajax({
            url: "/mypolls",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: (polls_list) => this.fetchPolls(polls_list),
            error: (err, status, xhr) => {
                console.log(err);
            }
        });
    }

    fetchPolls(polls_list) {
        for (let i = 0; i < polls_list.length; i++) {
            let data = polls_list[i].poll[0];
            console.log(data);
            // this.setState({ polls: data });
            document.getElementById("polls_list").innerHTML += `<li class="list-group-item">${data.option1} or ${data.option2}</li>`;
        }
    }

    render() {
        return (
            <div className='container'>
                <div class='row'>
                    <ul class="list-group col-12" id='polls_list'>
                        <li class="list-group-item active">Vote for one!</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export { PollsList };