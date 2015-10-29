/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import * as React from 'react';
import * as $ from 'jquery';
import {IIssue, ILabel} from './models';
import {Issue} from './issue';
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
            return <Issue issue={issue} ></Issue>
        });
        return (<div>
            {issues}
        </div>);

        //var todoItems = this.state.todoList.map(item => {
        //    return <TodoItem key={item.key} item={item} onRemove={this.removeItem} ></TodoItem>;
        //});
        //return (
        //    <div>
        //        <div>
        //            <input type="text" placeholder="input new item" value={this.state.newItem.description} onChange={this.changeName} />
        //            <button onClick={this.addItem} >add</button>
        //        </div>
        //        <ul>{todoItems}</ul>
        //    </div>
        //);
    }
}
