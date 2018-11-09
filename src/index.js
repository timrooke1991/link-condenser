import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();

    this.state = {};


  }

  render() {
    return (
      <main className="container">
        <h2>Hello</h2>
      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);