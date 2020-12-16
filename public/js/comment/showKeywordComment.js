const { count } = require("console");
const nodejieba = require("nodejieba");
const {
  extract_comments,
  extract_comments_company
} = require("../../../models/comment_model")


nodejieba.load({
  dict: './dict.txt'
})
const words = [];
const counter = {};
const tf = {};
let counts = 1;
let array=[];
async function test() {
  try {
    let str;

    let tf;
    // console.log('ok')
    result_comment = await extract_comments('台灣積體電路製造股份有限公司', '製程工程師')
    result__total_comment = await extract_comments_company('台灣積體電路製造股份有限公司')
    console.log(result__total_comment.result.length)
    for (let i = 0; i < result_comment.result.length; i++) {
      str += result_comment.result[i].interview_experience.toString()
    }

    // console.log(str)
    let test1 = nodejieba.cut(str)
    // console.log(test1)
    let test2 = nodejieba.extract(str, 50) /

      test1.map(word => {
        
        if (counter[word] === undefined) {
          words.push(word)

          counter[word] = {
            tf: 1,
            df: 0
          }
        } else {
          counter[word].tf += 1

        }
        counts = counts + 1;
      })


    let othercounts = [];
    for (let j = 1; j < result__total_comment.result.length; j++) {
      let tempcounts = {};
      let tokens = nodejieba.cut(result__total_comment.result[j].interview_experience)
      for (let k = 0; k < tokens.length; k++) {
        let w = tokens[k];
        if (tempcounts[w] === undefined) {
          tempcounts[w] = true;
        }
      }
      othercounts.push(tempcounts);
    }
    const fs = require('fs');
    const array = fs.readFileSync('./stop_text').toString();
    console.log(array[1])
    var y=[];
    for (let g=0;g<array.length;g++){
      
      y.push(array[g])
    }
    console.log(y)

    for (let i = 0; i < words.length; i++) {
      const key = words[i];
      var a= y.indexOf(key)
    
      for(let j = 0; j < othercounts.length; j++) {
        let tempcounts = othercounts[j];
        if (tempcounts[key]&& a<0) {
          counter[key].df++;
          
        }
      }
    }
    
    for (let i = 0; i < words.length; i++) {
      let key = words[i];
     
      counter[key].tfidf = counter[key].tf / counts * Math.log(result_comment.result.length / counter[key].df);
    }

    words.sort(compare);

    function compare(a, b) {
      let countA = counter[a].tfidf;
      let countB = counter[b].tfidf;
      return countB - countA;
    }

    for (var i = 0; i < words.length; i++) {
      let key = words[i];
      
        if((counter[key].tfidf)<1){
        console.log(key + ' ' + counter[key].tfidf);
      }
    }

  } catch (error) {
    console.log(error)
  }
}

test()
