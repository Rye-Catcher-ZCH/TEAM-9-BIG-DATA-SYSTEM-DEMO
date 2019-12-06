function a1_draw(obj, myChart){
    var newdata = [
    	['',null], //投诉
     	['',null],//感谢
    	['',null],//建议
    	['',null],//求决
    	['',null],//咨询
    	['',null],//其他
    	['',null],//-
    	];   
    
    var len=(obj.data[1]).length;

    	for(var j=0;j<len;j++){
    		if(obj.data[1][j][0]=='投诉' && obj.data[1][j][1]>0){
    			newdata[0][1]=obj.data[1][j][1];
    			newdata[0][0]='投诉';
    		}
    		else if(obj.data[1][j][0]=='感谢' && obj.data[1][j][1]>0){
    			newdata[1][1]=obj.data[1][j][1];
    			newdata[1][0]='感谢';
    		}
    		else if(obj.data[1][j][0]=='建议' && obj.data[1][j][1]>0){
    			newdata[2][1]=obj.data[1][j][1];
    			newdata[2][0]='建议';
    		}
    		else if(obj.data[1][j][0]=='求决' && obj.data[1][j][1]>0){
    			newdata[3][1]=obj.data[1][j][1];
    			newdata[3][0]='求决';
    		}
    		else if(obj.data[1][j][0]=='咨询' && obj.data[1][j][1]>0){
    			newdata[4][1]=obj.data[1][j][1];
    			newdata[4][0]='咨询';
    		}
    		else if(obj.data[1][j][0]=='其他' && obj.data[1][j][1]>0){
    			newdata[5][1]=obj.data[1][j][1];
    			newdata[5][0]='其他';
    		}
    		else if(obj.data[1][j][0]=='-' && obj.data[1][j][1]>0){
    			newdata[6][1]=obj.data[1][j][1];
    			newdata[6][0]='-';
    		}
    		else{;}
    	}

    
    
    
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
                  itemGap: 13,
                  backgroundColor: '#eee',  // 设置整个图例区域背景颜色
                  data: ['投诉','感谢','建议','求决','咨询','其他','-']
                },
                series: [
                    {
                      name: '事件类别',
                      type: 'pie',
                      // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
                      radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
                      center: ['50%', '50%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
                      data: [
                          {value:newdata[0][1], name:newdata[0][0]},
                          {value:newdata[1][1], name:newdata[1][0]},
                          {value:newdata[2][1], name:newdata[2][0]},
                          {value:newdata[3][1], name:newdata[3][0]},
                          {value:newdata[4][1], name:newdata[4][0]},
                          {value:newdata[5][1], name:newdata[5][0]},
                          {value:newdata[6][1], name:newdata[6][0]}
                      ],
                      // itemStyle 设置饼状图扇形区域样式
                      itemStyle: {
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
//'#4B7CF3','#dd3ee5','#12e78c','#fe8104','#01C2F9','#F4CB29','#FD9E06'   好看
        color: ['#4B7CF3','#dd3ee5','#12e78c','#fe8104','#01C2F9','#F4CB29','#FD9E06']
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function a2_draw(obj, chart_c1){
    var dataMoney = [0, 10, 20, 30, 40, 50, 60, 70, 80];//y轴
    //var obj = eval("("+jsdata+")");
    var rate;
    var dataMouth = ['碧岭街道','龙田街道','马峦街道','石井街道','坪山街道','坑梓街道'];//x轴
    /*var alldata = [
    	     [5,'市容环卫'],  
    		 [3,'环保水务'],  
    		 [6,'市政设施'],  
    		 [4,'规土城建'],  
    		 [11,'教育卫生'], 
    		 [1,'安全隐患'],  
    		 [12,'组织人事'], 
    		 [14,'党纪政纪'],
    		 [8,'劳动社保'],  
    		 [17,'社区管理'], 
    		 [7,'交通运输'],  
    		 [2,'治安维稳'],  
    		 [695,'专业事件采集'],
    		 [16,'统一战线'], 
    		 [15,'民政服务'], 
    		 [10,'文体旅游'], 
    		 [9,'食药市监'], 
    		 [13,'党建群团']
    	     ];*/
    
   var alldata = [  //数字可改成字符串
    	['5','市容环卫'],  
    	['3','环保水务'],  
    	['6','市政设施'],  
    	['4','规土城建'],  
    	['11','教育卫生'], 
    	['1','安全隐患'],  
    	['12','组织人事'], 
    	['14','党纪政纪'],
    	['8','劳动社保'],  
    	['17','社区管理'], 
    	['7','交通运输'],  
    	['2','治安维稳'],  
    	['695','专业事件采集'],
    	['16','统一战线'], 
    	['15','民政服务'], 
    	['10','文体旅游'], 
    	['9','食药市监'], 
    	['13','党建群团']
    	];
    
    //显示数据，可修改
    
    var wide=37;
    
    
    var finaldata = [
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null],
    	[null,null,null,null,null,null]	
        ];
    

    //for(var i = 0; i < 2; i++){
    	
    	//for(var j = 0; j < 4; j++){
    	//	finaldata[j][i]=obj.data[i][1][j][1];//看有几类而定
    	//}
   // }
    var label1=-1;//'碧岭街道','龙田街道','马峦街道','石井街道','坪山街道','坑梓街道'
    var label2=-1;
    var label3=-1;
    var label4=-1;
    var label5=-1;
    var label6=-1;
    
    var colorList =[
        'rgb(167, 220, 224)',
        'rgb(138, 171, 202)',
        'rgb(38, 188, 213)',
        'rgb(1, 158, 213)',
        'rgb(28, 120, 135)',
        'rgb(17, 64, 108)',
        
        'rgb(222, 211, 140)',
        'rgb(201, 186, 131)',
        'rgb(244, 208,   0)',
        'rgb(222, 156,  83)',
        'rgb(220,  87,  18)',
        
        'rgb(  6, 128,  67)',
        'rgb( 38, 157, 128)',
        'rgb( 29, 191, 151)',
        'rgb( 29, 191, 151)',
        'rgb(107, 194,  53)',
        'rgb(137, 190, 178)',
        'rgb(174, 221, 129)',
    ];
   var strlen = (obj.data).length;
   
   for(var i=0;i<strlen;i++){
	   if(obj.data[i][0]=='100'){
		   label1=i;
	   }
	   else if(obj.data[i][0]=='101'){
		   label2=i;
	   }
	   else if(obj.data[i][0]=='102'){
		   label3=i;
	   }
	   else if(obj.data[i][0]=='103'){
		   label4=i;
	   }
	   else if(obj.data[i][0]=='104'){
		   label5=i;
	   }
	   else if(obj.data[i][0]=='105'){
		   label6=i;
	   }
	   else{;}
   }
   
   
   if(label1>=0){
	   var len1 = (obj.data[label1][1]).length;

	   for(var i=0;i<len1;i++){
		   var biao=obj.data[label1][1][i][0];
		   var shu=obj.data[label1][1][i][1];
		   if(biao==alldata[0][0] && shu>0){
			   finaldata[0][0]=shu;
		   }
		   else if(biao==alldata[1][0] && shu>0){
			   finaldata[1][0]=shu;
		   }
		   else if(biao==alldata[2][0] && shu>0){
			   finaldata[2][0]=shu;
		   }
		   else if(biao==alldata[3][0] && shu>0){
			   finaldata[3][0]=shu;
		   }
		   else if(biao==alldata[4][0] && shu>0){
			   finaldata[4][0]=shu;
		   }
		   else if(biao==alldata[5][0] && shu>0){
			   finaldata[5][0]=shu;
		   }
		   else if(biao==alldata[6][0] && shu>0){
			   finaldata[6][0]=shu;
		   }
		   else if(biao==alldata[7][0] && shu>0){
			   finaldata[7][0]=shu;
		   }
		   else if(biao==alldata[8][0] && shu>0){
			   finaldata[8][0]=shu;
		   }
		   else if(biao==alldata[9][0] && shu>0){
			   finaldata[9][0]=shu;
		   }
		   else if(biao==alldata[10][0] && shu>0){
			   finaldata[10][0]=shu;
		   }
		   else if(biao==alldata[11][0] && shu>0){
			   finaldata[11][0]=shu;
		   }
		   else if(biao==alldata[12][0] && shu>0){
			   finaldata[12][0]=shu;
		   }
		   else if(biao==alldata[13][0] && shu>0){
			   finaldata[13][0]=shu;
		   }
		   else if(biao==alldata[14][0] && shu>0){
			   finaldata[14][0]=shu;
		   }
		   else if(biao==alldata[15][0] && shu>0){
			   finaldata[15][0]=shu;
		   }
		   else if(biao==alldata[16][0] && shu>0){
			   finaldata[16][0]=shu;
		   }
		   else if(biao==alldata[17][0] && shu>0){
			   finaldata[17][0]=shu;
		   }
		   else {;}
	   } 
   }
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    
   if(label2>=0){
	   var len2 = (obj.data[label2][1]).length;

	   for(var i=0;i<len2;i++){
		   var biao=obj.data[label2][1][i][0];
		   var shu=obj.data[label2][1][i][1];
		   if(biao==alldata[0][0] && shu>0){
			   finaldata[0][1]=shu;
		   }
		   else if(biao==alldata[1][0] && shu>0){
			   finaldata[1][1]=shu;
		   }
		   else if(biao==alldata[2][0] && shu>0){
			   finaldata[2][1]=shu;
		   }
		   else if(biao==alldata[3][0] && shu>0){
			   finaldata[3][1]=shu;
		   }
		   else if(biao==alldata[4][0] && shu>0){
			   finaldata[4][1]=shu;
		   }
		   else if(biao==alldata[5][0] && shu>0){
			   finaldata[5][1]=shu;
		   }
		   else if(biao==alldata[6][0] && shu>0){
			   finaldata[6][1]=shu;
		   }
		   else if(biao==alldata[7][0] && shu>0){
			   finaldata[7][1]=shu;
		   }
		   else if(biao==alldata[8][0] && shu>0){
			   finaldata[8][1]=shu;
		   }
		   else if(biao==alldata[9][0] && shu>0){
			   finaldata[9][1]=shu;
		   }
		   else if(biao==alldata[10][0] && shu>0){
			   finaldata[10][1]=shu;
		   }
		   else if(biao==alldata[11][0] && shu>0){
			   finaldata[11][1]=shu;
		   }
		   else if(biao==alldata[12][0] && shu>0){
			   finaldata[12][1]=shu;
		   }
		   else if(biao==alldata[13][0] && shu>0){
			   finaldata[13][1]=shu;
		   }
		   else if(biao==alldata[14][0] && shu>0){
			   finaldata[14][1]=shu;
		   }
		   else if(biao==alldata[15][0] && shu>0){
			   finaldata[15][1]=shu;
		   }
		   else if(biao==alldata[16][0] && shu>0){
			   finaldata[16][1]=shu;
		   }
		   else if(biao==alldata[17][0] && shu>0){
			   finaldata[17][1]=shu;
		   }
		   else {;}
	   } 
   }    
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   if(label3>=0){
	   var len3 = (obj.data[label3][1]).length;

	   for(var i=0;i<len3;i++){
		   var biao=obj.data[label3][1][i][0];
		   var shu=obj.data[label3][1][i][1];
		   if(biao==alldata[0][0] && shu>0){
			   finaldata[0][2]=shu;
		   }
		   else if(biao==alldata[1][0] && shu>0){
			   finaldata[1][2]=shu;
		   }
		   else if(biao==alldata[2][0] && shu>0){
			   finaldata[2][2]=shu;
		   }
		   else if(biao==alldata[3][0] && shu>0){
			   finaldata[3][2]=shu;
		   }
		   else if(biao==alldata[4][0] && shu>0){
			   finaldata[4][2]=shu;
		   }
		   else if(biao==alldata[5][0] && shu>0){
			   finaldata[5][2]=shu;
		   }
		   else if(biao==alldata[6][0] && shu>0){
			   finaldata[6][2]=shu;
		   }
		   else if(biao==alldata[7][0] && shu>0){
			   finaldata[7][2]=shu;
		   }
		   else if(biao==alldata[8][0] && shu>0){
			   finaldata[8][2]=shu;
		   }
		   else if(biao==alldata[9][0] && shu>0){
			   finaldata[9][2]=shu;
		   }
		   else if(biao==alldata[10][0] && shu>0){
			   finaldata[10][2]=shu;
		   }
		   else if(biao==alldata[11][0] && shu>0){
			   finaldata[11][2]=shu;
		   }
		   else if(biao==alldata[12][0] && shu>0){
			   finaldata[12][2]=shu;
		   }
		   else if(biao==alldata[13][0] && shu>0){
			   finaldata[13][2]=shu;
		   }
		   else if(biao==alldata[14][0] && shu>0){
			   finaldata[14][2]=shu;
		   }
		   else if(biao==alldata[15][0] && shu>0){
			   finaldata[15][2]=shu;
		   }
		   else if(biao==alldata[16][0] && shu>0){
			   finaldata[16][2]=shu;
		   }
		   else if(biao==alldata[17][0] && shu>0){
			   finaldata[17][2]=shu;
		   }
		   else {;}
	   } 
   }
//##############################################
   if(label4>=0){
	   var len4 = (obj.data[label4][1]).length;

	   for(var i=0;i<len4;i++){
		   var biao=obj.data[label4][1][i][0];
		   var shu=obj.data[label4][1][i][1];
		   if(biao==alldata[0][0]){
			   finaldata[0][3]=shu;
		   }
		   else if(biao==alldata[1][0] && shu>0){
			   finaldata[1][3]=shu;
		   }
		   else if(biao==alldata[2][0] && shu>0){
			   finaldata[2][3]=shu;
		   }
		   else if(biao==alldata[3][0] && shu>0){
			   finaldata[3][3]=shu;
		   }
		   else if(biao==alldata[4][0] && shu>0){
			   finaldata[4][3]=shu; 
		   }
		   else if(biao==alldata[5][0] && shu>0){
			   finaldata[5][3]=shu;
		   }
		   else if(biao==alldata[6][0] && shu>0){
			   finaldata[6][3]=shu;
		   }
		   else if(biao==alldata[7][0] && shu>0){
			   finaldata[7][3]=shu;
		   }
		   else if(biao==alldata[8][0] && shu>0){
			   finaldata[8][3]=shu;
		   }
		   else if(biao==alldata[9][0] && shu>0){
			   finaldata[9][3]=shu;
		   }
		   else if(biao==alldata[10][0] && shu>0){
			   finaldata[10][3]=shu;
		   }
		   else if(biao==alldata[11][0] && shu>0){
			   finaldata[11][3]=shu;
		   }
		   else if(biao==alldata[12][0] && shu>0){
			   finaldata[12][3]=shu;
		   }
		   else if(biao==alldata[13][0] && shu>0){
			   finaldata[13][3]=shu;
		   }
		   else if(biao==alldata[14][0] && shu>0){
			   finaldata[14][3]=shu;
		   }
		   else if(biao==alldata[15][0] && shu>0){
			   finaldata[15][3]=shu;
		   }
		   else if(biao==alldata[16][0] && shu>0){
			   finaldata[16][3]=shu;
		   }
		   else if(biao==alldata[17][0] && shu>0){
			   finaldata[17][3]=shu;
		   }
		   else {;}
	   } 
   }
//################################################
   if(label5>=0){
	   var len5 = (obj.data[label5][1]).length;

	   for(var i=0;i<len5;i++){
		   var biao=obj.data[label5][1][i][0];
		   var shu=obj.data[label5][1][i][1];
		   if(biao==alldata[0][0] && shu>0){
			   finaldata[0][4]=shu;
		   }
		   else if(biao==alldata[1][0] && shu>0){
			   finaldata[1][4]=shu;
		   }
		   else if(biao==alldata[2][0] && shu>0){
			   finaldata[2][4]=shu;
		   }
		   else if(biao==alldata[3][0] && shu>0){
			   finaldata[3][4]=shu;
		   }
		   else if(biao==alldata[4][0] && shu>0){
			   finaldata[4][4]=shu;
		   }
		   else if(biao==alldata[5][0] && shu>0){
			   finaldata[5][4]=shu;
		   }
		   else if(biao==alldata[6][0] && shu>0){
			   finaldata[6][4]=shu;
		   }
		   else if(biao==alldata[7][0] && shu>0){
			   finaldata[7][4]=shu;
		   }
		   else if(biao==alldata[8][0] && shu>0){
			   finaldata[8][4]=shu;
		   }
		   else if(biao==alldata[9][0] && shu>0){
			   finaldata[9][4]=shu;
		   }
		   else if(biao==alldata[10][0] && shu>0){
			   finaldata[10][4]=shu;
		   }
		   else if(biao==alldata[11][0] && shu>0){
			   finaldata[11][4]=shu;
		   }
		   else if(biao==alldata[12][0] && shu>0){
			   finaldata[12][4]=shu;
		   }
		   else if(biao==alldata[13][0] && shu>0){
			   finaldata[13][4]=shu;
		   }
		   else if(biao==alldata[14][0] && shu>0){
			   finaldata[14][4]=shu;
		   }
		   else if(biao==alldata[15][0] && shu>0){
			   finaldata[15][4]=shu;
		   }
		   else if(biao==alldata[16][0] && shu>0){
			   finaldata[16][4]=shu;
		   }
		   else if(biao==alldata[17][0] && shu>0){
			   finaldata[17][4]=shu;
		   }
		   else {;}
	   } 
   }
//#################################################
   if(label6>=0){
	   len6 = (obj.data[label6][1]).length;

	   for(var i=0;i<len6;i++){
		   var biao=obj.data[label6][1][i][0];
		   var shu=obj.data[label6][1][i][1];
		   if(biao==alldata[0][0] && shu>0){
			   finaldata[0][5]=shu;
		   }
		   else if(biao==alldata[1][0] && shu>0){
			   finaldata[1][5]=shu;
		   }
		   else if(biao==alldata[2][0] && shu>0){
			   finaldata[2][5]=shu;
		   }
		   else if(biao==alldata[3][0] && shu>0){
			   finaldata[3][5]=shu;
		   }
		   else if(biao==alldata[4][0] && shu>0){
			   finaldata[4][5]=shu;
		   }
		   else if(biao==alldata[5][0] && shu>0){
			   finaldata[5][5]=shu;
		   }
		   else if(biao==alldata[6][0] && shu>0){
			   finaldata[6][5]=shu;
		   }
		   else if(biao==alldata[7][0] && shu>0){
			   finaldata[7][5]=shu;
		   }
		   else if(biao==alldata[8][0] && shu>0){
			   finaldata[8][5]=shu;
		   }
		   else if(biao==alldata[9][0] && shu>0){
			   finaldata[9][5]=shu;
		   }
		   else if(biao==alldata[10][0] && shu>0){
			   finaldata[10][5]=shu;
		   }
		   else if(biao==alldata[11][0] && shu>0){
			   finaldata[11][5]=shu;
		   }
		   else if(biao==alldata[12][0] && shu>0){
			   finaldata[12][5]=shu;
		   }
		   else if(biao==alldata[13][0] && shu>0){
			   finaldata[13][5]=shu;
		   }
		   else if(biao==alldata[14][0] && shu>0){
			   finaldata[14][5]=shu;
		   }
		   else if(biao==alldata[15][0] && shu>0){
			   finaldata[15][5]=shu;
		   }
		   else if(biao==alldata[16][0] && shu>0){
			   finaldata[16][5]=shu;
		   }
		   else if(biao==alldata[17][0] && shu>0){
			   finaldata[17][5]=shu;
		   }
		   else {;}
	   } 
   }
//finish


    //总计
    var data19 = function(){
        var datas = [];
        for (var i = 0; i < 6; i++) {
        	var sum = 0;
            for(var j = 0; j < 18; j++){
            	if(finaldata[j][i]!=null){
            	    sum=sum+finaldata[j][i];   
            	}
            }
            datas.push(sum);
        }
        return datas;
    }();
    
    //小于百分之五就不显示
    for (var i = 0; i < 6; i++) {
    	if(data19[i]!=0){
    	
        for(var j = 0; j < 18; j++){
        	if(finaldata[j][i]!=null){
        		rate = finaldata[j][i]/data19[i];
                if(rate<0.1){
                	finaldata[j][i]=null;
                }

        	}
        	
        }
        
    	}
    }
    
    
    
    option = {
        //backgroundColor: '#4962FC',
        title: {
            text: '各街道民生事件',
            left: 'center',
            top: 'top',
            textStyle: {
                fontWeight: "normal",
                color: 'rgb(15, 144, 207)' //blue
              }
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {          
                type : 'shadow'     
            }
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'top',
            data:['市容环卫',  
            	'环保水务',  
            	'市政设施',  
            	'规土城建',  
            	'教育卫生', 
            	'安全隐患',  
            	'组织人事', 
            	'党纪政纪',
            	'劳动社保',  
            	'社区管理', 
            	'交通运输',  
            	'治安维稳',  
            	'专业事件采集',
            	'统一战线',
            	'民政服务',
            	'文体旅游',
            	'食药市监',
            	'党建群团'],
                textStyle: {
                    fontWeight: "normal",
                    color: 'rgb(15, 144, 207)' //blue
                  }
            	
        },
        grid: {
            left: '1%',
            right: '15%',
            bottom: '1%',
            containLabel: true
        },
        yAxis : [
            {
                type : 'category',
                data : dataMouth,
                axisLabel:{
                    textStyle: {
                        fontWeight: "bold",
                        color:'rgb(15, 144, 207)' ,//blue
                        fontSize : 25
                      }
                },

                axisLine:{
                    lineStyle:{
                        color:'rgb(15, 144, 207)'
                    }
                } 
            }
        ],
        xAxis : [
            {
                type : 'value',
                data : dataMoney, //可省略，只要type : 'value',会自适应数据设置Y轴
                axisLabel:{
                    textStyle: {
                        fontWeight: "normal",
                        color: 'rgb(15, 144, 207)' //blue
                      }
                },
                axisLine:{
                    lineStyle:{
                        color:'rgb(15, 144, 207)'
                    }
                } 
            }
        ],
        series : [
            {
                name:'市容环卫',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true//是否展示
                        },
                        color:colorList[0]
                    }
                },
                data:finaldata[0]
            },
            {
                name:'环保水务',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[1]
                    }
                },
                data:finaldata[1]
            },
            {
                name:'市政设施',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[2]
                    }
                },
                data:finaldata[2]
            },
            {
                name:'规土城建',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[3]
                    }
                },
                data:finaldata[3]
            },
            {
                name:'教育卫生',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[4]
                    }
                },
                data:finaldata[4]
            },            
            {
                name:'安全隐患',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[5]
                    }
                },
                data:finaldata[5]
            },           
            {
                name:'组织人事',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[6]
                    }
                },
                data:finaldata[6]
            },            
            {
                name:'党纪政纪',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[7]
                    }
                },
                data:finaldata[7]
            },            
            {
                name:'劳动社保',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[8]
                    }
                },
                data:finaldata[8]
            },
            {
                name:'社区管理',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[9]
                    }
                },
                data:finaldata[9]
            },            
            {
                name:'交通运输',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[10]
                    }
                },
                data:finaldata[10]
            },            
            {
                name:'治安维稳',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[11]
                    }
                },
                data:finaldata[11]
            },            
            {
                name:'专业事件采集',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[12]
                    }
                },
                data:finaldata[12]
            },
            {
                name:'统一战线',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[13]
                    }
                },
                data:finaldata[13]
            },            
            {
                name:'民政服务',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[14]
                    }
                },
                data:finaldata[14]
            },            
            {
                name:'文体旅游',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[15]
                    }
                },
                data:finaldata[15]
            },
            {
                name:'食药市监',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[16]
                    }
                },
                data:finaldata[16]
            },            
            {
                name:'党建群团',
                type:'bar',
                stack:'sum',
                barWidth : wide,
                itemStyle:{
                    normal:{
                        label: {
                            show: true,//是否展示
                        },
                        color:colorList[17]
                    }
                },
                data:finaldata[17]
            },
            
            {
                name: '总计',
                type: 'bar',
                stack: 'sum',
                barWidth : wide,
                label: {
                    normal: {
                        //offset:['50', '80'],
                        show: false,
                        position: 'insideBottom',
                        formatter:'{c}',
                        textStyle:{ color:'#000' }
                    }
                },
                itemStyle:{
                    normal:{
                        color:'rgba(128, 128, 128, 0)',
                        label: {
                            show: false//是否展示
                        }
                    }
                },
                data: data19
            }
 
        ]
    };
 
    chart_c1.setOption(option);
}

