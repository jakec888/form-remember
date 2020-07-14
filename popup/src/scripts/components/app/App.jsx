import React, {Component} from 'react';
import {connect} from 'react-redux';
import browser from 'webextension-polyfill';

class App extends Component {
  constructor(props) {
    super(props);
    this.saidHi = this.saidHi.bind(this);
    this.sayHi = this.sayHi.bind(this);
  }

  componentDidMount() {
    console.log('popup opened');
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT',
      });
    });
    // let all = document.getElementsByTagName('input');
    // console.log('====================================');
    // console.log('Popup:');
    // console.log(all);
    // console.log('====================================');
  }

  // sayHi() {
  //   // browser.tabs.query({});

  //   console.log('saying hi');

  //   browser.tabs.query({currentWindow: true, active: true}).then(tabs => {
  //     console.log('sending message');
  //     browser.tabs.sendMessage(tabs[0].id, 'hello there!', this.saidHi);
  //   });
  // }

  // saidHi() {
  //   console.log('successfully said hi!');
  // }

  async sayHi() {
    // browser.tabs.query({});

    console.log('saying hi');

    let tabs = await browser.tabs.query({currentWindow: true, active: true});

    let result = await browser.tabs.sendMessage(tabs[0].id, 'hello there!');

    await this.saidHi(result);
  }

  saidHi(result) {
    console.log('successfully said hi!');
    console.log(result);
  }

  // sayHi() {
  //   console.log('trying to retrieve ');

  //   browser.tabs.query({currentWindow: true, active: true}).then(tabs => {
  //     // browser.tabs.sendMessage(tabs[0].id, 'hello there!', this.saidHi);
  //     browser.tabs.sendMessage(tabs[0].id, 'hello there!').then(result => {
  //       this.saidHi(result);
  //     });
  //   });
  // }

  // saidHi(sample) {
  //   console.log('sample:');
  //   console.log(sample);
  // }

  render() {
    return (
      <div>
        <button onClick={() => this.sayHi()}>Say Hi!</button>
        {/* <h1>This is the Popup!</h1> */}
        {/* <p>Click Count: {this.props.count}</p> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.count,
  };
};

export default connect(mapStateToProps)(App);
