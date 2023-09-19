<template>
  <div class="quotes glass" @mouseenter="nextButton = true" @mouseleave="nextButton = false">
    <div style="font-style: italic;">"{{ quote.quote }}"</div>
    <div style="text-align: right; line-height: 25px;">—— {{ quote.origin }}</div>
    <div class="next-quote" v-show="nextButton">
      <Button shape="circle" type="text" style="color: #c6c6c6" ghost size="small" @click="getRandomQuote">
        <template #icon>
          <RightCircleOutlined />
        </template>
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue"
import {quotes} from "@/components/quotes";
import {Button} from "ant-design-vue";
import {RightCircleOutlined } from "@ant-design/icons-vue"
const quote = ref()
const nextButton = ref(false)
const getRandomQuote = () => {
  let index = Math.floor((Math.random() * quotes.length))
  quote.value = quotes[index]
}
getRandomQuote()
</script>

<style scoped>
.glass{
  color: white;
  overflow: hidden;
  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(10px);
  border-radius: 5px;
}
.quotes{
  position: relative;
  width: 250px;
  padding: 20px;
  font-size: 10px;
  font-style: italic;
}
.next-quote{
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
}
</style>