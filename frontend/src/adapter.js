class Adapter {

    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getAll() {
        return fetch(this.baseUrl).then(r => r.json())
    }

    get(id) {
        return fetch(`${this.baseUrl}/${id}`).then(r => r.json())
    }

    options(method, body) {
        const object = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
        }
        if (body !== undefined) {
            object.body = JSON.stringify(body)
        }
        return object
    }

    post (body) {
        return fetch(`${this.baseUrl}`, this.options('POST', body)).then(r => r.json())
    }

    patch(id, body) {
        return fetch(`${this.baseUrl}/${id}`, this.options('PATCH', body)).then(r => r.json())
    }

    delete(id) {
        return fetch(`${this.baseUrl}/${id}`, this.options('DELETE')).then(r => r.json())
    }

    studentLogin(body){
        return fetch(`${this.baseUrl}/students/login`, this.options('POST', body)).then(r => r.json())
    }

    orgLogin(body){
        return fetch(`${this.baseUrl}/orgs/login`, this.options('POST', body)).then(r => r.json())
    }


}