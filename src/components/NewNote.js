import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, { modules, formats } from '../EditorToolbar';

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
        <div class="ui input">
          <input
            type="text"
            placeholder="enter note title"
            onKeyUp={(e) => this.updateTitle(e.target.value)}
          />
        </div>
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
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
    this.props.history.push('/notes');
  }

  cancelBtnClick = () => {
    console.log('cancel button click')
    this.props.history.push('/notes');
  }
}

export default NewNote;