import React, { Component } from 'react';
import './FetchRandomUser.css';
import { ClipLoader } from 'react-spinners';
import queryString from 'query-string';
import axios from 'axios';

class FetchRandomUser extends Component {
  state = {
    loading: true,
    people: [],
  };

  async componentDidMount() {
    const { location } = this.props;
    const values = queryString.parse(location.search);
    let numberUsers;
    if (!values.size) {
      numberUsers = 100;
    } else {
      numberUsers = values.size;
    }

    const url = `https://api.randomuser.me/?results=${numberUsers}`;
    // let response
    // let data
    try {
      axios.get(url).then(res => {
        this.setState({
          people: res.data.results,
          loading: false,
        });
      });
      // response = await fetch(url)
      // data = await response.json()
      // this.setState({
      //   people: data.results,
      //   loading: false,
      // })
    } catch (error) {
      // alert("Can't connect to Server");
    }
  }

  render() {
    const { loading, people } = this.state;
    if (loading) {
      return (
        <ClipLoader sizeUnit="" size={1000} color="silver" loading={loading} />
      );
    }
    if (!people.length) {
      return <div>didn&apos;t get a person</div>;
    }
    // Avatar, fullname, email, phonenumber
    return (
      <div className="container">
        {people.map(person => (
          <div className="content" key={person.login.uuid}>
            <img alt={person.name.last} src={person.picture.large} />
            <div>
              Fullname: {person.name.first} {person.name.last}
            </div>
            <div>Email: {person.email}</div>
            <div>Tel: {person.phone}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default FetchRandomUser;
