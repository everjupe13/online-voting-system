import baseFetch from './baseFetch'

export const getHttp = async(url, type = 'json', options) => (
    await baseFetch(url, 'get', options)
)(type)

export const postHttp = async(url, body, type = 'json', options) => (
    await baseFetch(url, 'post', {
        body,
        ...options
    })
)(type)

export const putHttp = async(url, body, type = 'json', options) => (
    await baseFetch(url, 'put', {
        body,
        ...options
    })
)(type)

export const patchHttp = async(url, body, type = 'json', options) => (
    await baseFetch(url, 'patch', {
        body,
        ...options
    })
)(type)

export const updateHttp = async(url, body, type = 'json', options) => (
    await baseFetch(url, 'update', {
        body,
        ...options
    })
)(type)

export const deletettp = async(url, body, type = 'json', options) => (
    await baseFetch(url, 'delete', {
        body,
        ...options
    })
)(type)
