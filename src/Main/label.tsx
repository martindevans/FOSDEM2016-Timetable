/// <reference path="../../typings/react/react.d.ts" />

import * as React from 'react';
import {ILabel} from './models';

export interface ILabelState {}

export interface ILabelProps {
    label: ILabel;
}

export class Label extends React.Component<ILabelProps, ILabelState> {
    constructor () {
        super();
    }

    render () {
        let label_style = {
            height: "1.1em",
            float: "left",
            background: "#" + this.props.label.color,
            "max-width": "100%",
            "text-overflow": "ellipsis"
        };

        return (
            <div style={label_style} >
              <span><a href={this.props.label.url}>{this.props.label.name}</a></span>
            </div>
        );
    }
}
