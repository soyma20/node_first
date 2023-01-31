const S3 = require('aws-sdk/clients/s3')
const uuid = require('uuid').v4

const {
    AWS_S3_ACCESS_KEY,
    AWS_S3_BUCKET,
    AWS_S3_REGION,
    AWS_S3_SECRET_KEY,
    AWS_S3_BUCKET_URL
} = require('../constants/config')

const BUCKETConfig = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY,
})

const uploadFile = async (file, itemType, itemId) => {
    const Key = _buildFilePath(file.name, itemType, itemId);
    return BUCKETConfig
        .upload({
            Bucket: AWS_S3_BUCKET,
            Key,
            ContentType: file.mimetype,
            ACL: 'public-read',
            Body: file.data
        }).promise()
}
const updateFile = async (file, fileURL) => {
    const Key = fileURL.split(AWS_S3_BUCKET_URL).pop();
    return BUCKETConfig
        .putObject({
            Bucket: AWS_S3_BUCKET,
            Key,
            ContentType: file.mimetype,
            ACL: 'public-read',
            Body: file.data
        }).promise()
}
const deleteFile = async (file, fileURL) => {
    const Key = fileURL.split(AWS_S3_BUCKET_URL).pop();
    return BUCKETConfig
        .deleteObject({
            Bucket: AWS_S3_BUCKET,
            Key,
        }).promise()
}



module.exports = {
    updateFile,
    uploadFile,
    deleteFile,
}

function _buildFilePath(fileName, itemType, itemId) {
    const ext = fileName.split('.').pop();

    return itemType + '/' + itemId + '/' + uuid() + '.' + ext
}
