export default async(url, method, options = {}) => {

    let httpRequest
    if (method.toUpperCase === 'GET') {
        httpRequest = await fetch(url, {
            cache: 'reload',
            ...options
        })
    } else {
        httpRequest = await fetch(url, {
            method: method.toUpperCase(),
            cache: 'reload',
            ...options
        })
    }
    return (type) => {
        switch (type.toUpperCase()) {
            case 'json':
                return httpRequest.json()
            case 'blob':
                return httpRequest.blob()
            case 'text':
                return httpRequest.text()
            case 'formdata':
                return httpRequest.formData()
            default:
                return httpRequest.arrayBuffer()
        }
    }

}