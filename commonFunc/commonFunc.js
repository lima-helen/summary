let Type = {}
for (var i = 0, type; type = ['String', 'Array', 'Object', 'Number'][i++];) {
	(function (type) {
		Type['is' + type] = function () {
			return Object.prototype.toString.call(arguments[0]) === '[object ' + type + ']';
		}
	})(type)
}
let common = {
	removeRepeat() { //删除数组重复的对象
		let args = Array.from(arguments), arr = [], result = [], obj = {};
		args.forEach(item => {
			if (Type.isArray(item)) {
				arr.push(...item)
			}
		})
		for (var i = 0; i < arr.length; i++) {
			if (!obj[arr[i].id]) {
				result.push(arr[i])
				obj[arr[i].id] = true
			}
		}
		return result
	},
	getRepeatResult() {
		//获取数组重复对象所在位置
		// 参数 ： 0:为key，1为要查找的值 ,2为数组
		let args = Array.from(arguments);
		if (Type.isString(args[0]) && Type.isArray(args[2])) {
			let keyArray = args[2].map(item => {
				if (item[args[0]]) {
					return item[args[0]]
				} else {
					return ''
				}
			})
			return keyArray.indexOf(args[1])
		}
	},
	isEmptyObject(e) {
		//判断对象是否为空
		let t;
		for (t in e)
			return !1;
		return !0
	}


}
export default Object.assign(Type, common)
