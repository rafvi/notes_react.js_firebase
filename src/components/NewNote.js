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
      body: '',
      category: ''
    }
  }

  render() {
    return (
      <div>
        <div className="newnote-editnote-header">
          <div className="ui input">
            <input
              type="text"
              placeholder="enter note title"
              onKeyUp={(e) => this.addTitle(e.target.value)}
            />
          </div>
          <div className="ui input">
            <input
              type="text"
              placeholder="enter note category"
              onKeyUp={(e) => this.addCategory(e.target.value)}
            />
          </div>
        </div>

        <EditorToolbar />
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={this.state.body}
          onChange={this.addBody}>
        </ReactQuill>
        <button className="ui green basic button"
          onClick={this.newNote}
        >
          New Note
        </button>
        <button className="ui orange basic button"
          onClick={this.cancelNewNote}
        >
          Cancel
        </button>
      </div>
    )
  }

  addTitle = (e) => {
    this.setState({ title: e })
    console.log(this.state.title)
  }

  addCategory = (e) => {
    this.setState({ category: e })
    console.log(this.state.category)
  }

  addBody = async (value) => {
    await this.setState({ body: value })
    console.log(this.state.body)
  }

  newNote = async () => {
    console.log('new note button click')
    // ***Add new note to firebase-Database ***
    firebase
      .firestore()
      .collection('notes')
      .add({
        title: this.state.title,
        body: this.state.body,
        category: this.state.category,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    // *** Return to main page with notes - './' ***
    this.props.history.push('/notes');
  }

  cancelNewNote = () => {
    console.log('cancel button click')
    this.props.history.push('/notes');
  }
}

export default NewNote;