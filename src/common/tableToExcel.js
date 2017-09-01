'use strict'

let tool = {
    getExcel:function(tableid) {//整个表格拷贝到EXCEL中
        let explorer = window.navigator.userAgent ;
        if(explorer.indexOf("MSIE") >= 0){
            alert("请用谷歌浏览器进行此操作");
        } else{
            tableToExcel(tableid);
        }
    },
}

const tableToExcel = (function() {
    let uri = 'data:application/vnd.ms-excel;base64,',
    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
      format = function(s, c) {
          return s.replace(/{(\w+)}/g,
          function(m, p) { return c[p]; }) }
      return function(table, name) {
      if (!table.nodeType) table = document.getElementById(table)
      let ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
      window.location.href = uri + base64(format(template, ctx))
    }
})()
exports.tool = tool;