const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const captionFilter = require('./services/caption');
const getVideoCaptions = require('./services/queues/video.queue')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
let url = ''
let result;


app.get('/video/:id', async (req, res) => {
  id = req.params.id
  try{
    await getVideoCaptions(id);
    res.status(200).send({msg: 'ok'})
  }
  catch(err){
    console.log(err)
  }
})


app.get('/:id', async (req, res) => {
  let word = req.params.id

  try{
    let captions = await captionFilter(result, word)
    res.send(captions);
  }
  catch(err) {
    console.log(err)
  }
  
  
})

// workQueue.on('global:completed', (jobId, result) => {
//   console.log(`Job completed with result ${result}`);
// });

const PORT = process.env.PORT || 4000


app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
})