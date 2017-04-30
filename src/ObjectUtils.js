
/**
 * Deep-merges all of the properties of the objects in `sources` with `target`,
 * modifying the target object and returning it.
 * 
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object} The modified target object.
 */
export function merge(target = {}, ...sources) {

	sources.forEach(source => {
		Object.keys(source).forEach(key => {
			let targetValue = target[key];
			let sourceValue = source[key];
			target[key] = targetValue instanceof Object && sourceValue instanceof Object ?
				merge(targetValue, sourceValue) :
				sourceValue;
		});
	});
	return target;
}
