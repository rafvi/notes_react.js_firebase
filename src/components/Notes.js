import React from 'react';
import createMarkup from 'create-markup';

import { Link } from 'react-router-dom';

const firebase = require('firebase');

class Notes extends React.Component {
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
                                            <h2 onClick={() => this.selectNote(_note, _index)}>{_note.title}</h2>
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
                                            Category: {_note.category}
                                        </div>
                                    </div>


                                    <div dangerouslySetInnerHTML={createMarkup(_note.body)} />

                                    <button class="ui blue basic button"><Link to={{
                                        pathname: './editnote',
                                        id: _note.id,
                                        title: _note.title,
                                        category: _note.category,
                                        body: _note.body
                                    }}>Edit</Link></button>

                                    <button class="ui red basic button" onClick={() => this.deleteNote(_note)}>Delete</button>

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
                this.setState({ notes: notes });
            })
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

    editNote = (id, note) => {
        firebase
            .firestore()
            .collection('notes')
            .doc(id)
            .update({
                title: note.title,
                body: note.body,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
    }
}

export default Notes;