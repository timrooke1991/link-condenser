import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        url: '',
        alias: ''
      },
      errors: {
        url: '',
        alias: ''
      },
      codeCreated: ''
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreate(e) {
    e.preventDefault();
    if (!this.isValidURL(this.state.data.url)) {
      return false;
    }

    axios
      .post('/api/', this.state.data)
      .then(url => {
        this.setState({
          data: {
            url: '',
            alias: ''
          },
          errors: {
            url: '',
            alias: ''
          },
          codeCreated: url.data.alias
        });

        this.renderSuccess();
      })
      .catch(err => {
        this.setState({
          errors: err.response.data.errors
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    const values = Object.assign({}, this.state.data, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ data: values, errors });
  }

  isValidURL(str) {
    const pattern = new RegExp('(http)');
    if (!pattern.test(str)) {
      this.setState({
        errors: { url: 'Please enter valid url' }
      });
      return false;
    } else {
      return true;
    }
  }

  renderError() {
    if (this.state.errors.url) {
      return (
        <div class="alert-error">
          <p>
            {this.state.errors.url}
          </p>
        </div>
      );
    }

    return null;
  }

  renderSuccess() {
    if (!this.state.codeCreated) {
      return null;
    }

    return (
      <div class="alert-success">
        <p>
          <a href={`/${this.state.codeCreated}`}>
            Go to my link
          </a>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="login">
        <p>{JSON.stringify(this.state)}</p>
        <h1>Create me a link</h1>
        <form onSubmit={this.handleCreate} noValidate>
          <input
            type="text"
            name="url"
            placeholder="bbc.co.uk"
            onChange={this.handleChange}
            value={this.state.data.url}
          />
          <input
            type="text"
            name="alias"
            placeholder="thebeeb (optional)"
            onChange={this.handleChange}
            value={this.state.data.alias}
          />
          <button className="btn btn-primary btn-block btn-large">
            Submit
          </button>
        </form>

        <div class="alert-container">
          {this.renderError()}
          {this.renderSuccess()}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
