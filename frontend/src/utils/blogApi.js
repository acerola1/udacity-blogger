const headers = {

}

const baseUrl = process.env.REACT_APP_BACKEND;

export function loadCategories() {
    const url = `${baseUrl}/categories`;
    return fetch(url, { headers: { 'Authorization': 'whatever-you-want' }, })
        .then((res) => {
            return (res.text())
        })
        .then((data) => {
            return JSON.parse(data);
        });
}