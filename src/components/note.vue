<template>
  <Space direction="vertical">
    <div v-for="(note, index) of notes" class="glass note" @mouseenter="deleteButtonShow[index] = true" @mouseleave="deleteButtonShow[index] = false">
      <div class="setting" v-show="deleteButtonShow[index]">
        <Button type="text" style="color: #c6c6c6" shape="circle" @click="remove(index)">
          <template #icon>
            <CloseCircleOutlined />
          </template>
        </Button>
      </div>
      <Textarea @change="" auto-size style="background-color: rgba(0,0,0,0); border-width: 0; color: white" v-model:value="notes[index]"></Textarea>
    </div>
    <div class="notes-add glass" @click="handleAdd">
      <PlusCircleOutlined />
      Add Note
    </div>
  </Space>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue"
import {Textarea, Space, Button} from "ant-design-vue"
import {PlusCircleOutlined, CloseCircleOutlined} from "@ant-design/icons-vue"
const notes = ref([])
const deleteButtonShow = ref([])
const handleAdd = () => {
  notes.value.push("")
  deleteButtonShow.value.push(false)
}
let _notes = localStorage.getItem("SUK_TAB_NOTES")
if (_notes){
  notes.value = JSON.parse(_notes)
}
watch(notes.value, ()=>{
  localStorage.setItem("SUK_TAB_NOTES", JSON.stringify(notes.value))
})

const remove = (index) => {
  notes.value.splice(index, 1)
  deleteButtonShow.value.splice(index, 1)
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
.notes-add{
  cursor: pointer;
  position: relative;
  width: 250px;
  padding: 10px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
.note{
  position: relative;
  width: 250px;
  padding: 20px;
  text-align: center;
}
.setting{
  position: absolute;
  right: 0;
  top: 0;
}
</style>