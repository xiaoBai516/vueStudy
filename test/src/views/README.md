## vuex: store文件 vuex-dome

## 静态请求及underscore使用 ：view/localData/index.vue

## 过滤器filter ：view/filter/index.vue

<template>
     <div>
          <ul class="listSty" v-for="item in listata">
               <li key="item.id">姓名：<span>{{item.name}}</span>,性别：<span>{{item.sex | sexType}}</span>,出生日期：<span>{{item.datatime | formatDate}}</span></li>
          </ul>
     </div>
</template>

<script>
     import Formatter from "@/utils/formatter";
     export default {
          name: "audit",
          data() {
               return {
                    listata:[
                         {"id":1,"datatime":"2012010310:10:12","name":"小高","sex":"1"},
                         {"id":2,"datatime":"2015010310:10:12","name":"小美","sex":"2"},
                         {"id":3,"datatime":"2019010310:10:12","name":"小米","sex":"0"}
                    ]
               };
          },
          filters: {
               ...Formatter,
               formatDate (val) {
                    if(val =='') 
                    return;
                    const year = val.substring(0,4);
                    const month = val.substring(4,6);
                    const day = val.substring(6,8);
                    const time = val.substring(8,18);
                    return `${year}-${month}-${day} ${time}`;
               }
          },
          c
     };
</script>


