import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MDEditor from '@uiw/react-md-editor';

const useStyles = makeStyles({
	root: {
		marginTop: 20,
	},
	media: {
	  height: 140,
	},
});

export default function AnswerCard(props) {
	const classes = useStyles();
	const answer = props.answer;

	return (
		<Card className={classes.root}>
			<CardContent>
				<MDEditor.Markdown source={answer.content} />
			</CardContent>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>
			</CardActions>
		</Card>
	);
}