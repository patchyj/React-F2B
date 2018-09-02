import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import uuid from 'uuid';
import axios from 'axios';

class AddContact extends Component {
  state = {
    name:'',
    email:'',
    phone:'',
    errors: {}
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    
    const { name, email, phone } = this.state;

    // Check for errors
    if(name === '') {
      this.setState({ errors: {
        name: 'Name is required'
      }})
      // In order to stop it, you must return;
      return;
    }
    if(email === '') {
      this.setState({ errors: {
        email: 'Email is required'
      }})
      // In order to stop it, you must return;
      return;
    }
    if(phone === '') {
      this.setState({ errors: {
        phone: 'Phone is required'
      }})
      // In order to stop it, you must return;
      return;
    }

    const newContact = {
      // The below is ES6 for doing {name: name, email: email} etc
      // JSONPlaceholder adds the ID
      // id: uuid(),
      name, 
      email,
      phone
    }

    const res = await axios
      .post('https://jsonplaceholder.typicode.com/users', newContact);

    dispatch({ type: 'ADD_CONTACT', payload: res.data })

    

    // set the fields back to blank
    this.setState({
      name:'',
      email:'',
      phone:'',
      errors: {}
    });

    this.props.history.push('/');
    
  }

  onChange = (e) => this.setState({ [ e.target.name ]: e.target.value })

  render() {
    const { name, email, phone, errors } = this.state; 

    return (
      <Consumer>
        { value => {
          const { dispatch } = value;
          return(
            <div className="card mb-3">
            <div className="card-header">
              Add Contact
            </div>
            <div className="card-body">
              {/* we want to use dispatch inside the onSubmit */}
              <form onSubmit={ this.onSubmit.bind(this, dispatch) }>
                <TextInputGroup 
                  label="Name"
                  name="name"
                  placeholder="Enter Name"
                  value={ name }
                  onChange={ this.onChange }
                  error={ errors.name }
                />
                <TextInputGroup 
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={ email }
                  onChange={ this.onChange }
                  error={ errors.email }
                />
                <TextInputGroup 
                  label="Phone"
                  name="phone"
                  placeholder="Enter Phone"
                  value={ phone }
                  onChange={ this.onChange }
                  error={ errors.phone }
                />
                <input type="submit" value="Add Contact" className="btn btn-block btn-primary"/>
              </form>
            </div>
          </div>
          )
        }}
      </Consumer>
    )
  }
}

export default AddContact;