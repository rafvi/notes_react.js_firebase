import React from 'react';
import ReactQuill from 'react-quill';

const firebase = require('firebase');

class NewNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Enter note title"
          onKeyUp={(e) => this.updateTitle(e.target.value)}
        />
        <ReactQuill
          value={this.state.body}
          onChange={this.updateBody}>
        </ReactQuill>
        <button className="ui blue basic button"
          onClick={this.newNoteBtnClick}
        >
          New Note
        </button>
        <button className="ui orange basic button"
          onClick={this.cancelBtnClick}
        >
          Cancel
        </button>
      </div>
    )
  }

  updateTitle = (e) => {
    this.setState({ title: e })
    console.log(this.state.title)
  }

  updateBody = async (value) => {
    await this.setState({ body: value })
    console.log(this.state.body)
  }

  newNoteBtnClick = async () => {
    console.log('new note button click')
    // ***Add new note to firebase-Database ***
    firebase
      .firestore()
      .collection('notes')
      .add({
        title: this.state.title,
        body: this.state.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    // *** Return to main page with notes - './' ***
    this.props.history.push('/');
  }

  cancelBtnClick = () => {
    console.log('cancel button click')
    this.props.history.push('/');
  }
}

export default NewNote;