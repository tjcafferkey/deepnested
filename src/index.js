export default function nested(obj) {
	if (obj.constructor !== Object) {
		throw new Error('nested() first argument needs to be an Object');
	}

	return {
		get(arr) {
			return arr.reduce(function(a, b) {
				return a && a[b] ? a[b] : null;
			}, obj);
		},

		set(arr, val) {
			const setObj = Object.assign({}, obj);

			return arr.reduce(function(a, b, index) {
				if (a && a[b] && index + 1 !== arr.length) {
					return a && a[b] ? a[b] : null;
				}

				a[b] = val;
				return setObj;

			}, setObj);
		}
	};
}