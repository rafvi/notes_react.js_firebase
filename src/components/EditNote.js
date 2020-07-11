import React from 'react';
import ReactQuill from 'react-quill';

const firebase = require('firebase');

class EditNote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.location.id,
            title: this.props.location.title,
            category: this.props.location.category,
            body: this.props.location.body
        }
    }

    render() {
        return (
            <div>
                <div className="newnote-editnote-header">
                    <div class="ui input">
                        <input
                            type="text"
                            placeholder="enter note title"
                            value={this.state.title}
                            onChange={(e) => this.updateTitle(e.target.value)}
                        />
                    </div>
                    <div class="ui input">
                        <input
                            type="text"
                            placeholder="enter note category"
                            value={this.state.category}
                            onChange={(e) => this.updateCategory(e.target.value)}
                        />
                    </div>
                </div>

                <ReactQuill
                    value={this.state.body}
                    onChange={this.updateBody}>
                </ReactQuill>
                <button className="ui green basic button"
                    onClick={this.updateNoteBtnClick}>Update Note
                </button>
                <button className="ui orange basic button"
                    onClick={this.cancelBtnClick}>Cancel
                </button>
            </div>
        )
    }

    updateTitle = (e) => {
        this.setState({ title: e })
        console.log(this.state.title)
    }

    updateCategory = (e) => {
        this.setState({ category: e })
        console.log(this.state.category)
    }

    updateBody = async (value) => {
        await this.setState({ body: value })
    }

    updateNoteBtnClick = async () => {
        console.log('new note button click')
        // ***Add new note to firebase-Database ***
        firebase
            .firestore()
            .collection('notes')
            .doc(this.state.id)
            .update({
                title: this.state.title,
                body: this.state.body,
                category: this.state.category,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        // *** Return to main page with notes - './' ***
        this.props.history.push('/notes');
    }

    cancelBtnClick = () => {
        console.log('cancel button click')
        this.props.history.push('/notes');
    }
}

export default EditNote;