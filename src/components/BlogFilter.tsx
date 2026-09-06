import { useEffect, useState } from 'react';
import type { PostSummary } from '../lib/posts';

interface Props {
	posts: PostSummary[];
	labels: {
		label: string;
		placeholder: string;
		empty: string;
		noResults: string;
	};
}

export default function BlogFilter({ posts, labels }: Props) {
	const [query, setQuery] = useState('');
	const [ready, setReady] = useState(false);
	useEffect(() => setReady(true), []);

	const search = query.trim().toLowerCase();
	const filtered = posts.filter((post) =>
		`${post.title} ${post.description}`.toLowerCase().includes(search),
	);

	return (
		<div>
			<div className="mb-8 max-w-md">
				<label htmlFor="blog-search" className="mb-2 block text-sm font-medium">{labels.label}</label>
				<input
					id="blog-search"
					type="search"
					value={query}
					disabled={!ready}
					onChange={(event) => setQuery(event.target.value)}
					placeholder={labels.placeholder}
					aria-controls="blog-results"
					className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-base disabled:opacity-50"
				/>
			</div>
			<div id="blog-results" aria-live="polite" aria-atomic="true">
				{filtered.length === 0 ? (
					<p className="py-6 text-neutral-600">{posts.length === 0 ? labels.empty : labels.noResults}</p>
				) : (
					<ul className="divide-y divide-neutral-200 border-t border-neutral-200">
						{filtered.map((post) => (
							<li key={post.href} className="py-6">
								<article>
									<time dateTime={post.date} className="text-sm text-neutral-500">{post.displayDate}</time>
									<h2 className="mt-2 text-xl font-medium tracking-tight">
										<a href={post.href} className="hover:underline underline-offset-4">{post.title}</a>
									</h2>
									<p className="mt-2 leading-relaxed text-neutral-600">{post.description}</p>
								</article>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}
