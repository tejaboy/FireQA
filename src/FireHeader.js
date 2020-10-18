import React from 'react';
import firebase from "firebase";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function FireHeader(props) {
	const classes = useStyles();
	
	function signInWithGoogle() {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().useDeviceLanguage();
		firebase.auth().signInWithRedirect(provider);
	}
	
	return (
		<header className="App-header">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>

					<Typography variant="h6" className={classes.title}>
						FireQA
					</Typography>

					{generateButton()}
				</Toolbar>
			</AppBar>
		</header>
	);

	function generateButton() {
		if (!props.signedIn) {
			return <Button color="inherit" onClick={signInWithGoogle}>Login</Button>
		}
		else {
			return <Button color="inherit" onClick={props.signOutFunc}>Logout</Button>
		}
	}
}