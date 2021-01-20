const {FPNode} =require('./fpnode');
class FPTree {
  constructor(supports, support) {
    this.supports = supports;
    this.support = support;
    this.isInit = false;
    this.root = new FPNode();
    this.firstInserted = {};
    this.lastInserted = {};
  }
  fromTransactions(transactions) {
    if (this.isInit) {
      throw error;
    }
    transactions.forEach((transaction) => {
      const items = transaction
          .filter((item) => this.supports[JSON.stringify(item)] >= this.support)
          .sort((a, b) => {
            const res = this.supports[JSON.stringify(b)] - this.supports[JSON.stringify(a)];
            if (res == 0) {
              return JSON.stringify(b).localeCompare(JSON.stringify(a));
            }
            return res;
          });
      this.addItems(items);
    });
    this.headers = this.getHeaderList();
    this.isInit = true;
    return this;
  }

  fromPrefixPaths(prefixPaths) {
    if (this.isInit) {
      throw error;
    }

    prefixPaths.forEach((prefixPath) => {
      const items = prefixPath.path
          .filter((item) => this.supports[JSON.stringify(item)] >= this.support)
          .sort((a, b) => {
            const res = this.supports[JSON.stringify(b)] - this.supports[JSON.stringify(a)];
            if (res == 0) {
              return JSON.stringify(b).localeCompare(JSON.stringify(a));
            }
            return res;
          });
      this.addItems(items, prefixPath.support);
    });
    this.headers = this.getHeaderList();
    this.isInit = true;
    return this;
  }
  getConditionalFPTree(item) {
    const start = this.firstInserted[JSON.stringify(item)];
    if (!start) {
      return null;
    }
    const s = this.supports[JSON.stringify(item)];
    const conditionalTreeSupports = {};
    const prefixPaths = this._getPrefixPaths(start, s, (i, count) => {
      conditionalTreeSupports[JSON.stringify(i)] = (conditionalTreeSupports[JSON.stringify(i)] || 0) + count;
    });
    const ret = new FPTree(conditionalTreeSupports, this.support).fromPrefixPaths(prefixPaths);
    if (ret.root.children.length) {
      return ret;
    }

    return null;
  }
  getPrefixPaths(item) {
    if (!this.isInit) {
      throw error;
    }
    const start = this.firstInserted[JSON.stringify(item)];
    if (!start) {
      return [];
    }
    return this._getPrefixPaths(start, start.support);
  }
  getPrefixPath(node, onPushingNewItem) {
    if (!this.isInit) {
      throw error;
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
    if (!this.isInit) {
      throw error;
    }
    if (!this.getSinglePath()) {
      return false;
    }
    return true;
  }
  getSinglePath() {
    if (!this.isInit) {
      throw error;
    }
    return this._getSinglePath(this.root);
  }
  addItems(items, prefixSupport = 1) {
    let current = this.root;
    items.forEach((item) => {
      current = current.upsertChild(item, (child) => {
        const itemKey = JSON.stringify(item);
        this.updateLastInserted(itemKey, child);
        this.updateFirstInserted(itemKey, child);
      }, prefixSupport);
    });
  }

  _getPrefixPaths(node, count, onPushingNewItem, prefixPaths = []) {
    const prefixPath = this.getPrefixPath(node, onPushingNewItem);
    prefixPath&&(prefixPaths.push(prefixPath));
    if (!node.nextSameItemNode) {
      return prefixPaths;
    }
    return this._getPrefixPaths(node.nextSameItemNode, count, onPushingNewItem, prefixPaths);
  }

  _getPrefixPath(node, count, onPushingNewItem) {
    if (node.parent && node.parent.parent) {
      onPushingNewItem && (onPushingNewItem(node.parent.item, count));
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

  updateLastInserted(key, child) {
    const last = this.lastInserted[key];
    last &&(last.nextSameItemNode = child);
    this.lastInserted[key] = child;
  }

  updateFirstInserted(key, child) {
    const first = this.firstInserted[key];
    first||(this.firstInserted[key] = child);
  }

  getHeaderList() {
    return Object.keys(this.firstInserted)
        .sort((a, b) => this.supports[a] - this.supports[b])
        .map((key) =>( JSON.parse(key)));
  }
}
module.exports = {FPTree};
