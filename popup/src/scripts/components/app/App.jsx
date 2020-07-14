import React, {Component} from 'react';
import {connect} from 'react-redux';
import browser from 'webextension-polyfill';

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    console.log('popup opened');

    let tabs = await browser.tabs.query({currentWindow: true, active: true});

    let listOfVisibleInputNames = await browser.tabs.sendMessage(tabs[0].id, {
      command: 'GET_ALL_VISIBLE_INPUT_NAMES',
    });

    await console.log('listOfVisibleInputNames');
    await console.log(listOfVisibleInputNames);
    await console.log(typeof listOfVisibleInputNames);
  }

  generatePopupInput() {
    return (
      <div>
        <h1>Sample Input</h1>
        <h3>{/* label here */}</h3>
        <input>{/* input here */}</input>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div>Hello World</div>
        {this.renderAllInputs}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