function a3_draw(obj, myChart){
//热点社区展示，只需要传入热点值即可
   var shuju = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
   var biao = ['10007','10012','10005','10016','10004','10003','10000','10006','10009','10002','10010','10001','10017','10008','10011','10015','10022','10019','10021','10020','10018','10013','10014'];
   
  
   //obj={"data":[[10018,32],[10016,86],[10005,12],[10002,43],[10019,54],[10003,65],[10012,12],[10014,1],[10022,90],[10010,100],[10017,53],[10021,54],[10013,78],[10004,32],[10006,24],[10020,54],[10015,78],[10009,65],[10000,54],[10001,34],[10008,45],[10011,88]]};
   //var obj={"data":[['10018',32],['10016',86],['10005',12],['10002',43],['10019',54]]};
   var mylen=(obj.data).length;
   /*for(var i=0;i<23;i++){
       for(var j=0;j<23;j++){
    	   if(obj.data[j][0]==biao[i]){
    		   shuju[i]=obj.data[j][1];
    		   break;
    	   }
       }
   }*/
   
   for(var i=0;i<mylen;i++){
	   goodbiao=obj.data[i][0];
	   goodshu=obj.data[i][1];
	   if(goodbiao==biao[0]){
		   shuju[0]=goodshu;
	   }
	   else if(goodbiao==biao[1]){
		   shuju[1]=goodshu;
	   }
	   else if(goodbiao==biao[2]){
		   shuju[2]=goodshu;
	   }
	   else if(goodbiao==biao[3]){
		   shuju[3]=goodshu;
	   }
	   else if(goodbiao==biao[4]){
		   shuju[4]=goodshu;
	   }
	   else if(goodbiao==biao[5]){
		   shuju[5]=goodshu;
	   }
	   else if(goodbiao==biao[6]){
		   shuju[6]=goodshu;
	   }
	   else if(goodbiao==biao[7]){
		   shuju[7]=goodshu;
	   }
	   else if(goodbiao==biao[8]){
		   shuju[8]=goodshu;
	   }
	   else if(goodbiao==biao[9]){
		   shuju[9]=goodshu;
	   }
	   else if(goodbiao==biao[10]){
		   shuju[10]=goodshu;
	   }
	   else if(goodbiao==biao[11]){
		   shuju[11]=goodshu;
	   }
	   else if(goodbiao==biao[12]){
		   shuju[12]=goodshu;
	   }
	   else if(goodbiao==biao[13]){
		   shuju[13]=goodshu;
	   }
	   else if(goodbiao==biao[14]){
		   shuju[14]=goodshu;
	   }
	   else if(goodbiao==biao[15]){
		   shuju[15]=goodshu;
	   }
	   else if(goodbiao==biao[16]){
		   shuju[16]=goodshu;
	   }
	   else if(goodbiao==biao[17]){
		   shuju[17]=goodshu;
	   }
	   else if(goodbiao==biao[18]){
		   shuju[18]=goodshu;
	   }
	   else if(goodbiao==biao[19]){
		   shuju[19]=goodshu;
	   }
	   else if(goodbiao==biao[20]){
		   shuju[20]=goodshu;
	   }
	   else if(goodbiao==biao[21]){
		   shuju[21]=goodshu;
	   }
	   else if(goodbiao==biao[22]){
		   shuju[22]=goodshu;
	   }
	   else{;}
   }
   
   
   
   
   


	$.get("js/no.geojson",function(map){
		echarts.registerMap("pingshan",map);
		var geoCoordMap = {
			    "六联社区":[114.336721,22.69849],
			    "六和社区":[114.349914,22.707919],
			    "坪山社区":[114.355265,22.696259],
			    "和平社区":[114.342104,22.689706],
			    "平环社区":[114.35474,22.687096],
			    "江岭社区":[114.366696,22.69202],//27
			    "马峦社区":[114.338203,22.644538],
			    "沙壆社区":[114.377635,22.688081],
			    "碧岭社区":[114.295663,22.67342],
			    "汤坑社区":[114.341079,22.678805],//jin1
			    "沙湖社区":[114.326552,22.67909],//jin1
			    "金龟社区":[114.406461,22.663744],
			    "石井社区":[114.390978,22.697625],
			    "田头社区":[114.410837,22.697197],
			    "田心社区":[114.421943,22.700351],
			    "坑梓社区":[114.390013,22.753031],
			    "秀新社区":[114.381223,22.744873],//
			    "金沙社区":[114.408079,22.743131],
			    "沙田社区":[114.404444,22.761764],
			    "龙田社区":[114.372841,22.753346],
			    "南布社区":[114.375607,22.70534],
			    "竹坑社区":[114.395074,22.715773],
			    "老坑社区":[114.369312,22.734866]
		};
		var convertData = function (data) {
		    var res = [];
		    for (var i = 0; i < data.length; i++) {
		        var geoCoord = geoCoordMap[data[i].name];
		        if (geoCoord) {
		            res.push({
		                name: data[i].name,
		                value: geoCoord.concat(data[i].value)
		            });
		        }
		    }
		    return res;
		};

		option = {
			    backgroundColor: '#404a59',
			    title: {
			        text: '坪山区热点社区',
			        x:'center',
			        textStyle: {
			            color: '#fff',
			            fontSize:40
			        }
			    },
			    tooltip: {
			        trigger: 'item',
			        formatter: function (params) {
			            return params.name + ' : ' + params.value[2];
			        }
			    },
			    legend: {
			        orient: 'vertical',
			        y: 'bottom',
			        x:'right',
			        data:['热度值'],
			        textStyle: {
			            color: '#fff'
			        }
			    },
			    visualMap: {
			        min: 0,
			        max: 100,
			        calculable: true,
			        inRange: {
			            color: ['#50a3ba', '#eac736', '#d94e5d']
			        },
			        textStyle: {
			            color: '#fff'
			        }
			    },
			    geo: {
			        map: 'pingshan',
			        label: {
			            emphasis: {
			                show: false
			            }
			        },
			        itemStyle: {
			            normal: {
			                areaColor: '#323c48',
			                borderColor: '#111'
			            },
			            emphasis: {
			                areaColor: '#2a333d'
			            }
			        }
			    },
			    series: [
			        {
			            name: '热度值',
			            type: 'scatter',
			            coordinateSystem: 'geo',
			            aspectScale: 1.0,
			            data: convertData([
			                {name: "六联社区", value: shuju[0]},
			                {name: "六和社区", value: shuju[1]},
			                {name: "坪山社区", value: shuju[2]},
			                {name: "和平社区", value: shuju[3]},
			                {name: "平环社区", value: shuju[4]},
			                {name: "江岭社区", value: shuju[5]},
			                {name: "马峦社区", value: shuju[6]},
			                {name: "沙壆社区", value: shuju[7]},
			                {name: "碧岭社区", value: shuju[8]},
			                {name: "汤坑社区", value: shuju[9]},
			                {name: "沙湖社区", value: shuju[10]},             
			                {name: "金龟社区", value: shuju[11]},
			                {name: "石井社区", value: shuju[12]},
			                {name: "田头社区", value: shuju[13]},
			                {name: "田心社区", value: shuju[14]},
			                {name: "坑梓社区", value: shuju[15]},
			                {name: "秀新社区", value: shuju[16]},
			                {name: "金沙社区", value: shuju[17]},
			                {name: "沙田社区", value: shuju[18]},
			                {name: "龙田社区", value: shuju[19]},
			                {name: "南布社区", value: shuju[20]},
			                {name: "竹坑社区", value: shuju[21]},
			                {name: "老坑社区", value: shuju[22]}
			            ]),

			                    symbolSize:function(rawValue,params){
			                        params.symbolSize = shuju[params.dataIndex]/6+5;
			                        return params.symbolSize;
			                    },

			            label: {
			            	//show:true,
			                normal: {
			                	show:true,
			                	position: 'outside',
		                           //formatter:biao
		                            //align: 'inside'
		                            
			                    formatter:function(params){
                                     str=params.data.name;
                                     return str;
			                    	
			                    },
			            textStyle: {                         
	                         fontSize: 10
	                      }
			        
			        
			                    }


			                },
			                //emphasis: {
			                    //show: false
			                //}
			            
			            itemStyle: {
			                emphasis: {
			                    borderColor: '#fff',
			                    borderWidth: 1
			                }
			            }
			        }
			    ]
			};
		myChart.setOption(option);
		});	
}

