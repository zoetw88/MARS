const Nightmare=require('Nightmare');
const nightmare=Nightmare({show:true,width:1280,height:1024});
const util=require('util');
const fs =require('fs');

const jsdom=require('jsdom');
const { createPublicKey } = require('crypto');
const {JSDOM}=jsdom;
const {window}=new JSDOM()
const $=require('jquery')(window);

const writeFile=util.promisify(fs.writeFile)

const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'}

let arrLink=[];
let strKeyword='鴻海精密工業股份有限公司'

async function search(){
    console.log('進行檢索')
    await nightmare
    .goto("https://www.104.com.tw/jobs/search/?",headers)
    .type('input#keyword',strKeyword)
    .wait(2000)
    .wait()

async function asyncArray(functionList){
    for (let func of functionList){
        await func()
    }
}
try{
    asyncArray([search]).then(async()=>{
        console.dir(arrLink,{depth:null});




    })
}catch(err){
    throw err;
}