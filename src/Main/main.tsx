/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import * as React from 'react';
import * as $ from 'jquery';
import {Timeline} from './timeline';
import {IEvent} from './models';

export interface IMainState {
    events: IEvent[],
    attendance: { string: boolean }
}

export interface IMainProps {
    xcal: string
}

export class Main extends React.Component<IMainProps, IMainState> {

    state: IMainState = {
        events: [],
        attendance: {} as {string: boolean}
    };

    constructor () {
        super();
    }

    parse_xcal(xml : string) : IEvent[] {
        let parsed = $($.parseXML(xml));

        let events : IEvent[] = [];
        parsed.find("vevent").each(function(index, vevent) {
            var jq_vevent = $(vevent);
            let evt : IEvent = {
                uid: jq_vevent.find("uid").text(),
                start: Date.parse(jq_vevent.find("start").text()),
                end: Date.parse(jq_vevent.find("end").text()),
                name: jq_vevent.find("title").text(),
                url: jq_vevent.find("url").text(),
                location: jq_vevent.find("location").text(),
                description: jq_vevent.find("description").text()
            };

            events.push(evt);
        })

        return events;
    }

    refresh() {
        this.setState({
            events: this.state.events,
            attendance: JSON.parse(localStorage.getItem("event-attendance") || "{}")
        });

        $.ajax({
            url: this.props.xcal,
            type: 'GET',
            success: function(xml:string) {
                this.setState({ events: this.parse_xcal(xml), attendance: this.state.attendance });
            }.bind(this)
        });
    }

    componentDidMount() {
        this.refresh();
    }

    render () {

        if (this.state != null && this.state.events != null) {
            return (<Timeline events={this.state.events} width={0.000085} height={100} attendance={this.state.attendance} ></Timeline>);
        } else {
            return (<div>Loading...</div>);
        }

    }
}
