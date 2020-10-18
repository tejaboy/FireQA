import React from 'react';
import firebase from './firebase';
import { trackPromise } from 'react-promise-tracker';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MDEditor from '@uiw/react-md-editor';

const useStyles = makeStyles({
	root: {
		marginTop: 20,
	},
	media: {
	  height: 140,
	},
});

export default function ViewQuestionCard(props) {
	const classes = useStyles();
	const question = props.question;
	const uid = props.user ? props.user.uid : null;

	async function deleteQuestion() {
		await trackPromise(
			firebase.firestore().collection('questions').doc(props.questionId).update({
				softDelete: true
			})
		);

		console.log("deleted");
	}

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{question.title}
				</Typography>

				<MDEditor.Markdown source={question.content} />
			</CardContent>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
				
				<Button size="small" color="primary" onClick={props.toggleShowAddAnswer}>
					Answer
				</Button>

				{uid === question.uid &&
				<Button size="small" color="primary" onClick={deleteQuestion}>
					Delete
				</Button>
				}
			</CardActions>
		</Card>
	);
}