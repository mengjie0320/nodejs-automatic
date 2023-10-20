import fs from 'fs';
import glob from 'glob';
import path from 'path';
// const fs = require('fs')
// const glob = require('glob')
// const path = require('path')
// const path = './proto2tstype/';
// const data = fs.readFileSync( path, options )

const typeArr = [
  {
    type: 'uint32 ',
    value: ': number',
  },
  {
    type: 'uint64 ',
    value: ': number',
  },
  {
    type: 'int32 ',
    value: ': number',
  },
  {
    type: 'int64 ',
    value: ': number',
  },
  {
    type: 'string ',
    value: ': string',
  },
  {
    type: 'bool ',
    value: ': boolean',
  }
]


const files = glob.sync('./proto2tstype/*.proto')
for (const file of files) {
  const filePath = path.resolve(process.cwd(), file)
  const text = fs.readFileSync(filePath, { encoding: 'utf-8' });
  // console.log('filePath - text', filePath, ' : ', text);
  // const arr = text.split('\n')
  // text.replaceAll
  const arr = text.split('\n');
  // console.log('arr', arr);

  const resArr = [];
  for(let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf('message ') !== -1 && arr[i].indexOf(' {') !== -1) {
      resArr.push(arr[i].replace('message', 'export interface'));
      for (let j = i + 1; j < arr.length; j++) {
        // 终止
        let replaceK = arr[j].replace(' ', '');
        if (!replaceK || replaceK === '}') {
          resArr.push(replaceK);
          resArr.push('');
          i = j + 1;
          break;
        }
        let paramText = arr[j];
        console.log('paramText', paramText);
        // 是否数组 
        let isRepeat = paramText.indexOf('repeated ') !== -1;
        paramText = paramText.replace('repeated ', '');
        // 普通类型
        typeArr.forEach((eachType) => {
          if(paramText.indexOf(eachType.type) !== -1) {
            paramText = paramText.replace(eachType.type, '');
            paramText = paramText.replace(/[\s]*[=][\s+\]*[0-9]{1,}/, isRepeat ? `: Array<${eachType.value.split(' ')[1]}>` : eachType.value);
          }
        })
        // 以其他为基础类型
        console.log(paramText, paramText.indexOf(': '));
        if (paramText.indexOf(': ') === -1 && paramText.match(/[A-Z][A-Za-z0-9]{1,}[\s]/)) {
          console.log('paramText.match(/[A-Z][A-Za-z0-9]{1,}[\s]/)', paramText.match(/[A-Z][A-Za-z0-9]{1,}[\s]/));
          console.log('  ');
          let mR = paramText.match(/[A-Z][A-Za-z0-9]{1,}[\s]/)[0], mRt = mR ? mR.split(' ')[0]: '';
          paramText = paramText.replace(mR, '');
          paramText = paramText.replace(/[\s]*[=][\s+\]*[0-9]{1,}/, isRepeat ? `: Array<${mRt}>` : `: ${mRt}`);
        }
        // 替换大小写
        // resArr.push(paramText.match);
        if (paramText.indexOf('_') !== -1 && paramText.match(/[_][a-z0-9]/)) {
          let mR = paramText.match(/[_][a-z0-9]/)[0], mRt = mR.split('_')[1];
          paramText = paramText.replace(mR, mRt.toUpperCase());
        }
        resArr.push(paramText);
      }
    }
  }
  console.log('resArr.join(\n)', resArr.join("\n"));
}

