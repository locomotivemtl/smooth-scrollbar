export function cloneNodes(nodeList) {
    if (typeof Array.from === 'function') {
        return Array.from(nodeList);
    }

    return Array.prototype.slice.call(nodeList);
}
