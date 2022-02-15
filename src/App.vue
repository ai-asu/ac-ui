<template>
  <section class="ac-container">
    <Header />
    <section class="ac-content">
      <section class="ac-side-nav">
        <ac-scrollbar>
          <side-nav />
        </ac-scrollbar>
      </section>
        <section class="ac-main">
          <ac-scrollbar class="page-component__scroll">
            <router-view></router-view>
          </ac-scrollbar>
        </section>
    </section>
    <section class="ac-footer">AC © 2021</section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header.vue'
import SideNav from '@/components/side-nav.vue'

export default defineComponent({
  components: {
    Header,
    SideNav
  }
})
</script>

<style lang="scss" scoped>
.ac-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
}
.ac-content {
  height: calc(100% - 120px);
  overflow: hidden;
  display: flex;
}
.ac-side-nav {
  width: 240px;
}
.ac-main {
  flex: 1;
  padding: 40px;
  margin-right: 150px;
}
.ac-footer {
  text-align: center;
  border-top: 1px solid #dcdfe6;
  line-height: 60px;
  font-family: 'PingFangBold';
  font-size: 20px;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
