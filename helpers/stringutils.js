function StringUtils() {}

StringUtils.prototype.constructor = StringUtils;

StringUtils.prototype.listStrings = function (list) {
    var items = [], i;
    for (i = 0; i < list.length; i++) {
        items.push(list[i].out('text'));
    }
    return items;
}

StringUtils.prototype.mergeJson = function (first, second) {
    var key;
    //merge common data
    for (key in first) {
        if (second.hasOwnProperty(key)) {
            first[key].push(second[key]); 
        }
    }
    
    //merge additional data of second
    for (key in second) {
        if (!first.hasOwnProperty(key)) {
            first[key] = second[key];    
        }
    }
    return first;
}