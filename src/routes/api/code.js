export async function post({ request }) {
	try {
		const { email } = await request.json();

		const code = (Math.floor(Math.random() * 899999) + 100000).toString();

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
