'use strict'

var echarts = require('echarts');
var tool = {
    /**
     * @param {Object} data   //接口返回的结果
     * @param {Object} ids    // 图标渲染的根DOM  id名
     * @param {Object} name   // 鼠标放在柱状图上显示的名称
     * @param {Object} nameX  //X轴上显示的名称
     * @param {Object} numY   // Y轴上对应每个名称的数量。
     */
    drawHistogram:function(data,ids,name,nameX,numY){        //柱状图
        var abscissa=[],chartNum=[];
        for(var mesg in data){
            abscissa.push(data[mesg][nameX]);
            chartNum.push(data[mesg][numY]);
        }
        var myChart = echarts.init(document.getElementById(ids));
        myChart.setOption({
            title: {},
            tooltip: {},
            xAxis: {
                data: abscissa
            },
            yAxis: {},
            series: [{
                name: name,
                type: 'bar',
                data: chartNum,
                itemStyle:{
                    normal:{color:'#6fc7f4'}
                }           
            }]
        });
    },
    /**
     * @param {Object} data   //接口返回的结果
     * @param {Object} ids    // 图标渲染的根DOM  id名
     * @param {Object} name   // 内容名称 数组类型，如["订单数","环比增速"]
     * @param {Object} paras  // 字段名称 数组类型，如["orderNum","monthlySpeed","countDate"]
     */
    drawMixtureChart:function(data,ids,name,paras){         //柱状折线混合图
        var abscissa=[],chartNum=[],lineNum=[];
        for(var mesg in data){
            chartNum.push(data[mesg][paras[0]]);
            lineNum.push(data[mesg][paras[1]]);
            abscissa.push(data[mesg][paras[2]]);
        }
        var myChart = echarts.init(document.getElementById(ids));
        myChart.setOption({
            title: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:[name[0],name[1]]
            },
            xAxis: [
                {
                    type: 'category',
                    data: abscissa,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: name[0],
                },
                {
                    type: 'value',
                    name: name[1],
                    axisLabel: {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [
                // {
                //    name:'蒸发量',
                //    type:'bar',
                //    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                // },
                {
                    name:name[0],
                    type:'bar',
                    data:chartNum,
                    itemStyle:{
                        normal:{color:'#6fc7f4'}
                    }
                },
                {
                    name:name[1],
                    type:'line',
                    yAxisIndex: 1,
                    data:lineNum,
                    itemStyle:{
                        normal:{color:'#ff9600'}
                    }
                }
            ]
        });
    },
}

exports.tool = tool;