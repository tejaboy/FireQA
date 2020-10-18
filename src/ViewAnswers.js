import React, { useEffect, useState } from 'react';
import firebase from './firebase';
import AnswerCard from './AnswerCard';

const ViewAnswers = React.memo(props => {
	let questionId = props.questionId;
	let [answerCards, setAnswerCards] = useState([]);
	let [fetched, setFetched] = useState(false);
	
	// Fetch information from Cloud Firestore
	useEffect(() => {
		function fetchAnswers() {
			firebase.firestore().collection("questions").doc(questionId).collection("answers").onSnapshot((querySnapshot) => {
				let tempAnswerCards = []

				querySnapshot.forEach((answer) => {
					tempAnswerCards.push(<AnswerCard answer={answer.data()} key={answer.data().timePosted} />)
				});

				setAnswerCards(tempAnswerCards);
				setFetched(true);
			});
		}

		if (!fetched) {
			fetchAnswers();
		}
	});

	return (
		<div>
			{answerCards}
		</div>
	);
});

export default ViewAnswers;