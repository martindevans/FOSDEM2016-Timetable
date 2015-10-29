/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import * as React from 'react';
import * as $ from 'jquery';
import {IIssue, ILabel} from './models';
import {Issue} from './issue';

//If you have cloned from the repo this file will not exist. Create a file called token.tsx which exports a field called 'githubToken' containing a github access token
//Hack until oauth login is implemented
import {githubToken} from './token';

export interface IMainState {
    issues?: IIssue[];
}

export interface IMainProps {
    user: string,
    repo: string
}

export class Main extends React.Component<IMainProps, IMainState> {

    state: IMainState = { issues: [] };

    constructor () {
        super();
    }

    refresh() {
        $.ajax({
            url: `https://api.github.com/repos/martindevans/Heist/issues`,
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', "BASIC " + btoa("martindevans:" + githubToken));
            },
            success: function(results: IIssue[]) {
                this.setState({
                    issues: results
                });
            }.bind(this)
        });
    }

    componentDidMount() {
        this.refresh();
    }

    render () {
        let issues = this.state.issues.map(issue => {
            let style = {
                width: "150px",
                height: "50px",
                float: "left",
            };

            return <div style={style}><Issue issue={issue} ></Issue></div>
        });
        return (<div>
            {issues}
        </div>);
    }
}
