const {FPNode} =require('./fpnode');
class FPTree {
  constructor(supports, _support) {
    this.supports = supports;
    this._support = _support;
    this._isInit = false;
    this.root = new FPNode();
    this._firstInserted = {};
    this._lastInserted = {};
  }
  get headers() {
    return this._headers;
  }

  fromTransactions(transactions) {
    if (this._isInit) {
      throw new Error('Error building the FPTree');
    }
    transactions.forEach((transaction) => {
      const items = transaction
          .filter((item) => this.supports[JSON.stringify(item)] >= this._support)
          .sort((a, b) => {
            const res = this.supports[JSON.stringify(b)] - this.supports[JSON.stringify(a)];
            if (res == 0) {
              return JSON.stringify(b).localeCompare(JSON.stringify(a));
            }
            return res;
          });

      this._addItems(items);
    });
    this._headers = this._getHeaderList();
    this._isInit = true;
    return this;
  }

  fromPrefixPaths(prefixPaths) {
    if (this._isInit) {
      throw new Error('Error building the FPTree');
    }
    prefixPaths.forEach((prefixPath) => {
      const items = prefixPath.path
          .filter((item) => this.supports[JSON.stringify(item)] >= this._support)
          .sort((a, b) => {
            const res = this.supports[JSON.stringify(b)] - this.supports[JSON.stringify(a)];
            if (res == 0) {
              return JSON.stringify(b).localeCompare(JSON.stringify(a));
            }
            return res;
          });
      this._addItems(items, prefixPath.support);
    });
    this._headers = this._getHeaderList();
    this._isInit = true;
    return this;
  }
  getConditionalFPTree(item) {
    const start = this._firstInserted[JSON.stringify(item)];
    if (!start) {
      return null;
    }
    const s = this.supports[JSON.stringify(item)];
    const conditionalTreeSupports = {};
    const prefixPaths = this._getPrefixPaths(start, s, (i, count) => {
      conditionalTreeSupports[JSON.stringify(i)] = (conditionalTreeSupports[JSON.stringify(i)] || 0) + count;
    });
    const ret = new FPTree(conditionalTreeSupports, this._support).fromPrefixPaths(prefixPaths);
    if (ret.root.children.length) {
      return ret;
    }

    return null;
  }
  getPrefixPaths(item) {
    if (!this._isInit) {
      throw new Error('Error building the FPTree');
    }
    const start = this._firstInserted[JSON.stringify(item)];
    if (!start) {
      return [];
    }
    return this._getPrefixPaths(start, start.support);
  }
  getPrefixPath(node, onPushingNewItem) {
    if (!this._isInit) {
      throw new Error('Error building the FPTree');
    }
    const path = this._getPrefixPath(node, node.support, onPushingNewItem);
    if (path.length === 0) {
      return;
    }
    return {
      support: node.support,
      path: path,
    };
  }
  isSinglePath() {
    if (!this._isInit) {
      throw new Error('Error building the FPTree');
    }
    if (!this.getSinglePath()) {
      return false;
    }
    return true;
  }
  getSinglePath() {
    if (!this._isInit) {
      throw new Error('Error building the FPTree');
    }
    return this._getSinglePath(this.root);
  }
  _addItems(items, prefixSupport = 1) {
    let current = this.root;
    items.forEach((item) => {
      current = current.upsertChild(item, (child) => {
        const itemKey = JSON.stringify(item);
        this._updateLastInserted(itemKey, child);
        this._updateFirstInserted(itemKey, child);
      }, prefixSupport);
    });
  }

  _getPrefixPaths(node, count, onPushingNewItem, prefixPaths = []) {
    const prefixPath = this.getPrefixPath(node, onPushingNewItem);
    if (prefixPath) {
      prefixPaths.push(prefixPath);
    }
    if (!node.nextSameItemNode) {
      return prefixPaths;
    }
    return this._getPrefixPaths(node.nextSameItemNode, count, onPushingNewItem, prefixPaths);
  }

  _getPrefixPath(node, count, onPushingNewItem) {
    if (node.parent && node.parent.parent) {
      if (onPushingNewItem) {
        onPushingNewItem(node.parent.item, count);
      }
      return [node.parent.item].concat(this._getPrefixPath(node.parent, count, onPushingNewItem));
    }
    return [];
  }

  _getSinglePath(node, currentPath = []) {
    if (node.children.length == 0) {
      return currentPath;
    }
    if (node.children.length > 1) {
      return null;
    }
    currentPath.push(node.children[0]);
    return this._getSinglePath(node.children[0], currentPath);
  }

  _updateLastInserted(key, child) {
    const last = this._lastInserted[key];
    if (last) {
      last.nextSameItemNode = child;
    }
    this._lastInserted[key] = child;
  }

  _updateFirstInserted(key, child) {
    const first = this._firstInserted[key];
    if (!first) {
      this._firstInserted[key] = child;
    }
  }

  _getHeaderList() {
    return Object.keys(this._firstInserted)
        .sort((a, b) => this.supports[a] - this.supports[b])
        .map((key) =>( JSON.parse(key)));
  }
}
module.exports = {FPTree};
