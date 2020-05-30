export default (data) => data.map(({ show }) => {
	const {
		genres, id, image, name, summary,
	} = show;

	return {
		genres, id, image, name, summary,
	};
});
