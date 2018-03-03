const baseUrl = process.env.REACT_APP_BACKEND;

let headers = {
    'Authorization': 'whatever-you-want'
}

if (!baseUrl.includes('localhost')) {
    headers.credentials= 'include';
}

export function loadCategories() {
    const url = `${baseUrl}/categories`;
    return fetch(url, { headers})
        .then((res) => {
            return (res.text())
        })
        .then((data) => {
            return JSON.parse(data);
        });
}