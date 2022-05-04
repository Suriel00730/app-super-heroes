
const fakeLoginRequest = ({ email, password }) => {
    return new Promise((response, reject) => {
        setTimeout(() => {
            // if (email === 'challenge@alkemy.org' && password === 'react') {
            if (email === 'programador@react.com' && password === 'react') {
                const data = {
                    token: 'LOGED_IN_SUCESSFULLY'
                }
                response(data)
            } else {
                const err = new Error('Email o password incorrecto')
                reject(err)
            }
        }, 3000);
    })
}

export default fakeLoginRequest;