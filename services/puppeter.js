const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

async function func(id){
    let captionUrl = ''
    let global_browser = undefined;
    try{
    if(global_browser == undefined){
    global_browser = await puppeteer.launch({headless: false})
    }
    const page = await global_browser.newPage();
    await page.setDefaultNavigationTimeOut(0)
    await page.goto(`https://www.youtube.com/embed/${id}?autoplay=1`);

    await page.click('.ytp-subtitles-button')
    let listener = new Promise((res)=>{
        page.on('response', (response) => {

            if (response.url().startsWith('https://www.youtube.com/api/timedtext')) {
                captionUrl = response.url()
                res()
            }    
        })
        
    })
    await listener;
    
     await page.close();
}
catch(err){
    console.log(err)
}

    try{
        const response = await fetch(captionUrl);
        const data = await response.json()
        const captions = data.events;
        
        let captions_data = [];
        captions.forEach(caption => {
            let word = {
                time: caption.tStartMs,
                text: JSON.stringify(caption.segs)
            }
            captions_data.push(word);
        });
        
        return captions_data
    }
    catch(err){
        console.log(err)
    }
}

module.exports = func;