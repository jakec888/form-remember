// import React, {Component} from 'react';
// import {connect} from 'react-redux';

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     document.addEventListener('click', () => {
//       this.props.dispatch({
//         type: 'ADD_COUNT',
//       });
//     });
//     // let all = document.getElementsByTagName('input');
//     // console.log('====================================');
//     // console.log(all);
//     // console.log('====================================');
//   }

//   render() {
//     return (
//       <div>
//         <h1>This is the Content!!</h1>
//         <p>Click Count: {this.props.count}</p>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     count: state.count,
//   };
// };

// export default connect(mapStateToProps)(App);

import React, {Component} from 'react';
import {connect} from 'react-redux';

export class App extends Component {
  componentDidMount() {
    document.addEventListener('click', () => {
      this.props.dispatch({
        type: 'ADD_COUNT',
      });
    });
    let all = document.getElementsByTagName('input');
    console.log('====================================');
    console.log('Content:');
    console.log(all);
    console.log('====================================');
  }

  render() {
    return (
      <div>
        <h1>This is the Popup!</h1>
        <p>Click Count: {this.props.count}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
