export  default {
	//从缓存中获取指定字符串或者对象
	getStorage: (name, type) => {
		let obj = localStorage.getItem(name);
		//判断是否是对象/数组
		if(type == 0){	//json数组/对象
			obj = JSON.parse(obj);
		}else{
			obj = obj;
		}
		return obj;
	}
}