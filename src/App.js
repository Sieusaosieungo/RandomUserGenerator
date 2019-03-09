/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FetchRandomUser from './components/FetchRandomUser/FetchRandomUser';
import Error from './components/Error/Error';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className='App'>
					<Switch>
						<Route path="/" exact component={FetchRandomUser}></Route>
						<Route component={Error} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
