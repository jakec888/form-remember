import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getAllVisibleInputs} from '../../../../../background/src/actions/inputs';

class App extends Component {
  componentDidMount() {
    console.log('popup opened');

    this.props.getAllVisibleInputs();

    console.log('all visible inputs finished!');
  }

  generatePopupInput() {
    return (
      <div>
        <h1>Visible Inputs</h1>
        {this.props.listOfVisibleInputNames.map(input => {
          return <div>{input}</div>;
        })}
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

const mapStateToProps = state => ({
  listOfVisibleInputNames: state.Inputs.listOfVisibleInputNames,
});

const mapDispatchToProps = dispatch => ({
  getAllVisibleInputs: bindActionCreators(getAllVisibleInputs, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
