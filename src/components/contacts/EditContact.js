import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import uuid from 'uuid';
import axios from 'axios';
// import Contact from './Contact';

class EditContact extends Component {
  state = {
    name:'',
    email:'',
    phone:'',
    errors: {}
  };

  async componentDidMount(){
    const { id } = this.props.match.params;

    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
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

    // PUT Request
    // create updated contact
    const updateContact = {
      name, email, phone
    }
    // get the ID from the params
    const { id } = this.props.match.params;
    // Make async request contact object
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);
    // dispatch response to context.js with res.data as the payload
    dispatch({type: 'UPDATE_CONTACT', payload: res.data });

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
            <div className="py-5 edit-contact">
              <div className="card-body py-5">
                {/* we want to use dispatch inside the onSubmit */}
                <form className="form-signin py-5 my-5" onSubmit={ this.onSubmit.bind(this, dispatch) }>
                <h5 className="display-6">
                  Edit { name  }
                </h5>
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
                  <input type="submit" value="Update Contact" className="btn btn-block btn-primary"/>
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default EditContact;