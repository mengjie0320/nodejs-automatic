import fs from 'fs';
import https from 'https';
const imageUrls = ["https://cbu01.alicdn.com/img/ibank/O1CN01kEkgFX1zS96iC53hs_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01n5s4hA1zS9HUN0hc3_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01gJjngW1zS9DX1tYUi_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01CEPBF41zS96Z539bK_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01kEkgFX1zS96iC53hs_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01zqr4Z51zS9DkQcUix_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01bLhRfe1zS9DijMxXT_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01Kj7loZ1zS9DdLnzNk_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01y5E0bT1zS9DdJDSpy_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01qnv2Q11zS9HQoc9f2_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01n5s4hA1zS9HUN0hc3_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN018eS3l81zS9HSAaZRa_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01baa7Y61zS9HVnZtbk_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01YQoTRe1zS9HVWu1u7_!!2206708696712-0-cib.jpg","https://cbu01.alicdn.com/img/ibank/O1CN01n9JGqq1zS9HVLau6v_!!2206708696712-0-cib.jpg"]
const videoUrls = ["https://cloud.video.taobao.com/play/u/2206708696712/p/2/e/6/t/1/409304551688.mp4", "https://cloud.video.taobao.com/play/u/2206708696712/p/2/e/6/t/1/377130670021.mp4", "https://cloud.video.taobao.com/play/u/2206708696712/p/2/e/6/t/1/366075042078.mp4"];
const downloadImage = (url, filename) => {
  console.log('url', url);
  https.get(url, (response) => {
    response.pipe(fs.createWriteStream(filename));
  });
};
imageUrls.forEach((url, index) => {
  const filename = url.split('/').pop();
  downloadImage(url, `download/img/${filename}`);
});
videoUrls.forEach((url, index) => {
  const filename = url.split('/').pop();
  download(url, `download/video/${filename}`);
});

// // 通过url直接获取
// import cheerio from 'cheerio';
// // import http from 'http';
// const url = 'https://detail.1688.com/offer/657963441899.html';

function download(url, filename) {
  // const filename = path.basename(url);
  const file = fs.createWriteStream(filename);
  https.get(url, (res) => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${url} to ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(filename);
    console.error(err);
  });
}


// https.get(url, (res) => {
//   let html = '';
//   res.on('data', (chunk) => {
//     html += chunk;
//   });
//   res.on('end', () => {
//     const $ = cheerio.load(html);
//     $('img').each((i, el) => {
//       const src = $(el).attr('src');
//       console.log(src);
//       download(src, filename);
//       // downloadImage(src, `download/img/${src}.jpg`);
//     });
//     $('video').each((i, el) => {
//       const src = $(el).attr('src');
//       console.log(src);
//       download(src, filename);
//       // downloadImage(src, `download/video/${src}.jpg`);
//     });
//   });
// }).on('error', (err) => {
//   console.error(err);
// });




/*
// 浏览器中获取页面图片和视频地址
var imageSrcs = [];
var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
  var imageSrc = images[i].getAttribute('src');
  imageSrcs.push(imageSrc);
}
console.log(JSON.stringify(imageSrcs.filter(item => item.indexOf('http') !== -1)));
JSON.stringify(imageSrcs.filter(item => item.indexOf('http') !== -1).filter(item => item.indexOf('img.alicdn.com') === -1).filter(item =>item.indexOf('gw.alicdn.com') === -1));

var videoSrcs = [];
var videos = document.getElementsByTagName('video');
for (var i = 0; i < videos.length; i++) {
  var videoSrc = videos[i].getAttribute('src');
  videoSrcs.push(videoSrc);
}
console.log(JSON.stringify(videoSrcs.filter(item => item.indexOf('http') !== -1)));
*/

// https://cbu01.alicdn.com/img/ibank/O1CN01TQkCKW1zS9DlGM329_!!2206708696712-0-cib.jpg
