<template>
  <div style="display: flex; justify-content: end; margin-right: 50px">
    <Space direction="vertical">
      <div class="time glass">
        <div style="font-size: 40px">{{ now }}</div>
        <div style="font-size: 18px">
          {{ week }}
          {{ month }}
          {{ date }}
        </div>
      </div>
      <Cloud></Cloud>
      <Quote></Quote>
      <Note></Note>
    </Space>
  </div>
</template>

<script lang="ts" setup>
import {Space, Row, Col, Button} from "ant-design-vue"
import Cloud from "./cloud.vue"
import Quote from "./quote.vue"
import Note from "./note.vue"
import dayjs from "dayjs";
import {ref} from "vue"
const now = ref()
const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',"August","September","October","November","December"]
const week = ref()
const month = ref()
const date = ref()
const UpdateNow = () => {
  now.value = dayjs(new Date()).format("HH:mm")
  week.value = weeks[new Date().getDay()]
  month.value = months[new Date().getMonth()]
  date.value = new Date().getDate()
  setTimeout(UpdateNow, 60000)
}
UpdateNow()

</script>

<style scoped>
.glass{
  color: white;
  overflow: hidden;
  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
  border-radius: 5px;
}
.time{
  width: 250px;
  padding: 20px;
  text-align: center;
}
.cloud{
  position: relative;
  width: 250px;
  padding: 20px;
}
.setting{
  position: absolute;
  right: 0;
  top: 0;
}
/*.cloud:before{*/
/* content: "";*/
/* width: 250px;*/
/* height: 250px;*/
/* background: inherit;*/
/* position: absolute;*/
/* left: -25px;*/
/* right: 0;*/
/* top: -25px;*/
/* bottom: 0;*/
/* box-shadow: inset 0 0 0 200px rgba(59,59,59,0.2);*/
/* filter: blur(10px);*/
/*}*/
</style>