import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            err: '',
            url: '',
            isOpen: false
        };
    }
    onSubmit(e) {
        e.preventDefault();
        const { url } = this.state;

        Meteor.call('links.insert', url, (err) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({error: err.reason});
            }
        });
    }
    onChange(e) {
        this.setState({
            url: e.target.value
        });
    }
    handleModalClose(){
        this.setState({ 
            isOpen: false, 
            url: '',
            error: ''
        });
    }
    render() {
        return (
            <div>
                <button className='button' onClick={() => this.setState({ isOpen: true })}>+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    contentLabel='Add link'
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className='boxed-view__box'
                    overlayClassName='boxed-view boxed-view--modal'>
                    <h1>Add Links</h1>
                    {this.state.error ? this.state.error : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} className='boxed-view__form'>
                        <input
                            type="text"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)} 
                            ref="url"/>
                        <button className='button'>Add Link</button>
                        {/*type="button" causes the button NOT to submit the form*/}
                        <button type="button" className='button button--secondary' onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}