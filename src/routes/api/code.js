export async function post({ request }) {
	try {
		const { email } = await request.json();

		const code = import.meta.env.VITE_TEST;

		if (email !== 'test@domain.com')
			return {
				status: 400,
				body: { message: 'wrong email address. use test@domain.com.' },
			};

		return {
			status: 200,
			body: { message: `Your code is ${code}.` },
		};
	} catch (e) {
		console.error('Error generating code:', e);
		return {
			status: 400,
			body: { message: 'Error generating code: ' + (e.message || 'unknown server error') },
		};
	}
}
