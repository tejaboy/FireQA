import React from 'react';
import firebase from './firebase';
import { NavLink } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import ViewQuestionCard from './ViewQuestionCard';
import AddAnswer from './AddAnswer';
import ViewAnswers from './ViewAnswers';

export default class ViewQuestion extends React.Component {
	constructor(props) {
		super(props);

		this.questionId = window.location.href.split("#/q/")[1].split("/")[0];

		this.state = {
			question: {},
			showAddAnswer: false
		};

		// Bindings
		this.toggleShowAddAnswer = this.toggleShowAddAnswer.bind(this);
	}

	async componentDidMount() {
		// Fetch information from Cloud Firestore
		let doc = await trackPromise(firebase.firestore().collection("questions").doc(this.questionId).get());

		document.title = doc.data().title;

		this.setState({
			question: doc.data()
		});
	}

	render() {
		return (
			<Container maxWidth="lg">
				<p><NavLink to="/">Home</NavLink> {">"} {this.state.question.title}</p>

				<ViewQuestionCard question={this.state.question} toggleShowAddAnswer={this.toggleShowAddAnswer} user={this.props.user} questionId={this.questionId} />

				<Divider variant="middle" style={{margin: 10}} />

				{this.state.showAddAnswer &&
				<AddAnswer questionId={this.questionId} toggleShowAddAnswer={this.toggleShowAddAnswer} />
				}

				<ViewAnswers questionId={this.questionId} />
			</Container>
		);
	}

	// Setters
	toggleShowAddAnswer() {
		if (this.props.user) {
			this.setState({
				showAddAnswer: !this.state.showAddAnswer
			});
		}
		else {
			firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
		}
	}
}