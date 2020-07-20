import React, {Component} from 'react';
import {connect} from 'react-redux';

import browser from 'webextension-polyfill';

import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider,
  Grid,
  CardContent,
  Box,
  Typography,
  TextField,
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

  // on popup/extension open/click
  async componentDidMount() {
    // create 'FormAutomation' hashmap if not in local storage
    !localStorage.getItem('FormAutomation') &&
      localStorage.setItem(
        'FormAutomation',
        JSON.stringify(Array.from(new Map())),
      );

    // get 'FormAutomation' hashmap from storage
    let data = new Map(JSON.parse(localStorage.getItem('FormAutomation')));

    // get all visible form inputs from page
    let visibleTextInputs = await this.getAllVisibleTextInputs();

    // add visible form inputs that are not in the hashmap
    await Object.keys(visibleTextInputs).forEach(name => {
      // if data has a visible text input name, update visible input with the name's value
      data.has(name) && (visibleTextInputs[name] = data.get(name));
    });

    // if hashmap has the name's value, auto populate the form
    await this.postAllVisibleTextInputs(data, visibleTextInputs);

    // update redux with current page's empty text input
    await this.props.dispatch({
      type: 'GET_STORED_INPUTS',
      payload: {data, visibleTextInputs},
    });

    // render up
    window.scrollTo(0, 0);
  }

  // view all visible text inputs on the page
  async postAllVisibleTextInputs(data, visibleTextInputs) {
    // find current tab/window
    const tabs = await browser.tabs.query({currentWindow: true, active: true});

    // get current filled hashmap and insert values into the page's form
    await browser.tabs.sendMessage(tabs[0].id, {
      command: 'POST_ALL_VISIBLE_TEXT_INPUTS_NAME',
      data,
      visibleTextInputs,
    });
  }

  // view all visible text inputs on the page
  async getAllVisibleTextInputs() {
    // find current tab/window
    const tabs = await browser.tabs.query({currentWindow: true, active: true});

    // send message to the background to run command on the current window/tab
    let visibleTextInputs = await browser.tabs.sendMessage(tabs[0].id, {
      command: 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME',
    });

    return visibleTextInputs;
  }

  // handle input value for page's visible text input
  onHandleTextInputChange(event, key) {
    // create copy of the visible text input to avoid mutating state directly
    let updatedVisibleTextInputs = this.props.visibleTextInputs;

    // find the key in the hashmap and insert new value
    updatedVisibleTextInputs[key] = event.target.value;

    // update redux
    this.props.dispatch({
      type: 'UPDATE_VISIBLE_TEXT_INPUT',
      payload: {visibleTextInputs: updatedVisibleTextInputs},
    });
  }

  // submit all filled in values for visible text input and save to persistent memory
  async handleSubmission(event) {
    event.preventDefault();

    // add visible input values in the hashmap
    let updatedData = this.props.data;
    Object.keys(this.props.visibleTextInputs).forEach(name => {
      updatedData.set(name, this.props.visibleTextInputs[name]);
    });

    // auto populate form
    await this.postAllVisibleTextInputs(
      updatedData,
      this.props.visibleTextInputs,
    );

    // save updated hashmap to local storage
    localStorage.setItem(
      'FormAutomation',
      JSON.stringify(Array.from(updatedData)),
    );

    // close popup/extension
    window.close();
  }

  // export current hashmap as a json and delete local storage data
  exportToJSON() {
    // create a sudo element to store data
    const element = document.createElement('a');

    // create file
    const file = new Blob([JSON.stringify(Array.from(this.props.data))], {
      type: 'text/json',
    });

    // create downloadable url to file
    element.href = URL.createObjectURL(file);

    // create file name using current date and time
    element.download = `${new Date().toISOString()}.json`;

    // append element to document
    document.body.appendChild(element);

    // download element
    element.click();
  }

  // importJSON() {
  //   this.props.dispatch({
  //     type: 'OPEN_IMPORT_JSON',
  //   });
  // }

  // render visible text input
  renderVisibleInput(key, value, index) {
    return (
      <TextField
        fullWidth
        variant="outlined"
        color="secondary"
        margin="normal"
        id="email"
        name={key}
        label={`${key.charAt(0).toUpperCase()}${key.slice(1)}`}
        key={key}
        value={value}
        autoFocus={index === 0 ? true : false}
        onChange={event => {
          this.onHandleTextInputChange(event, key);
        }}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Grid container direction="column" style={{padding: 13}}>
            <Typography
              variant="h3"
              color="primary"
              className="title"
              gutterBottom>
              Form Automation
            </Typography>

            <form
              onSubmit={event => {
                this.handleSubmission(event);
              }}>
              {/* iterate over all visible inputs */}
              {Object.keys(this.props.visibleTextInputs).map((key, index) => {
                return this.renderVisibleInput(
                  key,
                  this.props.visibleTextInputs[key],
                  index,
                );
              })}
              {/* submit form */}
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary">
                <Typography variant="h4" color="primary">
                  Submit
                </Typography>
              </Button>
            </form>

            {/* keyboard shortcut */}
            <Box
              item
              display="flex"
              justifyContent="flex-end"
              style={{
                margin: '5px',
              }}>
              <Box>
                <Box
                  color="secondary"
                  borderColor="secondary"
                  border={1}
                  borderRadius="borderRadius"
                  display="flex"
                  justifyContent="center"
                  style={{
                    margin: 0,
                    padding: '5px',
                  }}>
                  Keyboard Shortcut: Cmd + Shift + O
                </Box>
              </Box>
            </Box>

            {/* handle personal data */}
            <Box item display="flex" justifyContent="flex-end">
              {/* In Progress */}
              {/* <Button
                color="secondary"
                onClick={() => {
                  this.importJSON();
                }}>
                <Typography variant="caption" display="block">
                  Import
                </Typography>
              </Button> */}
              <Button
                color="secondary"
                onClick={() => {
                  this.exportToJSON();
                }}>
                <Typography variant="caption" display="block">
                  Export
                </Typography>
              </Button>
            </Box>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Main.data,
  visibleTextInputs: state.Main.visibleTextInputs,
});

export default connect(mapStateToProps)(App);
