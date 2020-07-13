import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT',
      });
    });
  }

  render() {
    return (
      <div>
        <h1>This is the Content!!</h1>
        <p>Click Count: {this.props.count}</p>
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
