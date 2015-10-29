/// <reference path="../../typings/react/react.d.ts" />

import * as React from 'react';
import {IIssue, ILabel} from './models';
import {Label} from './label';

export interface IIssueState {}

export interface IIssueProps {
    issue: IIssue;
}

export class Issue extends React.Component<IIssueProps, IIssueState> {
    constructor () {
        super();
    }

    render () {
        let style = {
            width: "calc(100% - 5px)",
            height: "calc(100% - 5px)",
            margin: "2px",
            border: "black solid 2px",
            "border-radius": "6px",
            "text-align": "center",
            "text-overflow": "ellipsis",
            overflow: "hidden",
            "white-space": "nowrap"
        };

        let labels = this.props.issue.labels.map(label => {
            return (<Label label={label} />);
        });

        return (
            <div style={style} >
              {this.props.issue.title}
              {labels}
            </div>
        );
    }
}
