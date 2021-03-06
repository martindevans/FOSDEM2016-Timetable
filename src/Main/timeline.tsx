/// <reference path="../../typings/react/react.d.ts" />

import * as React from 'react';
import {IEvent} from './models';
import {Event} from './event';

export interface ITimelineState {}
export interface ITimelineProps {

    //events to render
    events: IEvent[];

    //width (in pixels) per millisecond
    width: number;

    //height of a row
    height: number;

    //uids of events to attend
    attendance: { string: boolean };
}

export class Timeline extends React.Component<ITimelineProps, ITimelineState> {
    constructor () {
        super();
    }

    distinct<T>(arr: string[]) : {} {
        var seen = {} as {string: number};
        for (var i = 0; i < arr.length; i += 1) {
            if (!seen.hasOwnProperty(arr[i])) {
                seen[arr[i]] = 1;
            }
        }
        return seen;
    }

    render () {
		let hide = window.location.search.slice(1) == "hide";
		
		var visible_events : IEvent[] = [];
		for (var index in this.props.events) {
			let evt = this.props.events[index];
			if (this.props.attendance[evt.uid] as boolean || !hide) {
				visible_events.push(evt);
			}
		}
	
        let locations = this.distinct(visible_events.map(e => { return e.location; }));
        let locationIndex = Object.keys(locations) as string[];

        let minTime = Infinity;
        for (let i = 0; i < visible_events.length; i++) {
            if (visible_events[i].start < minTime) {
                minTime = visible_events[i].start;
            }
        }
        minTime = Math.max(minTime, new Date().getTime());

        let events = visible_events.map(event => {

            let self = this;
            let click = function(evt : any) {

                if (self.props.attendance.hasOwnProperty(event.uid)) {
                    self.props.attendance[event.uid] = !self.props.attendance[event.uid] as boolean;
                } else {
                    self.props.attendance[event.uid] = true;
                }

                //Trigger redraw
                self.setState({} as ITimelineState);
                localStorage.setItem("event-attendance", JSON.stringify(self.props.attendance));
            }

            let top = locationIndex.indexOf(event.location) * this.props.height;
            return <Event
                event={event}
                top={top}
                height={this.props.height}
                minTime={minTime}
                pixelsPerMs={this.props.width}
                onClick={click}
                key={event.uid}
                attend={this.props.attendance[event.uid] as boolean}
            />
        });

        let locationLabels = locationIndex.map(loc => {
            let style = {
                width: this.props.width + "px",
                height: this.props.height + "px",
                position: "absolute",
                left: 0,
                top: locationIndex.indexOf(loc) * this.props.height,
                outline: "solid 1px blue",
                textAlign: "center"
            };

            return <div style={style} key={loc}>{loc}</div>
        });

        for (let i = 0; i < locationLabels.length; i++) {
            events.push(locationLabels[i]);
        }

        return (<div>{events}</div>);
    }
}
