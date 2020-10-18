import React from 'react'
import { usePromiseTracker } from 'react-promise-tracker';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		top: "50%",
		left: "50%",
		transfrom: "translate(-50%, -50%)"
	},
}));

export default function FireHeader() {
	const classes = useStyles();

	if (usePromiseTracker().promiseInProgress)
		return <CircularProgress className={classes.root} />;
	else
		return <span />;
}