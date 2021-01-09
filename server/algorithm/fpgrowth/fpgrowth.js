const {EventEmitter} = require('events');
const {FPTree} = require('./fptree');


class FPGrowth extends EventEmitter {
  constructor(support) {
    super();
    this.support=support;
    this.itemsets = [];
  }

  exec(transactions, callback) {
    this.transactions = transactions;
    this.support = Math.ceil(this.support * transactions.length);
    const supports = this.getDistinctItemsCount(this.transactions);
    return new Promise((resolve, reject) => {
      const tree = new FPTree(supports, this.support).fromTransactions(this.transactions);
      const result = this.fpGrowth(tree, this.transactions.length);
      if (callback) {
        callback(result);
      }
      resolve(result);
    });
  }

  fpGrowth(tree, prefixSupport, prefix = []) {
    return tree.headers.reduce((itemsets, item) => {
      const support = Math.min(tree.supports[JSON.stringify(item)], prefixSupport);
      const currentPrefix = prefix.slice(0);
      currentPrefix.push(item);
      itemsets.push(this.getFrequentItemset(currentPrefix, support));
      const childTree = tree.getConditionalFPTree(item);
      if (childTree) {
        return itemsets.concat(this.fpGrowth(childTree, support, currentPrefix));
      }
      return itemsets;
    }, []);
  }

  handleSinglePath(singlePath, prefix) {
    return [];
  }

  getFrequentItemset(itemset, support) {
    const ret = {
      items: itemset,
      support: support,
    };
    this.emit('data', ret);
    return ret;
  }

  getDistinctItemsCount(transactions) {
    return transactions.reduce((count, arr) => {
      return arr.reduce((count, item) => {
        count[JSON.stringify(item)] = (count[JSON.stringify(item)] || 0) + 1;
        return count;
      }, count);
    }, {});
  }
}

module.exports = {FPGrowth};
