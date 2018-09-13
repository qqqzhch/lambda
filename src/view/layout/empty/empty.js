const layout = require('./empty.ejs');



const pf = {
	pageTitle: '',
	description: '',
	keywords: '',
	pageId: ''
};


const moduleExports = {

	init({ pageTitle, description, keywords, pageId}){
		pf.pageTitle = pageTitle;
		pf.description = description;
		pf.keywords = keywords;
		pf.pageId = pageId;
		return this;
	},

	run(content) {
		const componentRenderData = Object.assign({}, pf);
		const renderData = {

			content,
			pf
		};
		return layout(renderData);
	}
}


module.exports = moduleExports;
