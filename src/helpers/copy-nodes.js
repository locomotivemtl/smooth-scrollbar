/**
 * Copy nodes into arrry
 * @param  {NodeList} nodeList
 * @return {array}          [description]
 */
export function copyNodes(nodeList) {
    if (typeof Array.from === 'function') {
        return Array.from(nodeList);
    }

    return Array.prototype.slice.call(nodeList);
}
