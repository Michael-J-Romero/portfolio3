import allContentText from './allContent.json?raw';

type ContentLink = {
	label: string;
	href: string;
};

export type AllContent = {
	[key: string]: any;
	closing: {
		contact: {
			sectionId: string;
			eyebrow: string;
			heading: string;
			body: string;
			availability: string;
			actions: Array<{
				id: string;
				label: string;
				href: string;
			}>;
		};
		footer: {
			name: string;
			roles: string;
			description: string;
			email: ContentLink;
			links: ContentLink[];
			footline: string;
		};
	};
};

const allContent = JSON.parse(allContentText) as AllContent;

export default allContent;