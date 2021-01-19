const nodeJieba = require('nodejieba');
const path = require('path');
const fs = require('fs');
const search = require('../../models/search_model');
const dictPath = path.join(__dirname, './dict.txt');
const stopPath = path.join(__dirname, './stop_text');

nodeJieba.load({
  dict: dictPath,
});

const searchKeywords = async (company, title, counts = 1) => {
  const stopWord = fs.readFileSync(stopPath).toString();
  const stopWordlist = Array.from(stopWord);
  const mainWordlist = [];
  const counter = {};
  const result = [];
  const mainComments = await search.extractComments(company, title);
  const comparedComments = await search.extractAllComments();
  console.log(mainComments)
  
if(mainComments.length>0){
  const commentsCombination = mainComments.map((comment) => {
    let str;
    str += comment.interview_experience.toString();
    return str;
  });

  const afterTokenize = nodeJieba.cut(commentsCombination.toString());
  
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
    const comparedWordCounts = {};
    const comparedWords = nodeJieba.cut(comment.interview_experience);
    comparedWords.map((word) => {
      if (comparedWordCounts[word] === undefined) {
        comparedWordCounts[word] = true;
      }
    });
    return comparedWordCounts;
  });

  mainWordlist.map((word) => {
    const checkStopWord = stopWordlist.indexOf(word);
    comparedWordlist.map((comparedword) => {
      if (comparedword[word] && checkStopWord < 0) {
        counter[word].df++;
      }
    });
    counter[word].tfidf = counter[word].tf / counts * Math.log(mainComments.length / counter[word].df);
    finalWordlist = {};
    if ((counter[word].tfidf) < 1 && 0.001 < (counter[word].tfidf)) {
      finalWordlist = word;
      result.push(finalWordlist);
    }
  });

  return result;
}
};

module.exports = {
  searchKeywords,
};
