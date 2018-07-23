
const content = require('./index.ejs');
const layout = require('../../layout/html.js');
const pageConfig = {
	pageTitle: 'Lambda -  A Disruptor in Blockchain-Based Storage Solution',
	description: 'Lambda - Providing Unlimited Storage Capabilities',
	keywords: 'Lambda,Blockchain,Storage',
	pageId: 'indexEn'
};


module.exports = layout.init(pageConfig).run(content(pageConfig));
