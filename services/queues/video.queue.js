const Bull = require('bull');
const {REDIS_URL} = require('../config/index');
const videoProcess = require('../processes/video.process');

const videoQueue = new Bull('video', {
    redis: REDIS_URL
});

videoQueue.process(videoProcess)

videoQueue.on('completed', async (jobId, result) => {
   let response = await jobId.toJSON()
   console.log('Job completed', response.id)
})

const getVideoCaptions = (url) => { 
    console.log('enetered')   
    videoQueue.add({url: url})
}

module.exports = getVideoCaptions;