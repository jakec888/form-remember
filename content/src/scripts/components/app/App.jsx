import React, {Component} from 'react';
import {connect} from 'react-redux';

import {DropzoneDialog} from 'material-ui-dropzone';

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
    this.state = {
      open: false,
      files: [],
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.
    console.log('Saving files to state for further use and closing Modal');
    console.log(files);

    let reader = new FileReader();

    reader.onload = function (evt) {
      console.log('evt.target.result');
      console.log(evt.target.result);

      let data = new Map(JSON.parse(evt.target.result));
      console.log(data);

      // this.setState({
      //   files: files,
      //   open: false,
      // });

      console.log('done');
    };

    console.log('reader.readAsText(files[0])');
    console.log(reader.readAsText(files[0]));

    // let data = await new Map(JSON.parse(reader.readAsText(files[0])));

    // await console.log('data');
    // await console.log(data);

    // await this.setState({
    //   files: files,
    //   open: false,
    // });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
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
              open={this.state.open}
              onSave={files => {
                this.handleSave(files);
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

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(App);
