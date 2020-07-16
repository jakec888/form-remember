import React, {Component} from 'react';
import {connect} from 'react-redux';

import browser from 'webextension-polyfill';

import './App.css';

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
      data.has(name) && (visibleTextInputs[name] = data.get(name));
    });

    // update redux with current page's empty text input
    await this.props.dispatch({
      type: 'GET_STORED_INPUTS',
      payload: {data, visibleTextInputs},
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

  renderVisibleInput(key, value) {
    return (
      <div key={key}>
        <h3>{key}</h3>
        <input
          onChange={event => {
            this.onHandleTextInputChange(event, key);
          }}
          value={value}
        />
      </div>
    );
  }

  handleSubmission(event) {
    event.preventDefault();
    console.log('submitting');
    console.log(this.props.data);
    console.log(this.props.visibleTextInputs);

    // save updated hashmap to local storage
    // localStorage.setItem(
    //   'FormAutomation',
    //   JSON.stringify(Array.from(this.props.data)),
    // );

    console.log('closing!');
    window.close();
  }

  render() {
    return (
      <div className="popup-container">
        <h1>Hello World</h1>

        <form
          onSubmit={event => {
            this.handleSubmission(event);
          }}>
          {Object.keys(this.props.visibleTextInputs).map(key => {
            return this.renderVisibleInput(
              key,
              this.props.visibleTextInputs[key],
            );
          })}
          <button variant="primary" type="submit">
            Submit
          </button>
        </form>
      </div>
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
