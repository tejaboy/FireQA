import React, { useState } from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import firebase from './firebase';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import FireHeader from './FireHeader';
import QuestionCardContainer from './QuestionCardContainer';
import ViewQuestion from './ViewQuestion';
import Ask from './Ask';
import LoadingSpinnerComponent from './LoadingSpinnerComponent'

// Create Styles
const useStyles = makeStyles((theme) => ({
	postIcon: {
		position: "fixed",
		bottom: 20,
		right: 20
	},
}));

// Create App
function App() {
	const classes = useStyles();
	const [user, setUser] = useState(null);

	// Check user status
	firebase.auth().onAuthStateChanged(function(user) {
		setUser(user);
	});
	
	function signOut() {
		firebase.auth().signOut().then(() => {
			setUser(null);
		});
	}
	
	return (
		<div className="App">
			<HashRouter>
				<FireHeader signedIn={user != null} signOutFunc={signOut} />
				
				<Route exact path="/" component={QuestionCardContainer} />
				<Route path="/ask" render={(props) => (<Ask user={user} history={props.history} />)} />
				<Route path="/q" render={(props) => (<ViewQuestion user={user} />)} />

				{user != null &&
				<NavLink to="/ask" style={{color: "white", padding: 0}}>
					<Fab color="secondary" className={classes.postIcon} aria-label="edit">
						<EditIcon />
					</Fab>
				</NavLink>
				}

				<LoadingSpinnerComponent />
			</HashRouter>
		</div>
	);
}

export default App;