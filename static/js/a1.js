function a1_draw(obj, myChart, reload){
    option = {
            title: {
                text: '今日民生',
                //subtext: '2018年10月30日',
                // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                x: 'center',
                // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                y: 'top',
                // itemGap设置主副标题纵向间隔，单位px，默认为10，
                itemGap: 30,
                backgroundColor: '#EEE',
                // 主标题文本样式设置
                textStyle: {
                  fontSize: 26,
                  fontWeight: 'bolder',
                  color: '#000080'
                },
                // 副标题文本样式设置
                subtextStyle: {
                  fontSize: 18,
                  color: '#8B2323'
                }
              },
              legend: {
                  // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
                  orient: 'vertical',
                  // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
                  x: 'left',
                  // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
                  y: 'center',
                  itemWidth: 24,   // 设置图例图形的宽
                  itemHeight: 18,  // 设置图例图形的高
                  textStyle: {
                    color: '#666'  // 图例文字颜色
                  },
                  // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
                  itemGap: 30,
                  backgroundColor: '#eee',  // 设置整个图例区域背景颜色
                  data: ['投诉','咨询','建议']
                },
                series: [
                    {
                      name: '事件类别',
                      type: 'pie',
                      // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
                      radius: ['10%', '55%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                      center: ['50%', '40%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                      data: [
                          {value:obj.data[1][0][1], name:'投诉'},
                          {value:obj.data[1][1][1], name:'咨询'},
                          {value:obj.data[1][2][1], name:'建议'}
                      ],
                      // itemStyle 设置饼状图扇形区域样式
                      itemStyle: {
						  normal: {

	　　　　　　　　　　　　　　//好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，

							color: function(params) {

								// build a color map as your need.

								var colorList = [

								  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',

								   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',

								   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'

								];

								return colorList[params.dataIndex]

							}
						},
                        // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                        // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                        emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(30, 144, 255，0.5)'
                        }
                      },
                      // 设置值域的那指向线
                      labelLine: {
                        normal: {
                          show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                        }
                      },
                      // 设置值域的标签
                      label: {
                        normal: {
                          position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                          // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                          // {a}指series.name  {b}指series.data的name
                          // {c}指series.data的value  {d}%指这一部分占总数的百分比
                          formatter: '{c}'
                        }
                      }
                    }
                  ],

                  tooltip: {
                      // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
                      trigger: 'item',
                      showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
                      hideDelay: 20,   // 隐藏延迟，单位ms
                      backgroundColor: 'rgba(255,0,0,0.7)',  // 提示框背景颜色
                      textStyle: {
                        fontSize: '16px',
                        color: '#000'  // 设置文本颜色 默认#FFF
                      },
                      // formatter设置提示框显示内容
                      // {a}指series.name  {b}指series.data的name
                      // {c}指series.data的value  {d}%指这一部分占总数的百分比
                      formatter: '{a} <br/>{b} : {c}个 ({d}%)'
                    },

        color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB']
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option, reload);
}