export const errorResponse = (statusCode = 200, body = {}) => {
	let errorMessage = 'Request error.';
	if (statusCode === 404) {
		errorMessage = 'Item not found.';
	}
	if (statusCode === 500) {
		errorMessage = 'Application error.';
	}
	body = { statusMessage: 'error', error: errorMessage, ...body };
	return {
		status: statusCode,
		body: JSON.stringify(body),
	};
};

const apiPath = (baseUrl, path) => (baseUrl.endsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`);

export const send = async ({ method, path, data, token, baseUrl = '/api' }) => {
	const options = { method, headers: {} };

	if (data) {
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify(data);
	}

	if (token) options.headers['Authorization'] = token;

	// if (includeCredentials) options.credentials = 'include';

	try {
		const response = await fetch(apiPath(baseUrl, path), options);
		const text = await response.text();

		if (!response.ok || (!response.status !== 204 && !text)) {
			console.error('API ERROR - url:', baseUrl + path, ', response:', response);
			let errorMessage = response.statusText;
			let parsedText = '';
			try {
				parsedText = JSON.parse(text);
				if (parsedText.error) errorMessage = parsedText.error;
				if (parsedText.error_description) errorMessage = parsedText.error_description;
				if (parsedText.msg) errorMessage = parsedText.msg;
				if (parsedText.message) errorMessage = parsedText.message;
			} catch (error) {
				console.error('API response parsing error. Response:', text);
			}
			throw { status: response.status, message: errorMessage, text: parsedText };
		}

		try {
			// try to parse response into JSON object
			return { statusMessage: 'success', ...JSON.parse(text) };
		} catch (err) {
			// if unsuccessful, use text fallback
			return { statusMessage: 'success', body: text };
		}
	} catch (error) {
		console.error('API Error:', error);
		const errorMessage = error.message || 'Unable to process the request.';
		return { statusMessage: `error (${error.status})`, error: errorMessage };
	}
};

export const get = async (path, token, baseUrl) => {
	return await send({ method: 'GET', path, token, baseUrl });
};

export const del = async (path, data, token, baseUrl) => {
	return await send({ method: 'DELETE', path, data, token, baseUrl });
};

export const post = async (path, data, token, baseUrl) => {
	return await send({ method: 'POST', path, data, token, baseUrl });
};

export const put = async (path, data, token, baseUrl) => {
	return await send({ method: 'PUT', path, data, token, baseUrl });
};

export const patch = async (path, data, token, baseUrl) => {
	return await send({ method: 'PATCH', path, data, token, baseUrl });
};
