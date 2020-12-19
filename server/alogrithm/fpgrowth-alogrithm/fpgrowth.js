const {EventEmitter} = require('events');
const{FPTree} = require('./fptree')


class FPGrowth extends EventEmitter {
    constructor(_support ) {
        super();
        this._support = _support;
        this._itemsets = [];
    }
    
    exec(transactions, cb) {
        this._transactions = transactions;
        this._support = Math.ceil(this._support * transactions.length);
        let supports = this._getDistinctItemsCount(this._transactions);
        return new Promise((resolve, reject) => {
            let tree = new FPTree(supports, this._support).fromTransactions(this._transactions);
            let result = this._fpGrowth(tree, this._transactions.length);
            if (cb)
                cb(result);
            resolve(result);
        });
    }
  
    _fpGrowth(tree, prefixSupport, prefix = []) {
        return tree.headers.reduce((itemsets, item) => {
            let support = Math.min(tree.supports[JSON.stringify(item)], prefixSupport);
            let currentPrefix = prefix.slice(0);
            currentPrefix.push(item);
            itemsets.push(this._getFrequentItemset(currentPrefix, support));
            let childTree = tree.getConditionalFPTree(item);
            if (childTree)
                return itemsets.concat(this._fpGrowth(childTree, support, currentPrefix));
            return itemsets;
        }, []);
    }
  
    _handleSinglePath(singlePath, prefix) {
        return [];
    }

    _getFrequentItemset(itemset, support) {
        let ret = {
            items: itemset,
            support: support
        };
        this.emit('data', ret);
        return ret;
    }

    _getDistinctItemsCount(transactions) {
        return transactions.reduce((count, arr) => {
            return arr.reduce((count, item) => {
                count[JSON.stringify(item)] = (count[JSON.stringify(item)] || 0) + 1;
                return count;
            }, count);
        }, {});
    }
}

module.exports = {FPGrowth}