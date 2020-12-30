const nodejieba = require('nodejieba');
const path = require('path');
const fs = require('fs');
const search = require('./search_model');
const dictPath = path.join(__dirname, '../../server/alogrithm/ti-idf/dict.txt');
const stopPath = path.join(__dirname, '../../server/alogrithm/ti-idf/stop_text');

nodejieba.load({
  dict: dictPath,
});

const searchKeywords = async (company, title) => {
  try {
    const stopWord = fs.readFileSync(stopPath).toString();
    const stopWordlist = Array.from(stopWord);
    const mainWordlist = [];
    const counter = {};
    let counts = 1;
    const result = [];

    const mainComments = await search.extractComments(company, title);
    const comparedComments = await search.extractAllComments();


    const commentsCombination = mainComments.map((comment) => {
      let str;
      str += comment.interview_experience.toString();
      return str;
    });

    const afterTokenize = nodejieba.cut(commentsCombination.toString());
    afterTokenize.map((word) => {
      if (counter[word] === undefined && stopWord.indexOf(word) < 0) {
        mainWordlist.push(word);
        counter[word] = {
          tf: 1,
          df: 0,
        };
      }
      if (counter[word]) {
        counter[word].tf += 1;
      }
      counts = counts + 1;
    });

    const comparedWordlist = comparedComments.map((comment) => {
      const tempcounts = {};
      const tokens = nodejieba.cut(comment.interview_experience);
      tokens.map((token) => {
        if (tempcounts[token] === undefined) {
          tempcounts[token] = true;
        }
      });
      return tempcounts;
    });

    mainWordlist.map((word) => {
      const checkStopWord = stopWordlist.indexOf(word);
      const key = word;
      comparedWordlist.map((word) => {
        if (word[key] && checkStopWord < 0) {
          counter[key].df++;
        }
      });
    });

    mainWordlist.map((word) => {
      counter[word].tfidf = counter[word].tf / counts * Math.log(mainComments.length / counter[word].df);
    });

    mainWordlist.sort(compare);

    /**
 * compare word's tiidf
 * @param {string} a
 * @param {string} b
 * @return {int}
 *
 */
    function compare(a, b) {
      const countA = counter[a].tfidf;
      const countB = counter[b].tfidf;
      return countB - countA;
    }

    mainWordlist.map((word) => {
      finalWordlist = {};
      if ((counter[word].tfidf) < 1 && 0.0038 < (counter[word].tfidf)) {
        finalWordlist = word;
        result.push(finalWordlist);
      }
    });

    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  searchKeywords,
};
