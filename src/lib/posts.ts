import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedPosts() {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('en', {
		year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
	}).format(date);
}

// Only summaries reach the React island; Markdown stays on the server.
export function toPostSummary(post: CollectionEntry<'blog'>) {
	return {
		href: `/blog/${post.id}`,
		title: post.data.title,
		description: post.data.description,
		date: post.data.pubDate.toISOString(),
		displayDate: formatDate(post.data.pubDate),
	};
}

export type PostSummary = ReturnType<typeof toPostSummary>;
