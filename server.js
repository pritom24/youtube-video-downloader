const express = require("express");
const app = express();
const ytdl = require("ytdl-core");
const cors = require("cors");
const {chain, forEach} = require("lodash")
const port = 5000;

app.use(express.json());
app.use(cors());
const getResu = (formats)=>{
  let resuArray = []
  for (let i =0; i<formats.length; i++){
    if(formats[i].qualityLabel !== null){
      resuArray.push(formats[i])
    }
  }
  return [...new Set(resuArray.map(v=>v.height))]
}
app.get("/api/get-video-info/:videoId", async (req, res) => {

    const { videoId } = req.params;
    const {videoDetails, formats} = await ytdl.getInfo(videoId);
    const {title, thumbnails} = videoDetails
    const videoResu = getResu(formats)
    return res.json({
      videoInfo:{
          title,
          thumbnailUrl: thumbnails[thumbnails.length-1].url,
          videoResu,
          lastResu: videoResu[0]
      }
    })
});
app.get('/video-download', async(req, res)=>{
  const {id, resu} = req.query
  try {
    const {videoDetails: {titile}, formats} = await ytdl.getInfo(id);
    const
  } catch (error) {
    
  }
})

app.listen(port, () => {
  console.log(`succesfully connected at port ${port}`);
});

//Run app, then load http://localhost:port in a browser to see the output.
