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
        alias: ''
      },
      errors: '',
      codeCreated: ''
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreate(e) {
    e.preventDefault();

    axios.post('/api/', this.state.data)
      .then((url) => {
        this.setState({
          data: {
            url: '',
            alias: ''
          },
          errors: '',
          codeCreated: url.data.alias
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState({ errors: err.response.data.errors })
      });

  }

  handleChange(e) {
    const { name, value } = e.target;
    const values = Object.assign({}, this.state.data, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ data: values, errors });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <p>{JSON.stringify(this.state)}</p>
        <h1>Create me a link</h1>
        <form onSubmit={this.handleCreate} noValidate>
          {errors.url && <small>{errors.url}</small>}
          <input type="text" name="url" placeholder="bbc.co.uk" onChange={this.handleChange}
            value={this.state.data.url} />
          <input
            type="text"
            name="alias"
            placeholder="thebeeb (optional)"
            onChange= {this.handleChange}
            value={this.state.data.alias}
          />
          <button className="btn btn-primary btn-block btn-large">Submit</button>
        </form>

        <span>{this.state.codeCreated}</span>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);