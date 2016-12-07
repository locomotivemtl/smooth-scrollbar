import {
    uniqueString,
} from '../../helpers/';

const PRIVATE_NAMESPACE = uniqueString('Private.props');

/**
 * Get private namespace
 *
 * @return {object}
 */
export function getNamespace() {
    if (!this.hasOwnProperty(PRIVATE_NAMESPACE)) {
        Object.defineProperties(this, {
            [PRIVATE_NAMESPACE]: {
                value: {},
            },
        });
    }

    return this[PRIVATE_NAMESPACE];
}
