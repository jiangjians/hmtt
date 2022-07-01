<template>
  <div>
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in ChannelsList" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '97%', paddingTop: '1rem' }"
    >
      <ChannelPanel
        :ChannelsList="ChannelsList"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShow = false;
        "
        @change-active1="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import ChannelPanel from '@/views/Home/components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { getItem } from '@/utils/storage'
const CHANNELS = 'ChannelsList'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: 0,
      ChannelsList: [],
      isChannelPanelShow: false
    }
  },
  methods: {
    // 1．没有登录第一次安装好app,第一次打开的时候只能去ajax中拿
    // 2．没有登录，但是第二次打开，有可能频道被用编辑或删除过，这样的话，本地
    // 存储就有值，从本地存储拿
    // 3．登录过直接从ajax拿
    // 先判断 token 如果有token 去ajax中拿然后再判断本妙存储有没有channels数据，如果没有就从ajax中拿否则从
    // 只要本地存储有数据并且没有登录就从本地存储中拿了否则从ajax拿
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.ChannelsList = channels
      } else {
        try {
          const res = await getMyChannels()
          this.ChannelsList = res.data.data.channels
          console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {},

  filters: {},
  components: {
    ArticleList,
    ChannelPanel
  }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}

/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: solid 1px #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background: #3296fa;
  border-radius: 3px;
}
.menu {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 40px;
  }
}
.menu1 {
  min-width: 100px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
</style>
