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
            width: "150px",
            height: "150px",
            float: "left",
        };

        let labels = this.props.issue.labels.map(label => {
            return (<Label label={label} />);
        });

        return (
            <div style={style} >
              <span> {this.props.issue.title} </span>
              {labels}
            </div>
        );
    }
}
