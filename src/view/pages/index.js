
const content = require('./index.ejs');
const layout = require('../layout/html/html.js');
const lang = require('../lang');
const pageConfig = {
	pageTitle: 'Lambda blockchain  -  A Disruptor in Blockchain-Based Storage Solution',
	description: 'Lambda blockchain  is a fast, safe, and scalable blockchain infrastructure project',
	keywords: 'Lambda,Blockchain,Storage,Dapps,IPFS,filecoin,aws',
	lang:lang(),
	langType:"en"
};

module.exports = layout.init(pageConfig).run(content(pageConfig));
