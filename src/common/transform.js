function transform(arr, headers, array) {
    for (let i = 0; i < arr.length; i++) {
        const val = arr[i];
        const headerMap = headers.reduce(function (map, obj) {
            map[obj.value] = obj;
            return map;
        }, {});
        if (val && typeof val === 'object' && val.constructor === Object) {
            for (const key in val) {
                if (!val.hasOwnProperty(key)) {
                    continue;
                }
                if (headerMap[key] && headerMap[key].transform !== undefined) {
                    val[key] = headerMap[key].transform(val[key], array);
                } else if (val[key] === true) {
                    val[key] = 'true';
                } else if (val[key] === false) {
                    val[key] = 'false';
                }
            }
        }
    }
    return arr;
}

export {transform};
