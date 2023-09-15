<template>
  <div class="wallpaper">
    <Layout style="background-color: rgba(0,0,0,0)">
      <LayoutHeader :style="headerStyle"></LayoutHeader>
      <LayoutContent>
        <Row>
          <Col :span="6">
            <Left></Left>
          </Col>
          <Col :span="12">
            <Home></Home>
          </Col>
          <Col :span="6"></Col>
        </Row>
      </LayoutContent>
    </Layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { CSSProperties } from 'vue';
import Home from './components/Home.vue';
import Left from './components/left.vue';
import {Layout, LayoutHeader, LayoutContent,Row, Col} from "ant-design-vue"
export default defineComponent({
  name: 'App',
  components: {
    Home,
    Layout,
    LayoutHeader,
    LayoutContent,
    Row,
    Col,
    Left
  },
  setup(){
    const headerStyle: CSSProperties = {
      textAlign: 'center',
      color: '#fff',
      height: 64,
      paddingInline: 50,
      lineHeight: '64px',
      backgroundColor: "rgba(0,0,0,0)",
    };
    return{headerStyle}
  }
});
</script>

<style>
#app {
  position: absolute;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  background-image: url("https://api.yimian.xyz/img?type=moe&size=1920x1080 ");
}
/*.wallpaper{*/
/*  background-image: url("https://api.yimian.xyz/img?type=wallpaper");*/
/*}*/
</style>
