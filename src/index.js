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
    if(!this.isValidURL(this.state.data.url)) {
      return false;
    }

    axios.post('/api/', this.state.data)
      .then((url) => {
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

  isValidURL(str) {
    var pattern = new RegExp('^(https?:\/\/)?' + // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + // domain name
      '((\d{1,3}\.){3}\d{1,3}))' + // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + // port and path
      '(\?[;&a-z\d%_.~+=-]*)?' + // query string
      '(\#[-a-z\d_]*)?$', 'i'); // fragment locater
    if (!pattern.test(str)) {
      this.setState({
        errors: { url: 'Please enter valid url' }
      })
      return false;
    } else {
      return true;
    }
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

