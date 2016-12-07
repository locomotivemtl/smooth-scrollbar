import { getNamespace } from './get-namespace';

/**
 * Get private prop(s)
 * @private
 * @param {string} [prop] - Specify the property to be got, or the whole private props
 * @return {any}
 */
export function getPrivateProp(prop) {
    const privateProps = this::getNamespace();

    if (typeof prop === 'undefined') {
        return privateProps;
    }

    return privateProps[prop];
};
