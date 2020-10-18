import React from 'react';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import getQuestionLocation from './getQuestionLocation';

const useStyles = makeStyles({
	root: {
		marginTop: 20,
	},
	media: {
	  height: 140,
	},
	noDecoration: {
		textDecoration: 'none',
		color: 'black'
	}
});

export default function QuestionCard(props) {
	const classes = useStyles();
	const meta = props.meta;
	const location = getQuestionLocation(meta.reference.split("/")[2], meta.title);

	return (
		<Card className={classes.root}>
			<NavLink to={location} className={classes.noDecoration} >
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{meta.title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
						{meta.answers === 0 ? "Unanswered" : "Answered"}
						</Typography>
					</CardContent>
				</CardActionArea>
			</NavLink>
			<CardActions>
				<Button size="small" color="primary">
					Share
				</Button>

				<NavLink to={location}>
					<Button size="small" color="primary">
						Answer
					</Button>
				</NavLink>
			</CardActions>
		</Card>
	);
}