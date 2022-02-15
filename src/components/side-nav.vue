<template>
  <div
    class="side-nav"
  >
    <ul>
      <li
        v-for="(item, key) in data"
        :key="key"
        class="nav-item"
      >
        <a v-if="!item.path && !item.href" @click="expandMenu">{{ item.name }}</a>
        <a v-if="item.href" :href="item.href" target="_blank">{{ item.name }}</a>
        <router-link
          v-if="item.path"
          active-class="active"
          :to="item.path"
          exact
          v-text="item.name"
        />
        <ul v-if="item.children" class="pure-menu-list sub-nav">
          <li
            v-for="(navItem, key) in item.children"
            :key="key"
            class="nav-item"
            :style="`background: ${navItem.isComplete ? 'green' : 'yellow'}`"
          >
            <router-link
              class=""
              active-class="active"
              :to="navItem.path"
              exact
              v-text="navItem.name"
            />
          </li>
        </ul>
        <template v-if="item.groups">
          <div
            v-for="(group, key) in item.groups"
            :key="key"
            class="nav-group"
          >
            <div class="nav-group__title" @click="expandMenu">{{ group.groupName }}</div>
            <ul class="pure-menu-list">
              <li
                v-for="(navItem, keey) in group.list"
                v-show="!navItem.disabled"
                :key="keey"
                class="nav-item"
                :style="`background: ${navItem.isComplete ? 'green' : 'yellow'}`"
              >
                <router-link
                  active-class="active"
                  :to="navItem.path"
                  exact
                  v-text="navItem.name"
                />
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navDatas from '@/json/nav.config.json'

export default defineComponent({
  setup() {
    const data = ref(navDatas)
    
    return {
      data
    }
  }
})
</script>

<style lang="scss" scoped>
  .side-nav {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;

    > ul > .nav-item > a {
      margin-top: 15px;
    }

    > ul > .nav-item:nth-child(-n + 4) > a {
      margin-top: 0;
    }

    .nav-item {
      a {
        font-family: 'PingFangMedium';
        font-size: 16px;
        color: #333;
        line-height: 40px;
        height: 40px;
        margin: 0;
        padding: 0;
        text-decoration: none;
        display: block;
        position: relative;
        font-weight: bold;

        &.active {
          color: #409EFF;
        }
      }

      .nav-item {
        a {
          display: block;
          height: 40px;
          color: #444;
          line-height: 40px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: normal;

          &:hover,
          &.active {
            color: #409EFF;
          }
        }
      }
    }

    .nav-group__title {
      font-size: 12px;
      color: #999;
      line-height: 26px;
      margin-top: 15px;
    }
  }
</style>
