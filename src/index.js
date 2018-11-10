import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './style/style.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {
        url: '',
        codeProvided: ''
      },
      errors: '',
      codeCreated: ''
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreate(e) {
    e.preventDefault();

    axios.post('/api/', this.state)
      .then((data) => {
        this.setState({
          url: '',
          codeProvided: ''
        });
      })
      .catch(err => console.log(err));

  }

  handleChange(e) {

    const values = Object.assign({}, this.state, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ data: values, errors });
  }

  render() {

    return (
      <div className="login">
        <h1>Create me a link</h1>
        <form onSubmit={this.handleCreate} noValidate>
          <input type="text" name="link" placeholder="bbc.co.uk" onChange={this.handleChange}
            value={this.state.data.name} />
          <input
            type="text"
            name="code"
            placeholder="thebeeb (optional)"
            onChange= {this.handleChange}
            value={this.state.data.code}
          />
          <button className="btn btn-primary btn-block btn-large">Submit</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);