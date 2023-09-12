<template>
  <div>
    <InputGroup compact>
      <Select class="tubiao" v-model:value="engine" size="large">
        <template #suffixIcon></template>
        <SelectOption value="Google Search">
          <Avatar :src="GoogleImg" :size="27"></Avatar>
        </SelectOption>
        <SelectOption value="Bing Search">
          <Avatar :src="BingImg" :size="27"></Avatar>
        </SelectOption>
      </Select>
      <AutoComplete
          style="width: 500px"
          v-model:value="search"
          :options="options"
          @change="searchHandle"
          @select="onSelect"
      >
        <template #option="{ value: val }">
          <div v-html="val"></div>
        </template>
        <InputSearch size="large" @search="submit" :placeholder="engine">
        </InputSearch>
      </AutoComplete>
    </InputGroup>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import GoogleImg from "../assets/google.png"
import BingImg from "../assets/bing.png"
import axios from "axios";
import {InputGroup, Select, SelectOption, AutoComplete, InputSearch, Avatar, Dropdown, Menu, MenuItem} from "ant-design-vue"
const searchUrl = `https://www.google.com/complete/search?client=chrome&q=`
const engine = ref("Google Search")
const search = ref("")
const options = ref<{ value: string }[]>([])
const searchHandle = () => {
  axios.get(`https://www.google.com/complete/search?client=chrome&q=${search.value}`).then(res => {
    options.value = res.data[1].map(item => {return {value: item}})
  })
}
const onSelect = (v: string) => {
  let k = document.createElement("span")
  k.innerHTML = v
  search.value = k.innerText
}
const submit = () => {
  window.location.href = `https://www.google.com/search?q=${search.value}`
}
</script>

<style>
.tubiao .ant-select-selection-item{
  padding-inline-end: 0 !important;
}
.tubiao .ant-select-selector{
  border-start-start-radius: 18px!important;
  border-end-start-radius: 18px!important;
}
.ant-select-item-option{
  padding: 5px!important;
}
.ant-input-search-button{
  border-start-end-radius: 18px!important;
  border-end-end-radius: 18px!important;
}
</style>