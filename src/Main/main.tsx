/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/jquery/jquery.d.ts" />

import * as React from 'react';
import * as $ from 'jquery';
import {Timeline} from './timeline';
import {IEvent} from './models';

export interface IMainState {
    events: IEvent[]
}

export interface IMainProps {
    xcal: string
}

export class Main extends React.Component<IMainProps, IMainState> {

    state: IMainState = { events: [] };

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
                location: jq_vevent.find("location").text()
            };

            events.push(evt);
        })

        return events;
    }

    refresh() {
        $.ajax({
            url: this.props.xcal,
            type: 'GET',
            success: function(xml:string) {
                this.setState({ events: this.parse_xcal(xml) });
            }.bind(this)
        });
    }

    componentDidMount() {
        this.refresh();
    }

    render () {

        if (this.state != null && this.state.events != null) {
            return (<Timeline events={this.state.events} width={0.000075} height={100} ></Timeline>);
        } else {
            return (<div>Loading...</div>);
        }

    }
}
