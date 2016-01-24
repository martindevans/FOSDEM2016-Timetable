/// <reference path="../../typings/react/react.d.ts" />

import * as React from 'react';
import {IEvent} from './models';

export interface IEventState {}
export interface IEventProps { event: IEvent, top: number, height: number, pixelsPerMs: number, minTime: number, onClick: any, attend?: boolean, key: string }

export class Event extends React.Component<IEventProps, IEventState> {
    constructor () {
        super();
    }

    render () {
        let t = this.props.event.start - this.props.minTime;

        let style = {
            width: ((this.props.event.end - this.props.event.start) * this.props.pixelsPerMs) + "px",
            height: this.props.height + "px",
            position: "absolute",
            left: t * this.props.pixelsPerMs,
            top: this.props.top,
            outline: "solid 1px black",
            textAlign: "center"
        };

        if (this.props.attend != null) {
            if (this.props.attend) {
                style["background"] = "yellowgreen";
            } else {
                style["background"] = "crimson";
            }
        }

        return <div style={style} key={this.props.event.uid} title={this.props.event.description} onClick={this.props.onClick}>{this.props.event.name}</div>
    }
}
