import React from 'react';

import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import FlipMove from 'react-flip-move';

import { Links } from '../api/links'; // setup links db collection

import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount() { // just after shown on screen
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links'); // why inside of tracker
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({
                links
            });
        });
    }
    componentWillUnmount() { // just before destruction
        this.linksTracker.stop();
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
    renderLinksListItems(){
        if(this.state.links.length === 0){
            return (
                <div className='item'>
                    <p className='item__status--message'>No Links Found</p>
                </div>
            );
        }
        return this.state.links.map(link => {
            const shortUrl = Meteor.absoluteUrl(link._id);

            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />;
        });
    }
}