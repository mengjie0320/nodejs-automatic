// const pandoc = require('pandoc');
import pandoc from 'pandoc';
import fs from 'fs';
import glob from 'glob';
import path from 'path';
// 将 Word 文档转换为 Markdown 格式

const files = glob.sync('./word2md/word/*.docx')
for (const file of files) {
  // console.log('file', file);
  const filePath = path.resolve(process.cwd(), file);
  // console.log('filePath', filePath);
  const toFilePath = filePath.replace('docx', 'md');
  console.log('filePath, toFilePath', filePath, toFilePath);
  // const filename = path.basename(file);
  // console.log(filename);

  // pandoc.('markdown', filePath, ['-o', toFilePath], (err, result) => {
  //   if (err) console.log('err', err);;
  //   console.log('转换成功');
  // });
  // pandoc(filePath, 'markdown', ['-o', toFilePath], (err, result) => {
  //   if (err) console.log('err', err);;
  //   console.log('转换成功');
  // });
}


// https://word2md.com/