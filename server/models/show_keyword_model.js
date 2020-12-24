const nodejieba = require("nodejieba");
const path = require('path')
const fs = require('fs');
const {
  extract_comments_title,
  extract_comments_company,
} = require("./comment_model")

const _ = require('lodash');

const dict_path = path.join(__dirname, '../../server/alogrithm/ti-idf/dict.txt')
const stop_path = path.join(__dirname, '../../server/alogrithm/ti-idf/stop_text')

nodejieba.load({
  dict: dict_path
})

async function keyword(company, title) {
  try {
    const stop_word = fs.readFileSync(stop_path).toString();
    let stop_word_list = Array.from(stop_word)
    let single_wordlist = [];
    let counter = {};
    let counts = 1;
    let str;
    let result = [];
    let final_word;

    result_comments = await extract_comments_company(company, title)
    result_total_comments = await extract_comments_title(title)

    let combine_comments = result_comments.result.map(comment => {
      str += comment.interview_experience.toString()
      return str
    })

    let afterTokenize = nodejieba.cut(combine_comments.toString())
    afterTokenize.map(word => {
      if (counter[word] === undefined && stop_word.indexOf(word) < 0) {
        single_wordlist.push(word)
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

    let total_wordlist = result_total_comments.result.map(comment => {
      let tempcounts = {};
      let tokens = nodejieba.cut(comment.interview_experience)
      tokens.map(token => {
        if (tempcounts[token] === undefined) {
          tempcounts[token] = true
        }
      })
      return tempcounts
    })

    single_wordlist.map(word => {
      let check_stop_word = stop_word_list.indexOf(word)
      let key = word
      total_wordlist.map(word => {
        if (word[key] && check_stop_word < 0) {
          counter[key].df++;
        }
      })
    })

    single_wordlist.map(word => {
      counter[word].tfidf = counter[word].tf / counts * Math.log(result_comments.result.length / counter[word].df);
    })

    single_wordlist.sort(compare);

    function compare(a, b) {
      let countA = counter[a].tfidf;
      let countB = counter[b].tfidf;
      return countB - countA;
    }

    single_wordlist.map(word => {
      final_word = {}
      if ((counter[word].tfidf) < 1 && 0.0038 < (counter[word].tfidf)) {
        final_word['keyword'] = word
      }
      result.push(final_word)

    })
    
   return result

  } catch (error) {
    return error
  }
}

module.exports = {
  keyword
}
