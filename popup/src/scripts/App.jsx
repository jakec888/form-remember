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

  async componentDidMount() {
    console.log('opened popup');

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

  async postAllVisibleTextInputs(data, visibleTextInputs) {
    const tabs = await browser.tabs.query({currentWindow: true, active: true});

    await browser.tabs.sendMessage(tabs[0].id, {
      command: 'POST_ALL_VISIBLE_TEXT_INPUTS_NAME',
      data,
      visibleTextInputs,
    });
  }

  async getAllVisibleTextInputs() {
    const tabs = await browser.tabs.query({currentWindow: true, active: true});

    let visibleTextInputs = await browser.tabs.sendMessage(tabs[0].id, {
      command: 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME',
    });

    return visibleTextInputs;
  }

  onHandleTextInputChange(event, key) {
    let updatedVisibleTextInputs = this.props.visibleTextInputs;
    updatedVisibleTextInputs[key] = event.target.value;

    this.props.dispatch({
      type: 'UPDATE_VISIBLE_TEXT_INPUT',
      payload: {visibleTextInputs: updatedVisibleTextInputs},
    });
  }

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

    console.log('closing!');
    window.close();
  }

  exportToJSON() {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(Array.from(this.props.data))], {
      type: 'text/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${new Date().toISOString()}.json`;
    document.body.appendChild(element);
    element.click();
  }

  // importJSON() {
  //   this.props.dispatch({
  //     type: 'OPEN_IMPORT_JSON',
  //   });
  // }

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
            <Typography variant="h3" color="primary" gutterBottom>
              Form Automation
            </Typography>

            <form
              onSubmit={event => {
                this.handleSubmission(event);
              }}>
              {Object.keys(this.props.visibleTextInputs).map((key, index) => {
                return this.renderVisibleInput(
                  key,
                  this.props.visibleTextInputs[key],
                  index,
                );
              })}
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

            <Box item display="flex" justifyContent="flex-end">
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