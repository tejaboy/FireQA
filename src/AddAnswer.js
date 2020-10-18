import React from 'react';
import firebase from './firebase';
import { trackPromise } from 'react-promise-tracker';
import MDEditor from '@uiw/react-md-editor';
import Button from '@material-ui/core/Button';

export default function AddAnswer(props) {
	const [content, setContent] = React.useState("");

	async function submitAnswer() {
		if (!isValid()) return;

		// Call Cloud Function:postAnswer
		let addQuestion = firebase.functions().httpsCallable('postAnswer');
		let result = await trackPromise(addQuestion({
			content: content,
			questionId: props.questionId
		}));

		// If success, set toggle to off.
		if (result.data.documentId) {
			props.toggleShowAddAnswer();
		}
	}

	function isValid() {
		return true;
	}

	return (
		<div>
			<MDEditor
				value={content}
				onChange={setContent}
			/>
			
			<br/>

			<Button variant="contained" color="primary" onClick={submitAnswer}>Answer</Button>
		</div>
	);
}