<template>
  <div style="display: flex; justify-content: end; margin-right: 50px">
    <Space direction="vertical">
      <div class="cloud glass">
      </div>
    </Space>
  </div>
</template>

<script lang="ts" setup>
import {Space, Row, Col} from "ant-design-vue"
</script>

<style scoped>
.glass{
  color: white;
  overflow: hidden;
  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(10px)
}
.cloud{
  width: 250px;
  height: 100px;
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