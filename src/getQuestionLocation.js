export default function getQuestionLocation(documentId, title) {
	return "/q/" + documentId + "/" + title.replaceAll(" ", "_").toLowerCase();
}