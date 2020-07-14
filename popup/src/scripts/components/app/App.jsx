import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

import browser from 'webextension-polyfill';

class App extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    console.log('popup opened');

    let visibleTextInputs = await this.getAllVisibleTextInputs();
    console.log(visibleTextInputs);

    await this.props.dispatch({
      type: 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME',
      payload: {visibleTextInputs},
    });
  }

  async getAllVisibleTextInputs() {
    const tabs = await browser.tabs.query({currentWindow: true, active: true});

    let visibleTextInputs = await browser.tabs.sendMessage(tabs[0].id, {
      command: 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME',
    });

    return visibleTextInputs;
  }

  // onHandleTextInputChange(text) {}

  renderVisibleInput(input) {
    return (
      <div>
        <h3>{input}</h3>
        {/* <input onChange={this.onHandleTextInputChange}></input> */}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.visibleTextInputs.map(input => {
          return this.renderVisibleInput(input);
        })}

        {/* {this.renderVisibleInput(this.props.visibleTextInputs[0])} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  visibleTextInputs: state.Inputs.visibleTextInputs,
});

// const mapDispatchToProps = dispatch => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps)(App);
