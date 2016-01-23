/// <reference path="../../typings/react/react.d.ts" />

import * as React from 'react';
import {IEvent} from './models';

export interface ITimelineState {}
export interface ITimelineProps {
    events: IEvent[];
    width: number;
    height: number;
}

export class Timeline extends React.Component<ITimelineProps, ITimelineState> {
    constructor () {
        super();
    }

    distinct<T>(arr: string[]) : {} {
        var seen = {};
        for (var i = 0; i < arr.length; i += 1) {
            if (!seen.hasOwnProperty(arr[i])) {
                seen[arr[i]] = 1;
            }
        }
        return seen;
    }

    render () {
        let locations = this.distinct(this.props.events.map(e => { return e.location; }));
        let locationIndex = Object.keys(locations) as string[];

        let minTime = Infinity;
        for (let i = 0; i < this.props.events.length; i++) {
            if (this.props.events[i].start < minTime) {
                minTime = this.props.events[i].start;
            }
        }

        let events = this.props.events.map(event => {
            let t = event.start - minTime;

            let style = {
                width: ((event.end - event.start) * this.props.width) + "px",
                height: this.props.height + "px",
                position: "absolute",
                left: t * this.props.width,
                top: locationIndex.indexOf(event.location) * this.props.height,
                outline: "solid 1px black",
                "text-align": "center"
            };
            locations[event.location]++;

            return <div style={style} key={event.uid}>{event.name}</div>
        });

        let locationLabels = locationIndex.map(loc => {
            let style = {
                width: this.props.width + "px",
                height: this.props.height + "px",
                position: "absolute",
                left: 0,
                top: locationIndex.indexOf(loc) * this.props.height,
                outline: "solid 1px blue",
                "text-align": "center"
            };

            return <div style={style} key={loc}>{loc}</div>
        });

        for (let i = 0; i < locationLabels.length; i++) {
            events.push(locationLabels[i]);
        }

        return (<div>{events}</div>);
    }
}

interface ITimelineSeekState {}
interface ITimelineSeekProps {}

class TimelineSeek extends React.Component<ITimelineSeekProps, ITimelineSeekState> {
    constructor () {
        super();
    }

    render () {
        return (<div style={{
            width: "100%",
            height: "2em",
        }}>
            Hello timeline

        </div>);
    }
}
