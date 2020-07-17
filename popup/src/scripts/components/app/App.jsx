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

  async handleSubmission(event) {
    event.preventDefault();
    console.log('submitting');
    console.log(this.props.data);
    console.log(this.props.visibleTextInputs);

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
            <CardContent>
              <Typography variant="h6" color="primary">
                Keyboard Shortcut
              </Typography>
              <Box
                color="secondary"
                borderColor="secondary"
                border={1}
                borderRadius="borderRadius"
                style={{display: 'inline-block', margin: 0}}>
                Cmd + Shift + O
              </Box>
            </CardContent>
          </Grid>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Inputs.data,
  visibleTextInputs: state.Inputs.visibleTextInputs,
});

// const mapDispatchToProps = dispatch => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps)(App);
