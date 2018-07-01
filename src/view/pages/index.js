
const content = require('./index.ejs');
const layout = require('../layout/html.js');
const pageConfig = {
	pageTitle: 'Welcome to Lambda Bounty Program',
	description: 'Lambda - De centralization Structure Cloud Storage',
	keywords: 'Lambda,De centralization, cloud storage, de centralization of Structure Cloud Storage',
	pageId: 'indexEn'
};


module.exports = layout.init(pageConfig).run(content(pageConfig));
