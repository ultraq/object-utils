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
/* eslint-env mocha */
import {merge} from '../src/ObjectUtils';
import {assert} from 'chai';

/**
 * Tests for the object utilities.
 */
describe('ObjectUtils', function() {

	describe('#merge', function() {

		it('Merge values from a source object into a target one', function() {
			let target = {
				prop1: 'some property',
				prop2: 'this one gets replaced'
			};
			let source = {
				prop2: 'replaced!',
				prop3: 'some other property'
			};
			merge(target, source);
			assert.deepEqual(target, {
				prop1: 'some property',
				prop2: 'replaced!',
				prop3: 'some other property'
			});
		});

		it('Deep-merge objects too', function() {
			let target = {
				obj1: {
					prop1: 'object property'
				}
			};
			let source = {
				obj1: {
					prop2: 'another object property'
				}
			};
			merge(target, source);
			assert.deepEqual(target, {
				obj1: {
					prop1: 'object property',
					prop2: 'another object property'
				}
			});
		});

		it('Deep-merge multiple source objects', function() {
			let target = {
				prop1: 'some property',
				prop2: "this one doesn't get replaced"
			};
			let source1 = {
				prop2: "I'm not replacing you!",
				prop3: 'some other property'
			};
			let source2 = {
				prop1: {
					deepProp: 'Hello!'
				},
				prop2: "I'm totally replacing you!"
			};
			merge(target, source1, source2);
			assert.deepEqual(target, {
				prop1: {
					deepProp: 'Hello!'
				},
				prop2: "I'm totally replacing you!",
				prop3: 'some other property'
			});
		});
	});
});
