const func = require('../puppeter');

const videoProcess = async (job) => {
    console.log(job.data)
    try{
      let result = await func(job.data.url)
      console.log(result)
    }
    catch(err){
       throw err
    }
    // console.log(job.data)
}

module.exports = videoProcess;