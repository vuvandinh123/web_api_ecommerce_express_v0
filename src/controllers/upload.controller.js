
const cloudinary = require('cloudinary').v2;

const uploadImages = async (images) => {
    try {
        const uploadPromises = images.map(async (image) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'products',
                        public_id: Date.now() + '-' + Math.round(Math.random() * 1E9),
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) {
                            console.error(error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                ).end(image.buffer);
            });
        });

        return await Promise.all(uploadPromises);
    } catch (error) {
        throw new Error(`Upload failed: ${error.message}`);
    }
};

const uploads = async (req, res) => {
    try {
        if(req.file){
            const uploadResults = await uploadImages([req.file]);
            const urls = uploadResults.map(item => item.url)
            res.send({ status: 200, message: "upload successfully", data: urls });
        }
        else if(req.files){
            const uploadResults = await uploadImages(req.files);
            const urls = uploadResults.map(item => item.url)
            res.send({ status: 200, message: "upload successfully", data: urls });
        }
       else{
           res.send({ status: 400, message: "upload failed" });
       }
    } catch (error) {
        res.status(500).send({ 'UploadFailed': error.message });
    }
};

module.exports = {
    uploads
}