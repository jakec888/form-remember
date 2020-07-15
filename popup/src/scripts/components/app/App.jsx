import React, {Component} from 'react';
import {connect} from 'react-redux';

import browser from 'webextension-polyfill';

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
    let visibleTextInputsName = await this.getAllVisibleTextInputs();

    // add visible form inputs that are not in the hashmap
    await visibleTextInputsName.forEach(visibleInputName => {
      !data.has(visibleInputName) && data.set(visibleInputName, '');
    });

    // update redux with current page's empty text input
    await this.props.dispatch({
      type: 'GET_STORED_INPUTS',
      payload: {data},
    });
  }

  // async componentDidMount() {
  //   console.log('extension clicked! opening popup...');

  //   // get list of key/value form inputs
  //   console.log('getting list of key/value form inputs');
  //   let data = await JSON.parse(localStorage.getItem('FormAutomation'));
  //   console.log(data);

  //   !data && (await localStorage.setItem('FormAutomation', JSON.stringify([])));

  //   this.props.dispatch({
  //     type: 'GET_STORED_INPUTS',
  //     payload: {data},
  //   });

  //   // get all visible form inputs from page
  //   console.log('getting all visible form inputs from page');
  //   let visibleTextInputs = await this.getAllVisibleTextInputs();
  //   console.log(visibleTextInputs);

  //   // add visible form inputs that are not in the list of key/value
  //   console.log(
  //     'adding visible form inputs that are not in the list of key/value',
  //   );
  //   await visibleTextInputs.forEach(visibleInput => {
  //     console.log(
  //       `checking if ${visibleInput} exists in FormAutomation storage`,
  //     );
  //     let exists =
  //       data.filter(function (o) {
  //         return o.hasOwnProperty(visibleInput);
  //       }).length > 0;

  //     console.log(`${visibleInput} ${exists}`);
  //     !exists && data.push({[visibleInput.toString()]: ''});
  //   });

  //   // update key/value form inputs if new input names
  //   console.log('updating key/value form inputs if new input names');
  //   await localStorage.setItem('FormAutomation', JSON.stringify(data));
  //   console.log('update key/value form inputs if new input names');
  //   console.log(data);
  // }

  async getAllVisibleTextInputs() {
    const tabs = await browser.tabs.query({currentWindow: true, active: true});

    let visibleTextInputs = await browser.tabs.sendMessage(tabs[0].id, {
      command: 'GET_ALL_VISIBLE_TEXT_INPUTS_NAME',
    });

    return visibleTextInputs;
  }

  // onHandleTextInputChange(text) {}

  renderVisibleInput(input) {
    // console.log('====================================');
    // console.log('Render:');
    // console.log(this.props.data);
    // console.log('====================================');
    return (
      <div>
        <h3>{input.name}</h3>
        <h3>{input.email}</h3>
        {/* <input onChange={this.onHandleTextInputChange}></input> */}
      </div>
    );
  }

  render() {
    console.log('====================================');
    console.log('this.props.data:');
    console.log(this.props.data);
    console.log('====================================');
    return (
      <div>
        <h1>Hello World</h1>
        {/* {this.props.data.map(input => {
          return this.renderVisibleInput(input);
        })} */}
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
