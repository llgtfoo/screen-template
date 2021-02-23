`<list-scroll v-if="dataScrollList.length>0" :option='scrollOption'       ref='scrollList'>
  <ul class="scroll-list" slot="main">
    <li v-for="(item,index) in dataScrollList" 
    :key="index" id="child" ref="child">
    <span>{{ item.name }}</span>
    <span>{{ item.age }}</span>
    <span>{{ item.marriage }}</span>
</li>
</ul>//列表滚动内容
</list-scroll >`
  参数：
slot = "main"为滚动内容
dataScrollList为滚动数据, 数据不为空的时候加载组件，计算组件高度
------------------------------------------------------------------------------
scrollOption: {
  number: 6,//默认显示几个
  seamless: true,//无缝滚动，默认true
  duration: 2000//滚动时间间隔，无缝滚动时间间隔为此时间除以10
},
存在鼠标滚动
-------------------------------------------------------------------------------
  或者
scrollOption: {
  number: 6,//默认显示几个
  seamless: false,//单个过渡滚动，默认true
  duration: 2000//滚动时间间隔，无缝滚动时间间隔为此时间除以10
},
鼠标操作无效，可以事件触发
方法：
可以利用ref调取函数
sKeep()//继续滚动
sStop()//停止滚动