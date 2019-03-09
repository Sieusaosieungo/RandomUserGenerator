import React, { Component } from 'react';
import './FetchRandomUser.css';
import { ClipLoader } from 'react-spinners';
import queryString from 'query-string';

class FetchRandomUser extends Component {
  state = {
    loading: true,
    people: []
  };

  async componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    let numberUsers;
    if (!values.size) {
      numberUsers = 100;
    } else {
      numberUsers = values.size;
    }

    let url = 'https://api.randomuser.me/?results=' + numberUsers;
    let response;
    let data;

    try {
      response = await fetch(url);
      data = await response.json();
      this.setState({
        people: data.results,
        loading: false,
      });
    } catch (error) {
      alert("Can't connect to Server");
    }
  }

  render() {
    if (this.state.loading) {
      return <ClipLoader
        sizeUnit={'px'}
        size={100}
        color={'silver'}
        loading={this.state.loading}
      />;
    }
    if (!this.state.people.length) {
      return <div>didn't get a person</div>;
    }
    // Avatar, fullname, email, phonenumber
    return (
      <div className="container">
        {this.state.people.map(person => (
          <div className="content" key={person.login.uuid}>
            <img alt={person.name.last} src={person.picture.large} />
            <div>Fullname: {person.name.first}    {person.name.last}</div>
            <div>Email: {person.email}</div>
            <div>Tel: {person.phone}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default FetchRandomUser;
