function resolveResponse(response) {
	if (response.status === 200) {
	  return response.json();
	}

	if (response.status === 404) {
	  throw new Error('Error 404');
	}

	throw new Error('Ooops, Server error!');
}

function fetchData(url, setData, setError){
    return fetch(url)
    .then(response => resolveResponse(response))
    //.then(response => response.json())
    .then(nasaData => setData(nasaData))
    .catch((error) => setError(error.toString()))
}

export { fetchData };