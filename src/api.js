const url = `http://localhost:3000`;
const params = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
};

function get (url, data = {}) {
    url = new URL(url);
    Object.keys(data).forEach(key => url.searchParams.append(key, data[key]));
    return fetch(url, {
        method: 'GET',
        ...params
    })
        .then(async response => {
            return response.json()
        })
}

function post (url, data = {}) {
    url = new URL(url);
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        ...params
    })
        .then(response => response.json())
}

function patch (url, data = {}) {
    return fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        ...params
    })
        .then(response => response.json())
}

function put (url, data = {}) {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        ...params
    })
        .then(response => response.json())
}

function del (url) {
    return fetch(url, {
        method: 'DELETE',
        ...params
    })
        .then(response => response.json())
}

export function getParcels (data) {
    return get(`${ url }/parcels/`, data)
}

export function getParcel (id) {
    return get(`${ url }/parcels/${ id }/`)
}

export function createParcel (data) {
    return post(`${ url }/parcels/`, data)
}

export function editParcel (id, data, partly = false) {
    const path = `${ url }/parcels/${ id }/`;

    return (partly) ? patch(path, data) : put(path, data);
}

export function deleteParcel (id) {
    return del(`${ url }/parcels/${ id }/`)
}
