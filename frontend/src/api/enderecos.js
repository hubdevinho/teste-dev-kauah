import client from "./client";

export function listEnderecos(params = {}) {
    return client.get('/enderecos', { params }).then((res) => res.data)
}

export function createEndereco(dados) {
    return client.post('/enderecos', dados).then((res) => res.data)
}

export function updateEndereco(id, dados) {
    return client.put(`/enderecos/${id}`, dados).then((res) => res.data)
}

export function deleteEndereco(id) {
    return client.delete(`/enderecos/${id}`).then((res) => res.data)
}