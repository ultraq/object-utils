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
 * @param {any} object1
 * @param {any} object2
 * @return {boolean}
 */
export function equals(object1, object2) {

	// Identity
	if (object1 === object2) {
		return true;
	}

	// Compare objects
	if (typeof object1 === 'object' && typeof object2 === 'object') {
		let keys1 = Object.keys(object1);
		let keys2 = Object.keys(object2);
		return keys1.length === keys2.length && keys1.every(key => equals(object1[key], object2[key]));
	}

	// Compare primitives
	return object1 === object2;
}

/**
 * Deep-merges all of the properties of the objects in `sources` with `target`,
 * modifying the target object and returning it.
 * 
 * @param {object} target
 * @param {...object} sources
 * @return {object} The modified target object.
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
 * > The null-safe nature of this method is now in JavaScript as the optional
 * > chaining operator (`?.`).  If you're not using string paths/selectors to
 * > the item in your object, then I suggest you use that instead.  Otherwise,
 * > if you're using string path selectors or can't use that method because of
 * > browser support, this method will still do the job 🙂
 * 
 * @param {object} object
 * @param {string} path A dot-separated path string to get to the desired value
 *   within the object
 * @return {object} The value at the given path within the object, or
 *   `undefined` if the path doesn't resolve within the object.
 */
export function navigate(object, path) {

	return path.split('.').reduce((previousValue, pathToken) => {
		return previousValue && previousValue[pathToken];
	}, object);
}
