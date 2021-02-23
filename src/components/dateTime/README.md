`
  <date-time v-slot="slotProps">{{slotProps.data.year}} {{slotProps.data.time}}</date-time>
`
`
解构插槽 Prop
 <date-time v-slot="{data}">{{data.year}} {{data.time}}</date-time>
`
`
slot-scope新版本已经废弃
<date-time>
    <template slot-scope="time">
     {{time.data.year}}-{{time.data.time}}
   </template>
</date-time>  
`
 data:{
         year, //年
          month,//月
          day,//日
          week,//星期几
          time//时间
  }