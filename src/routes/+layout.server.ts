/* eslint-disable no-console */
import type { LayoutServerLoad } from './$types';

const ignoreSupabaseWarnings = () => {
	const conWarn = console.warn;
	const conLog = console.log;

	const IGNORE_WARNINGS = [
		'Using supabase.auth.getSession() is potentially insecure',
		'Using the user object as returned from supabase.auth.getSession()',
	];

	console.warn = function (...args) {
		const match = args.find((arg) =>
			typeof arg === 'string' ? IGNORE_WARNINGS.find((warning) => arg.includes(warning)) : false,
		);
		if (!match) {
			conWarn(...args);
		}
	};

	console.log = function (...args) {
		const match = args.find((arg) =>
			typeof arg === 'string' ? IGNORE_WARNINGS.find((warning) => arg.includes(warning)) : false,
		);
		if (!match) {
			conLog(...args);
		}
	};
};

export const load: LayoutServerLoad = async ({ locals: { session }, fetch, depends }) => {
	ignoreSupabaseWarnings();

	return {
		session,
	};
};
