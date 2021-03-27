const jwt = require('jsonwebtoken')
const config = require('../config');
const moment = require('moment')

const secret = config.key.jwtSecret

const create = (payloadData) => {
  return new Promise((resolve, reject) => {
    let payload = {
      ...payloadData,
      expirationDate: moment().add(3, 'minutes').format(),
    }
    jwt.sign(payload, secret, {}, (error, token) => {
      if (error) return reject(error)
      return resolve({...payload, token})
    })
  })
}

const verify = (token, options) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (error, payload) => {
      if (error) return reject(error)
      return resolve(payload)
    })
  })
}

const obtain = (token) => {
  return new Promise((resolve, reject) => {
    if (token)
      jwt.verify(token, secret, (error, payload) => {
        if (error) return reject(error)
        return resolve(payload)
      })
    else
      return reject({success: false, message: 'Token not provided'})
  })
}


module.exports = {
  jwt: {
    create, verify, obtain
  }
}
