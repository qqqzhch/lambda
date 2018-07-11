
const content = require('./index.ejs');
const layout = require('../../layout/html.js');
const pageConfig = {
	pageTitle: 'Lambda 糖果大作战',
	description: 'Lambda - De centralization Structure Cloud Storage',
	keywords: 'Lambda,De centralization, cloud storage, de centralization of Structure Cloud Storage',
	pageId: 'index'
};


module.exports = layout.init(pageConfig).run(content(pageConfig));
