<template>
  <div class="cloud glass" @mouseenter="cloudSettingButtonShow = true" @mouseleave="cloudSettingButtonShow = false">
    <div class="setting" v-show="cloudSettingButtonShow">
      <Button type="text" style="color: #c6c6c6" @click="cloudSettingShow = !cloudSettingShow">
        <template #icon>
          <SettingOutlined />
        </template>
      </Button>
    </div>
    <iframe v-if="!cloudSettingShow" width="300" scrolling="no" height="60" frameborder="0" allowtransparency="true" :src="`https://i.tianqi.com?c=code&id=79&color=%23FFFFFF&icon=1&py=${location}&site=12`"></iframe>
    <div v-else>
      <AutoComplete v-model:value="locationtmp" :options="options" style="width: 200px" placeholder="Select Location" @search="onSelect"></AutoComplete>
      <div style="text-align: center;margin-top: 8px">
        <Button ghost @click="saveLocation" size="small">save</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup="">
import {ref} from 'vue'
import {SettingOutlined} from "@ant-design/icons-vue"
import {Button, AutoComplete} from "ant-design-vue"
import _ from "lodash-es"
import {searchLocation} from "@/api/cloud"
const cloudSettingButtonShow = ref(false)
const cloudSettingShow = ref(false)
const location = ref('shanghai')
let _location = localStorage.getItem("SUK_TAB_CLOUD_LOCATION")
if (_location){
  location.value = _location
}
const locationtmp = ref()
const options = ref([])
const onSelect = _.debounce(() => {
  if (locationtmp.value){
    searchLocation(locationtmp.value).then(res => {
      options.value = []
      for(let item of res){
        options.value.push({
          value: item["pinyin"],
          label: `${item["name"]}-${item["pid_name"]}`
        })
      }
      console.log(options.value)
    })
  }
}, 200)

const saveLocation = () => {
  location.value = locationtmp.value
  localStorage.setItem("SUK_TAB_CLOUD_LOCATION", location.value)
  cloudSettingShow.value = false
}
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
</style>