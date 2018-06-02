
const content = require('./index.ejs');
const layout = require('../../layout/html.js');
const pageConfig = {
	pageTitle: 'Lambda - 去中心化结构云存储',
	description: 'Lambda - 去中心化结构云存储',
	keywords: 'Lambda,去中心化,云存储,去中心化结构云存储',
	pageId: 'indexEn'
};


module.exports = layout.init(pageConfig).run(content(pageConfig));
