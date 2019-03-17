/* 
 * Copyright 2017, Emanuel Rabina (http://www.ultraq.net.nz/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Deep-equality comparison between 2 objects on whether they contain the same
 * values as each other.  Only works with objects that act as data structures,
 * not classes or the like as this function only compares primitives using
 * identity (`===`) comparison.
 * 
 * @param {Object} object1
 * @param {Object} object2
 * @return {Boolean}
 */
export function equals(object1, object2) {

	let keys1 = Object.keys(object1);
	let keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	return keys1.every(key => {
		let value1 = object1[key];
		let value2 = object2[key];
		return typeof value1 === 'object' && typeof value2 === 'object' ?
			value1 === null && value2 === null ? // null is "object" :|
				true :
				equals(value1, value2) :
			value1 === value2;
	});
}

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
		if (source) {
			Object.keys(source).forEach(key => {
				let targetValue = target[key];
				let sourceValue = source[key];
				target[key] = targetValue instanceof Object && sourceValue instanceof Object ?
					merge(targetValue, sourceValue) :
					sourceValue;
			});
		}
	});
	return target;
}

/**
 * Returns a value from an object via a path string that describes the nesting
 * of objects to get to the value.
 * 
 * eg:
 * 
 * ```
 * let object = {
 *   greeting: {
 *     message: 'Hello!'
 *   }
 * };
 * let pathToMessage = 'greeting.message';
 * ```
 * 
 * @param {Object} object
 * @param {String} path A dot-separated path string to get to the desired value
 *   within the object
 * @return {Object} The value at the given path within the object, or
 *   `undefined` if the path doesn't resolve within the object.
 */
export function navigate(object, path) {

	return path.split('.').reduce((previousValue, pathToken) => {
		return previousValue && previousValue[pathToken];
	}, object);
}
