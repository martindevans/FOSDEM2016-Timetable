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
            width: "1.1em",
            float: "left",
            background: "#" + this.props.label.color,
            "border-radius": "0.2em"
        };

        return (
            <div style={label_style} title={this.props.label.name} ></div>
        );
    }
}
