 `<tab-page :data='dataLists' :option='option1'>
        <ul class="list-box">
          <li v-for="(item,index) in dataLists" :key="index">{{item.name}}</li>
        </ul>
  </tab-page>`
  dataLists:为数据
  ul为slot元素
  option1:{
        number:5,//默认显示五个
        single:true,//默认值false是一次性走动一页，true是一次性走动一个
        autoScroll:true,//自动滚动，默认false不滚动
        autoScrollTime:2000,//自动滚动时间间隔，默认3s，
        button:true,//左右两侧按钮显示
        （autoScroll为false，button必为true)
      },
   注：
       1.li如果有间隔，请向右间隔，即margin-right
       2.option1参数选填，可全不填
       3.移到元素上停止滚动效果，离开继续
