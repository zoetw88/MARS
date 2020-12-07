 class FPNode {
    constructor(item = null, parent = null) {
        this.item = item;
        this.parent = parent;
        this.support = 1;
        this.nextSameItemNode = null;
        this._children = [];
    }
    get children() {
        return this._children;
    }
    upsertChild(item, onNewChild, support = 1) {
        let child = this.getChild(item);
        if (!child) {
            child = new FPNode(item, this);
            child.support = support;
            this._children.push(child);
            if (onNewChild)
                onNewChild(child);
        }
        else
            child.support += support;
        return child;
    }
    getChild(item) {
        return this._children.find((child) => child.item == item);
    }
}
module.exports = {FPNode}