import React from 'react';
import createMarkup from 'create-markup';

import { Link } from 'react-router-dom';

const firebase = require('firebase');

class Notes extends React.Component {
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            notes: null
        }
    }

    render() {
        const { notes } = this.state;

        if (notes) {
            return (
                <div className="notes-container">
                    {
                        notes.map((_note, _index) => {
                            return (
                                <div key={_index}>
                                    <div className='notes-header'>
                                        <div className="notes-title">
                                            <h2 onClick={() => this.selectNote(_note, _index)}><span>{_note.title}</span></h2>
                                        </div>
                                        <div className="notes-timestamp">
                                            {// timestamp
                                                (_note.timestamp) ? (
                                                    _note.timestamp.toDate().getDate() + '.' +
                                                    ((_note.timestamp.toDate().getMonth() < 10) ?
                                                        ('0' + _note.timestamp.toDate().getMonth()) :
                                                        (_note.timestamp.toDate().getMonth()))
                                                    + '.' +
                                                    _note.timestamp.toDate().getFullYear() + ', ' +
                                                    _note.timestamp.toDate().getHours() + ':' +
                                                    ((_note.timestamp.toDate().getMinutes() < 10) ?
                                                        ('0' + _note.timestamp.toDate().getMinutes()) :
                                                        (_note.timestamp.toDate().getMinutes()))
                                                ) : 'Loading...'
                                            }
                                        </div>
                                        <div className="notes-category">
                                            Category:
                                            <Link to={{
                                                pathname: './category',
                                                category: _note.category
                                            }}>
                                                {' ' + _note.category}
                                            </Link>
                                        </div>
                                    </div>


                                    <div dangerouslySetInnerHTML={createMarkup(_note.body)} />

                                    <button className="ui blue basic button"><Link to={{
                                        pathname: './editnote',
                                        id: _note.id,
                                        title: _note.title,
                                        category: _note.category,
                                        body: _note.body
                                    }}>Edit</Link></button>

                                    <button className="ui red basic button" onClick={() => {
                                        if (window.confirm('Are you sure you wish to delete this note?'))
                                            this.deleteNote(_note)
                                    }}>
                                        Delete
                                            </button>

                                    <div className="ui divider"></div>
                                </div>
                            );
                        })
                    }
                </div>
            );
        } else {
            return <div></div>;
        }
    }

    componentDidMount = () => {
        this._isMounted = true;
        firebase
            .firestore()
            .collection('notes')
            .orderBy("timestamp", "desc")
            .onSnapshot(serverUpdate => {
                const notes = serverUpdate.docs.map(_doc => {
                    const data = _doc.data();
                    data['id'] = _doc.id;
                    return data;
                });
                if (this._isMounted) {
                    this.setState({ notes: notes });
                }
            })
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    selectNote = (note, index) => {
        console.log('Selected note:' + note.title)
    }

    deleteNote = (note) => {
        firebase
            .firestore()
            .collection('notes')
            .doc(note.id)
            .delete()
    }
}

export default Notes;