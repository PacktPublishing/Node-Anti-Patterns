import Express from 'express'
import jose from 'node-jose'
import { createSign } from 'node:crypto'

console.log(`Creating key store...`)
const keyStore = jose.JWK.createKeyStore()

console.log(`Generating keys`)
await keyStore.generate('RSA', 2048, { alg: 'RS512', use: 'sig' })
console.log(`Keys generated: ${JSON.stringify(keyStore.toJSON(true), null, 2)}`)

const app = Express()

function signData(data) {
    const signingKey = keyStore.all({ use: 'sig' })[0]
    if (!signingKey) throw new Error('Could not find signing key, did you initialized the keyStore?');

    const signer = createSign('RSA-SHA512')
    const signature = signer.update(Buffer.from(data)).sign(signingKey.toPEM(true), 'hex')

    return { data, keyId: signingKey.kid, signature }
}

const signingMiddleware = (_req, res, next) => {
    const signed = signData(Date.now().toString())
    res.setHeader('X-Signature', `data=${signed.data.toString()};kid=${signed.keyId};sha512=${signed.signature}`)
    next()
}

app.use(signingMiddleware)
app.get('/signed', (req, res) => {
    res.json({
        message: 'This is a signed request',
        signature: res.getHeader('X-Signature')
    })
})

app.listen(3000, () => console.info('Server listening on port 3000'))
