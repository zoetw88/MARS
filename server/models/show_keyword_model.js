const nodejieba = require("nodejieba");
const path = require('path')
const fs = require('fs');
const {
  extract_comments_title,
  extract_comments_company,
  extract_comments_single
} = require("./comment_model")
const {
  count
} = require("console");
const { data } = require("jquery");

const dict_path = path.join(__dirname, '../../server/alogrithm/ti-idf/dict.txt')
const stop_path = path.join(__dirname, '../../server/alogrithm/ti-idf/stop_text')

nodejieba.load({
  dict: dict_path
})

async function keyword(company,title) {
  try {
    
    let words = [];
    let counter = {};
    let counts = 1;
    let str;
    let tf;
    let result = [];
    let final_word;
    let othercounts = [];
    let y = [];
    const array = fs.readFileSync(stop_path).toString();

    result_comment = await extract_comments_company(company, title)
    result_total_comment = await extract_comments_title(title)

    for (let i = 0; i < result_comment.result.length; i++) {
      str += result_comment.result[i].interview_experience.toString()
    }

    let afterTokenize = nodejieba.cut(str)

    afterTokenize.map(word => {
      if (counter[word] === undefined && array.indexOf(word) < 0) {
        words.push(word)
        counter[word] = {
          tf: 1,
          df: 0
        }
      }
      if (counter[word]) {
        counter[word].tf += 1
      }
      counts = counts + 1;
    })



    for (let j = 1; j < result_total_comment.result.length; j++) {
      let tempcounts = {};
      let tokens = nodejieba.cut(result_total_comment.result[j].interview_experience)
      for (let k = 0; k < tokens.length; k++) {
        let w = tokens[k];
        if (tempcounts[w] === undefined) {
          tempcounts[w] = true;
        }
      }
      othercounts.push(tempcounts);
    }

    for (let g = 0; g < array.length; g++) {
      y.push(array[g])
    }


    for (let i = 0; i < words.length; i++) {
      const key = words[i];
      var a = y.indexOf(key)
      for (let j = 0; j < othercounts.length; j++) {
        let tempcounts = othercounts[j];
        if (tempcounts[key] && a < 0) {
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
      final_word={}
      
      if ((counter[key].tfidf) < 1 && 0.0038 < (counter[key].tfidf)) {
      
        // console.log(key + ' ' + counter[key].tfidf);
  
        final_word['keyword']=key
       
       
      }
      result.push(final_word)
    }
    return result

  } catch (error) {
    return error
  }
}

module.exports = {
  keyword
}
