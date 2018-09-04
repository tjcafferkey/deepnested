"use strict";
const expect = require("chai").expect;
const assert = require("chai").assert;
import nested from '../lib/index';

describe('testing nested() function to safely access deeply nested values', function()  {
	const mockObject = {
		tom: {
			name: 'Tom',
			age: 26,
			position: 'Developer',
			team: {
				title: 'Product Page',
				members: ['nick', 'tom', 'nicole']
			}
		},

		nicole: {
			name: 'Nicole',
			age: 21,
			position: 'Tester'
		},

		nick: {
			name: 'Nick',
			age: 400,
			position: 'Colour-inner'
		}
	};

	it('should return the correct value from 1 levels deep in a nested object', function() {
		const value = nested(mockObject).get(['tom']);
		expect(value).to.deep.equal({
			name: 'Tom',
			age: 26,
			position: 'Developer',
			team: {
				title: 'Product Page',
				members: ['nick', 'tom', 'nicole']
			}
		});
	});

	it('should return the correct value from 2 levels deep in a nested object', function() {
		const value = nested(mockObject).get(['tom', 'team', 'title']);
		expect(value).to.equal('Product Page');
	});

	it('should return the correct value from 3 levels deep in a nested object', function() {
		const value = nested(mockObject).get(['tom', 'age']);
		expect(value).to.equal(26);
	});

	it('should set the correct value from 1 level deep in a nested object and return the new object', function() {
		let clonedObject = Object.assign({}, mockObject, {
			tom: 'Thomas'
		});
		const value = nested(mockObject).set(['tom'], 'Thomas');
		expect(value).to.deep.equal(clonedObject);
	});

	it('should set the correct value from 2 levels deep in a nested object and return the new object', function() {
		let clonedObject = Object.assign({}, mockObject);
		clonedObject.tom.name = 'Thomas';

		const value = nested(mockObject).set(['tom', 'name'], 'Thomas');
		expect(value).to.deep.equal(clonedObject);
	});

	it('should set the correct value from 3 levels deep in a nested object and return the new object', function() {
		let clonedObject = Object.assign({}, mockObject);
		clonedObject.tom.team.title = {};

		const value = nested(mockObject).set(['tom', 'team', 'title'], {});
		expect(value).to.deep.equal(clonedObject);
	});

	it('should throw an error when given an array instead of an object', function() {
		assert.throws(function() {
			nested([]).get(['tom', 'age']);
		}, Error, 'nested() first argument needs to be an Object');
	});

});