function a4_draw(obj, myChart){
//展示民生事件的结办情况
//data1 to data8 are the different kinds of events;th1:未结办;th2:结办中;th3:已经结办
    var i=0;
    var j=0;
    var len1;
    var len2;
    var len3;
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;
    var label1=-1;//按期的行号
    var label2=-1;//中
    var label3=-1;//超过
    var mysum = [
    	[null,''],//超期结办
    	[null,''],//处置中
    	[null,'']//按时结办
    	];
    var lensum=(obj.data).length;
    for(i=0;i<lensum;i++){
    	if(obj.data[i][0]=='1'){   //这里的0可以改成字符串
    		label1=i;
    	}
    	if(obj.data[i][0]=='-'){
    		label2=i;
    	}
    	if(obj.data[i][0]=='0'){
    		label3=i;
    	}
    }
    
    
    
mydata = [  //数字可改成字符串
['5','市容环卫'],  
['3','环保水务'],  
['6','市政设施'],  
['4','规土城建'],  
['11','教育卫生'], 
['1','安全隐患'],  
['12','组织人事'], 
['14','党纪政纪'],
['8','劳动社保'],  
['17','社区管理'], 
['7','交通运输'],  
['2','治安维稳'],  
['695','专业事件采集'],
['16','统一战线'], 
['15','民政服务'], 
['10','文体旅游'], 
['9','食药市监'], 
['13','党建群团']
];
    
    acculrate = [
    [null,''],	[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,'']
    ];
    
    acculrate1 = [
        [null,''],	[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,'']
        ];
    acculrate2 = [
        [null,''],	[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,''],[null,'']
        ];
    
    
    if(label1>=0){
    	len1=(obj.data[label1][1]).length;
    }
    else{
    	len1=0;
    }
    for(i=0;i<len1;i++)
    {
    	var biao = obj.data[label1][1][i][0];
    	var shu = obj.data[label1][1][i][1];
    	if(biao==mydata[0][0] && shu>0){
    		acculrate[0][0]=shu;
    		acculrate[0][1]=mydata[0][1];
    	}
    	else if(biao==mydata[1][0] && shu>0){
    		acculrate[1][0]=shu;
    		acculrate[1][1]=mydata[1][1];
    	}
    	else if(biao==mydata[2][0] && shu>0){
    		acculrate[2][0]=shu;
    		acculrate[2][1]=mydata[2][1];
    	}
    	else if(biao==mydata[3][0] && shu>0){
    		acculrate[3][0]=shu;
    		acculrate[3][1]=mydata[3][1];
    	}
    	else if(biao==mydata[4][0] && shu>0){
    		acculrate[4][0]=shu;
    		acculrate[4][1]=mydata[4][1];
    	}
    	else if(biao==mydata[5][0] && shu>0){
    		acculrate[5][0]=shu;
    		acculrate[5][1]=mydata[5][1];
    	}
    	else if(biao==mydata[6][0] && shu>0){
    		acculrate[6][0]=shu;
    		acculrate[6][1]=mydata[6][1];
    	}
    	else if(biao==mydata[7][0] && shu>0){
    		acculrate[7][0]=shu;
    		acculrate[7][1]=mydata[7][1];
    	}
    	else if(biao==mydata[8][0] && shu>0){
    		acculrate[8][0]=shu;
    		acculrate[8][1]=mydata[8][1];
    	}
    	else if(biao==mydata[9][0] && shu>0){
    		acculrate[9][0]=shu;
    		acculrate[9][1]=mydata[9][1];
    	}
    	else if(biao==mydata[10][0] && shu>0){
    		acculrate[10][0]=shu;
    		acculrate[10][1]=mydata[10][1];
    	}
    	else if(biao==mydata[11][0] && shu>0){
    		acculrate[11][0]=shu;
    		acculrate[11][1]=mydata[11][1];
    	}
    	else if(biao==mydata[12][0] && shu>0){
    		acculrate[12][0]=shu;
    		acculrate[12][1]=mydata[12][1];
    	}
    	else if(biao==mydata[13][0] && shu>0){
    		acculrate[13][0]=shu;
    		acculrate[13][1]=mydata[13][1];
    	}
    	else if(biao==mydata[14][0] && shu>0){
    		acculrate[14][0]=shu;
    		acculrate[14][1]=mydata[14][1];
    	}
    	else if(biao==mydata[15][0] && shu>0){
    		acculrate[15][0]=shu;
    		acculrate[15][1]=mydata[15][1];
    	}
    	else if(biao==mydata[16][0] && shu>0){
    		acculrate[16][0]=shu;
    		acculrate[16][1]=mydata[16][1];
    	}
    	else if(biao==mydata[17][0] && shu>0){
    		acculrate[17][0]=shu;
    		acculrate[17][1]=mydata[17][1];
    	}
    	else {;}

    }  
//##############################################    
    if(label2>=0){
    	len2=(obj.data[label2][1]).length;
    }
    else{
    	len2=0;
    }
    for(i=0;i<len2;i++)
    {
    	var biao = obj.data[label2][1][i][0];
    	var shu = obj.data[label2][1][i][1];
    	if(biao==mydata[0][0] && shu>0){
    		acculrate1[0][0]=shu;
    		acculrate1[0][1]=mydata[0][1];
    	}
    	else if(biao==mydata[1][0] && shu>0){
    		acculrate1[1][0]=shu;
    		acculrate1[1][1]=mydata[1][1];
    	}
    	else if(biao==mydata[2][0] && shu>0){
    		acculrate1[2][0]=shu;
    		acculrate1[2][1]=mydata[2][1];
    	}
    	else if(biao==mydata[3][0] && shu>0){
    		acculrate1[3][0]=shu;
    		acculrate1[3][1]=mydata[3][1];
    	}
    	else if(biao==mydata[4][0] && shu>0){
    		acculrate1[4][0]=shu;
    		acculrate1[4][1]=mydata[4][1];
    	}
    	else if(biao==mydata[5][0] && shu>0){
    		acculrate1[5][0]=shu;
    		acculrate1[5][1]=mydata[5][1];
    	}
    	else if(biao==mydata[6][0] && shu>0){
    		acculrate1[6][0]=shu;
    		acculrate1[6][1]=mydata[6][1];
    	}
    	else if(biao==mydata[7][0] && shu>0){
    		acculrate1[7][0]=shu;
    		acculrate1[7][1]=mydata[7][1];
    	}
    	else if(biao==mydata[8][0] && shu>0){
    		acculrate1[8][0]=shu;
    		acculrate1[8][1]=mydata[8][1];
    	}
    	else if(biao==mydata[9][0] && shu>0){
    		acculrate1[9][0]=shu;
    		acculrate1[9][1]=mydata[9][1];
    	}
    	else if(biao==mydata[10][0] && shu>0){
    		acculrate1[10][0]=shu;
    		acculrate1[10][1]=mydata[10][1];
    	}
    	else if(biao==mydata[11][0] && shu>0){
    		acculrate1[11][0]=shu;
    		acculrate1[11][1]=mydata[11][1];
    	}
    	else if(biao==mydata[12][0] && shu>0){
    		acculrate1[12][0]=shu;
    		acculrate1[12][1]=mydata[12][1];
    	}
    	else if(biao==mydata[13][0] && shu>0){
    		acculrate1[13][0]=shu;
    		acculrate1[13][1]=mydata[13][1];
    	}
    	else if(biao==mydata[14][0] && shu>0){
    		acculrate1[14][0]=shu;
    		acculrate1[14][1]=mydata[14][1];
    	}
    	else if(biao==mydata[15][0] && shu>0){
    		acculrate1[15][0]=shu;
    		acculrate1[15][1]=mydata[15][1];
    	}
    	else if(biao==mydata[16][0] && shu>0){
    		acculrate1[16][0]=shu;
    		acculrate1[16][1]=mydata[16][1];
    	}
    	else if(biao==mydata[17][0] && shu>0){
    		acculrate1[17][0]=shu;
    		acculrate1[17][1]=mydata[17][1];
    	}
    	else {;}

    }      
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if(label3>=0){
    	len3=(obj.data[label3][1]).length;
    }
    else{
    	len3=0;
    }
    for(i=0;i<len3;i++)
    {
    	var biao = obj.data[label3][1][i][0];
    	var shu = obj.data[label3][1][i][1];
    	if(biao==mydata[0][0] && shu>0){
    		acculrate2[0][0]=shu;
    		acculrate2[0][1]=mydata[0][1];
    	}
    	else if(biao==mydata[1][0] && shu>0){
    		acculrate2[1][0]=shu;
    		acculrate2[1][1]=mydata[1][1];
    	}
    	else if(biao==mydata[2][0] && shu>0){
    		acculrate2[2][0]=shu;
    		acculrate2[2][1]=mydata[2][1];
    	}
    	else if(biao==mydata[3][0] && shu>0){
    		acculrate2[3][0]=shu;
    		acculrate2[3][1]=mydata[3][1];
    	} 
    	else if(biao==mydata[4][0] && shu>0){
    		acculrate2[4][0]=shu;
    		acculrate2[4][1]=mydata[4][1];
    	}
    	else if(biao==mydata[5][0] && shu>0){
    		acculrate2[5][0]=shu;
    		acculrate2[5][1]=mydata[5][1];
    	}
    	else if(biao==mydata[6][0] && shu>0){
    		acculrate2[6][0]=shu;
    		acculrate2[6][1]=mydata[6][1];
    	}
    	else if(biao==mydata[7][0] && shu>0){
    		acculrate2[7][0]=shu;
    		acculrate2[7][1]=mydata[7][1];
    	}
    	else if(biao==mydata[8][0] && shu>0){
    		acculrate2[8][0]=shu;
    		acculrate2[8][1]=mydata[8][1];
    	}
    	else if(biao==mydata[9][0] && shu>0){
    		acculrate2[9][0]=shu;
    		acculrate2[9][1]=mydata[9][1];
    	}
    	else if(biao==mydata[10][0] && shu>0){
    		acculrate2[10][0]=shu;
    		acculrate2[10][1]=mydata[10][1];
    	}
    	else if(biao==mydata[11][0] && shu>0){
    		acculrate2[11][0]=shu;
    		acculrate2[11][1]=mydata[11][1];
    	}
    	else if(biao==mydata[12][0] && shu>0){
    		acculrate2[12][0]=shu;
    		acculrate2[12][1]=mydata[12][1];
    	}
    	else if(biao==mydata[13][0] && shu>0){
    		acculrate2[13][0]=shu;
    		acculrate2[13][1]=mydata[13][1];
    	}
    	else if(biao==mydata[14][0] && shu>0){
    		acculrate2[14][0]=shu;
    		acculrate2[14][1]=mydata[14][1];
    	}
    	else if(biao==mydata[15][0] && shu>0){
    		acculrate2[15][0]=shu;
    		acculrate2[15][1]=mydata[15][1];
    	}
    	else if(biao==mydata[16][0] && shu>0){
    		acculrate2[16][0]=shu;
    		acculrate2[16][1]=mydata[16][1];
    	}
    	else if(biao==mydata[17][0] && shu>0){
    		acculrate2[17][0]=shu;
    		acculrate2[17][1]=mydata[17][1];
    	}
    	else {;}

    }  
    
//##########################################################    
        if(label1>=0){
        for(i=0;i<18;i++)
        {
        	if(acculrate[i][0]!=null){
        	sum1=sum1+acculrate[i][0];
        	}
        }
        }
        
        if(label2>=0){
            for(i=0;i<18;i++)
            {
            	if(acculrate1[i][0]!=null){
            	sum2=sum2+acculrate1[i][0];
            	}
            }
            }
        
        if(label3>=0){
            for(i=0;i<18;i++)
            {
            	if(acculrate2[i][0]!=null){
            	sum3=sum3+acculrate2[i][0];
            	}
            }
            }
        
        if(sum1!=0){
        	mysum[0][0]=sum1;
        	mysum[0][1]='超期结办';
        }
        if(sum2!=0){
        	mysum[1][0]=sum2;
        	mysum[1][1]=null;
        }    
        if(sum3!=0){
        	mysum[2][0]=sum3;
        	mysum[2][1]='按期结办';
        }    
    
    
//inputdata=[{value:acculrate[0], name:'超期'+mydata[0][1]}];

//{value:data1, name:'市容环卫'}   
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
            {
                name:'民生事件分类',
                type:'pie',
                selectedMode: 'single',
                radius: ['45%', '75%'],

                label: {
                    normal: {
                        position: 'outside',
                        fontSize: 9,
                        color:'',
                        fontFamily:'Microsoft Yahei'
                    }
                },
                data:[
                	{value:acculrate[0][0], name:acculrate[0][1]},
                	{value:acculrate[1][0], name:acculrate[1][1]},
                	{value:acculrate[2][0], name:acculrate[2][1]},
                	{value:acculrate[3][0], name:acculrate[3][1]},
                	{value:acculrate[4][0], name:acculrate[4][1]},
                	{value:acculrate[5][0], name:acculrate[5][1]},
                	{value:acculrate[6][0], name:acculrate[6][1]},
                	{value:acculrate[7][0], name:acculrate[7][1]},  
                	{value:acculrate[8][0], name:acculrate[8][1]},
                	{value:acculrate[9][0], name:acculrate[9][1]},
                	{value:acculrate[10][0], name:acculrate[10][1]},
                	{value:acculrate[11][0], name:acculrate[11][1]},
                	{value:acculrate[12][0], name:acculrate[12][1]},
                	{value:acculrate[13][0], name:acculrate[13][1]},
                	{value:acculrate[14][0], name:acculrate[14][1]},
                	{value:acculrate[15][0], name:acculrate[15][1]},
                	{value:acculrate[16][0], name:acculrate[16][1]},
                	{value:acculrate[17][0], name:acculrate[17][1]},
                	{value:acculrate1[0][0], name:acculrate1[0][1]},
                	{value:acculrate1[1][0], name:acculrate1[1][1]},
                	{value:acculrate1[2][0], name:acculrate1[2][1]},
                	{value:acculrate1[3][0], name:acculrate1[3][1]},
                	{value:acculrate1[4][0], name:acculrate1[4][1]},
                	{value:acculrate1[5][0], name:acculrate1[5][1]},
                	{value:acculrate1[6][0], name:acculrate1[6][1]},
                	{value:acculrate1[7][0], name:acculrate1[7][1]},   
                	{value:acculrate1[8][0], name:acculrate1[8][1]},
                	{value:acculrate1[9][0], name:acculrate1[9][1]},
                	{value:acculrate1[10][0], name:acculrate1[10][1]},
                	{value:acculrate1[11][0], name:acculrate1[11][1]},
                	{value:acculrate1[12][0], name:acculrate1[12][1]},
                	{value:acculrate1[13][0], name:acculrate1[13][1]},
                	{value:acculrate1[14][0], name:acculrate1[14][1]},
                	{value:acculrate1[15][0], name:acculrate1[15][1]},
                	{value:acculrate1[16][0], name:acculrate1[16][1]}, 
                	{value:acculrate1[17][0], name:acculrate1[17][1]}, 
                	{value:acculrate2[0][0], name:acculrate2[0][1]},
                	{value:acculrate2[1][0], name:acculrate2[1][1]},
                	{value:acculrate2[2][0], name:acculrate2[2][1]},
                	{value:acculrate2[3][0], name:acculrate2[3][1]},
                	{value:acculrate2[4][0], name:acculrate2[4][1]},
                	{value:acculrate2[5][0], name:acculrate2[5][1]},
                	{value:acculrate2[6][0], name:acculrate2[6][1]},
                	{value:acculrate2[7][0], name:acculrate2[7][1]},  
                	{value:acculrate2[8][0], name:acculrate2[8][1]},
                	{value:acculrate2[9][0], name:acculrate2[9][1]},
                	{value:acculrate2[10][0], name:acculrate2[10][1]},
                	{value:acculrate2[11][0], name:acculrate2[11][1]},
                	{value:acculrate2[12][0], name:acculrate2[12][1]},
                	{value:acculrate2[13][0], name:acculrate2[13][1]},
                	{value:acculrate2[14][0], name:acculrate2[14][1]},
                	{value:acculrate2[15][0], name:acculrate2[15][1]},
                	{value:acculrate2[16][0], name:acculrate2[16][1]},
                	{value:acculrate2[17][0], name:acculrate2[17][1]}
                    ],
                    //color : [
                        //'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
                        // '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
                        // '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0','#d48265', '#91c7ae','#2f4554'
                     // ]
                
                
                    color:[
                        'rgb(167, 220, 224)',
                        'rgb(138, 171, 202)',
                        'rgb(38, 188, 213)',
                        'rgb(1, 158, 213)',
                        'rgb(28, 120, 135)',
                        'rgb(17, 64, 108)',
                        
                        'rgb(  6, 128,  67)',
                        'rgb( 38, 157, 128)',
                        'rgb( 29, 191, 151)',
                        'rgb( 29, 191, 151)',
                        'rgb(107, 194,  53)',
                        'rgb(137, 190, 178)',
                        'rgb(174, 221, 129)',
                        
                        'rgb(222, 211, 140)',
                        'rgb(201, 186, 131)',
                        'rgb(244, 208,   0)',
                        'rgb(222, 156,  83)',
                        'rgb( 29, 131,   8)',
                        'rgb(220,  87,  18)',
                   ]
            },
            {
                name:'三类事情占比',
                type:'pie',
                radius: ['20%', '40%'],
                label: {
                    normal: {
                        position:'inside',
                        align:'right',
                        fontSize: 9,
                        fontFamily:'Microsoft YaHei',
                        color:"#FFEFE0"
                    }
                },
                data:[
                    {value:mysum[0][0], name:mysum[0][1]},
                    {value:mysum[1][0], name:mysum[1][1]},
                    {value:mysum[2][0], name:mysum[2][1]}
                ],
                
                color:[
                	'rgb(137, 157, 192)',
                	'rgb(113, 150, 159)',
                	'rgb(113, 175, 164)'
                	
                ]
            },
            {
                name:'部门',
                type:'pie',
                radius: ['0%', '15%'],
                label: {
                    normal: {
                        position: 'center',
                        fontSize: 11,
                        fontFamily:'Microsoft YaHei',
                        color:'rgb(255, 255, 255)'
                    }
                },
                data:[
                    {value:mysum[0][0]+mysum[1][0]+mysum[2][0], name:'事件结办分析'}
                ],
                color:'rgb(224, 208, 0)'
            }
        ]
    };
    myChart.setOption(option);        	 	
}

