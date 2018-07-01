
const content = require('./index.ejs');
const layout = require('../../layout/html.js');
const pageConfig = {
	pageTitle: 'Submit to verify your qualification ',
	description: 'Lambda - De centralization Structure Cloud Storage',
	keywords: 'Lambda,De centralization, cloud storage, de centralization of Structure Cloud Storage',
	pageId: 'indexEn'
};


module.exports = layout.init(pageConfig).run(content(pageConfig));
