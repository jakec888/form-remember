import React, {Component} from 'react';
import {connect} from 'react-redux';

import {DropzoneDialog} from 'material-ui-dropzone';

import browser from 'webextension-polyfill';

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleOpen() {
    console.log('handleOpen');
    this.props.dispatch({
      type: 'OPEN_IMPORT_JSON',
    });
  }

  handleClose() {
    console.log('handleClose');
    this.props.dispatch({
      type: 'CLOSE_IMPORT_JSON',
    });
  }

  async saveFile(data) {
    console.log('saveFile:');
    console.log(data);

    console.log('browser');
    console.log(browser);

    console.log('tabs');
    const tabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    });
    await console.log(tabs);

    await console.log('sending message');
    await browser.tabs.sendMessage(tabs[0].id, {
      command: 'IMPORT_JSON_FROM_CONTENT',
      data,
    });
    await console.log('message received');
  }

  handleSave(event, saveFile) {
    console.log('handleSave');

    let file = event[0];

    let reader = new FileReader();

    reader.onload = function (evt) {
      console.log('evt.target.result');
      console.log(evt.target.result);

      console.log('reader.result');
      console.log(reader.result);

      console.log('saving');
      saveFile(reader.result);
    };

    reader.readAsText(file);

    // this.handleClose();
  }

  render() {
    return (
      <DropzoneDialog
        open={this.props.importing}
        onSave={event => {
          this.handleSave(event, this.saveFile);
        }}
        acceptedFiles={['application/json']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => this.handleClose()}
      />
    );
  }
}

const mapStateToProps = state => ({
  importing: state.Main.importing,
});

export default connect(mapStateToProps)(App);
