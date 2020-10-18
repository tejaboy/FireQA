const functions = require('firebase-functions');
const admin = require('firebase-admin');
const xss = require('xss');
admin.initializeApp();

// Add Question
exports.addQuestion = functions.https.onCall(async(data, context) => {
	// Get submitted data
	const title = xss(data.title);
	const content = xss(data.content);

	// Validate that both parameters is not empty
	if (!title || !content) {
		return {error: "Title or Content is empty."}
	}
	
	// Push the new message into Cloud Firestore using the Firebase Admin SDK.
	const writeResult = await admin.firestore().collection('questions').add({
		title: title,
		content: content,
		uid: context.auth.uid,
		timePosted: admin.firestore.FieldValue.serverTimestamp()
	});

	// Update the Cloud Firestore cache for latest questions
	admin.firestore().collection('cache').doc('latest').update({
		questions: admin.firestore.FieldValue.arrayUnion({
			answers: 0,
			reference: `/questions/${writeResult.id}`,
			title: title
		})
	});

	// Send back a message that we've succesfully written the message
	return ({
		documentId: writeResult.id
	});
});

// Post Answer
exports.postAnswer = functions.https.onCall(async(data, context) => {
	// Get submitted data
	const content = xss(data.content);
	const questionId = xss(data.questionId);

	// Validate that both parameters is not empty
	if (!content || !questionId) {
		return {error: "Content or questionId is empty."}
	}
	
	// Push the new message into Cloud Firestore using the Firebase Admin SDK.
	const writeResult = await admin.firestore().collection('questions').doc(questionId).collection('answers').add({
		content: content,
		uid: context.auth.uid,
		timePosted: admin.firestore.FieldValue.serverTimestamp()
	});

	// Send back a message that we've succesfully written the message
	return ({
		documentId: writeResult.id
	});
});