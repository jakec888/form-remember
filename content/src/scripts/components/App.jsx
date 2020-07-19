import React, {Component} from 'react';
import {connect} from 'react-redux';

import {DropzoneDialog} from 'material-ui-dropzone';

import browser from 'webextension-polyfill';

import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  Grid,
  // CardContent,
  // Box,
  Typography,
  // TextField,
  Button,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#45b3e7',
    },
    secondary: {
      main: '#e77945',
    },
  },
});

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

    // localStorage.setItem('FormAutomation', result);
  }

  // handleSave(event) {
  //   console.log('handleSave');

  handleSave(event, saveFile) {
    console.log('handleSave');
    console.log(saveFile);

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

    this.handleClose();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Grid
            container
            direction="column"
            style={{padding: 13}}
            // backgroundColor="main"
          >
            <Button
              onClick={() => {
                this.handleOpen();
              }}>
              Add
            </Button>

            <DropzoneDialog
              open={this.props.importing}
              onSave={event => {
                // this.handleSave(event, this.saveFile);
                this.handleSave(event, this.saveFile);
              }}
              acceptedFiles={['application/json']}
              showPreviews={true}
              maxFileSize={5000000}
              onClose={() => this.handleClose()}
            />
            <Typography variant="h1" color="secondary" gutterBottom>
              Input Here!
            </Typography>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Main.data,
  importing: state.Main.importing,
});

export default connect(mapStateToProps)(App);
