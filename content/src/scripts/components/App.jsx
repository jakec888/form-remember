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
  }

  handleOpen() {
    console.log('handleOpen');
    console.log(this.props);
    this.props.dispatch({
      type: 'OPEN_IMPORT_JSON',
    });
  }

  handleClose() {
    console.log('handleClose');
    console.log(this.props);
    this.props.dispatch({
      type: 'CLOSE_IMPORT_JSON',
    });
  }

  async handleSave(event) {
    let file = event[0];

    let reader = new FileReader();

    reader.onload = function (evt) {
      let result = evt.target.result;

      localStorage.setItem('FormAutomation', result);
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
                this.handleSave(event);
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