function a6_draw(obj, myChart) {//titleName, xData, seriesName, seriesData
	monthdata=[];
	
	numdata=[];
	var strlen = (obj.data).length;
	
	for(var i=0;i<strlen;i++){        
		numdata.push(obj.data[i][1]);
		monthdata.push(obj.data[i][0]);	
	}
	
	var titleName='事件数目变化折线图';
	var xData=monthdata;
	var seriesName='事件数';
	var seriesData=numdata;
		
		
	myOption = {
		color : [ '#6a7985' ],
		//标题样式
		title : {
			text : titleName,
			textStyle : {
				color : 'rgb(15, 144, 207)',
				fontSize:30
			},
			left : 'center'
		},
		//菜单
		legend : {
			show : false
		},
		//提示框
		tooltip : {
			trigger : 'axis',
			position : 'top',
			axisPointer : {
				type : 'cross',
				label : {
					backgroundColor : '#6a7985'
				}
			}
		},
		//图形位置
		grid : {
			left : '4%',
			right : '6%',
			bottom : '4%',
			top : 80,
			containLabel : true
		},
		//x轴
		xAxis : [ {
			type : 'category',
			//坐标轴两边留白策略，即x轴坐标点开始与结束点位置都不在最边缘
			boundaryGap : true,
			axisLine : {
				show : true,
				//x轴线样式
				lineStyle : {
					color : '#17273B',
					width : 1,
					type : 'solid'
				}
			},
			//x轴字体设置
			axisLabel : {
				show : true,
				fontSize : 15,
				color : 'rgb(15, 144, 207)'
			},
			data : xData
		} ],
		//y轴
		yAxis : [ {
			type : 'value',
			//y轴字体设置
			axisLabel : {
				show : true,
				color : 'rgb(15, 144, 207)',
				fontSize : 15
			},
			//y轴线设置不显示
			axisLine : {
				show : false
			},
			//与x轴平行的线样式
			splitLine : {
				show : true,
				lineStyle : {
					color : '#17273B',
					width : 1,
					type : 'solid',
				}
			}
		} ],
		series : [ {
			name : seriesName,
			type : 'line',
			//折线平滑
			smooth : true,
			symbol : 'circle',
			symbolSize : 6,
			//线条样式
			lineStyle : {
				color : {
					type : 'linear',
					x : 0,
					y : 0,
					x2 : 0,
					y2 : 1,
					colorStops : [ {
						offset : 0,
						// 0% 处的颜色
						color : 'red'
					}, {
						offset : 1,
						// 100% 处的颜色
						color : '#6ae6dd'
					} ],
					globalCoord : false
				},
				width : 2,
				type : 'solid',
			},
			//折线连接点样式
			itemStyle : {
				color : '#00E5DE'
			},
			//折线堆积区域样式
			areaStyle : {
				color : 'rgb(38,188,213)'
			},
			data : seriesData
		} ]
	};
	myChart.setOption(myOption);
}