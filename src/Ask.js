import React from 'react';
import firebase from './firebase';
import { NavLink, Redirect } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker';
import MDEditor from '@uiw/react-md-editor';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from './Snackbar';
import getQuestionLocation from './getQuestionLocation';

export default function Ask(props) {
	const [content, setContent] = React.useState("");
	const [titleError, setTitleError] = React.useState(null);
	const [contentError, setContentError] = React.useState(null);
	const [showSnackbar, setShowSnackbar] = React.useState(false);
	
	if (props.user == null) return (<Redirect to="/" />);

	async function submitQuestion() {
		if (!isValid()) return;
		let title = document.getElementById('title-field').value;

		// Call Cloud Function:askQuestion
		let addQuestion = firebase.functions().httpsCallable('addQuestion');
		let result = await trackPromise(addQuestion({
			title: title,
			content: content,
		}));

		setShowSnackbar(true);

		props.history.push(getQuestionLocation(result.data.documentId, title));
	}

	function isValid() {
		let title = document.getElementById('title-field').value;
		let valid = true;
		
		// Check Empty
		if (title === "") {
			setTitleError("Title must not be empty.");
			valid = false;
		}

		if (content === "") {
			setContentError("Content must not be empty.");
			valid = false;
		}

		return valid;
	}

	function disableWarning() {
		setTitleError(null);
		setContentError(null);
	}

	return (
		<Container maxWidth="lg" style={{marginTop: 10}}>
			<p><NavLink to="/">Home</NavLink> {">"} Ask Question</p>
			<TextField
				id="title-field"
				error={titleError != null}
				helperText={titleError}
				label="Question Title"
				style={{marginBottom: 10}}
				onClick={disableWarning}
				fullWidth
			/>
			
			<MDEditor
				value={content}
				onChange={setContent}
				onClick={disableWarning}
			/>

			{contentError != null &&
			<p style={{color: "red"}}>{contentError}</p>
			}

			<Button variant="contained" color="primary" onClick={submitQuestion}>Submit</Button>

			{showSnackbar &&
			<Snackbar setShowSnackbar={setShowSnackbar} message="Question posted!" />
			}
		</Container>
	);
}