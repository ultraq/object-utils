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
