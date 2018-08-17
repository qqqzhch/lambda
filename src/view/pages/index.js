
const content = require('./index.ejs');
const layout = require('./../layout/empty.js');
const pageConfig = {
	pageTitle: 'Lambda -  A Disruptor in Blockchain-Based Storage Solution',
	description: 'Lambda is a fast, safe, and scalable blockchain infrastructure project, which provides decentralized applications (DAPPs) data storage capabilities with unlimited scalability and fulfills services such as multi-chain data co-storage, cross-chain data management, data privacy protection, Proof of Recoverability of data (POR), Provable Data Possession (PDP), and distributed intelligent computing through logic decoupling and independent implementation of Lambda Chain and Lambda DB.',
	keywords: 'Lambda,Blockchain,Storage',
	pageId: 'indexEn'
};


module.exports = layout.init(pageConfig).run(content(pageConfig));
