function HtmlHelper() {
}

HtmlHelper.prototype.createColumn = function (data) {
    return '<td>' +  data + '</td>';
}

HtmlHelper.prototype.createRow = function (data) {
    return '<tr>' +  data + '</tr>';
}

HtmlHelper.prototype.createTable = function (data) {
    var tableHtml = '<table border="1">';
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            tableHtml += this.createRow(this.createColumn(key) + this.createColumn(data[key]));    
        }
    }
    tableHtml += '</table>';
    return tableHtml;
}