const dotenv = require('dotenv')
const aws = require('aws-sdk')
const crypto = require('crypto')
const {promisify} = require('util')

// import dotenv from 'dotenv'
// import aws from 'aws-sdk'
// import crypto from 'crypto'
// import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-2"
const bucketName = "givn-images"
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({ //create S3 bucket object
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

const generateUploadURL = async () => {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

module.exports = { generateUploadURL }