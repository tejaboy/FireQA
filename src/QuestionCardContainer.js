import React from 'react';
import firebase from './firebase';
import { trackPromise } from 'react-promise-tracker';
import Container from '@material-ui/core/Container';
import QuestionCard from './QuestionCard';

export default class QuestionCardContainer extends React.Component {
	constructor() {
		super();

		this.state = { latestQuestions: [] };
	}

	async componentDidMount() {
		// Fetch information from Cloud Firestore
		let doc = await trackPromise(firebase.firestore().collection("cache").doc("latest").get());

		this.setState({
			latestQuestions: doc.data()["questions"]
		});
	}

	render() {
		document.title = "View All Questions - FireQA"

		return (
			<Container maxWidth="lg">
				<span />
				{this.renderQuestionCard()}
			</Container>
		);
	}

	renderQuestionCard() {
		let latestQuestions = this.state.latestQuestions;
		let render = [];

		latestQuestions.reverse().forEach((question, index) => {
			render.push(<QuestionCard meta={question} key={question.reference} />);
		});

		return render;
	}
}