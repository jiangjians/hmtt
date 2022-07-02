<template>
  <div>
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="mini"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in ChannelsList" :key="item.id">
          <div
            class="inner"
            :style="{ color: active === index ? 'pink' : '' }"
            @click="onClick(index)"
          >
            {{ item.name }}
            <van-icon name="close" v-if="index != 0" v-show="isCloseShow" />
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in tuijianChannels" :key="item.id">
          <div class="inner van-ellipsis" @click="add(item.id)">
            +{{ item.name }}
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'ChannelsList'
export default {
  name: 'ChannelsPanel',
  props: {
    ChannelsList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllArticleList()
  },
  data () {
    return {
      tuijianChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    async getAllArticleList () {
      try {
        const res = await getAllArticleList()
        // this.tuijianChannels = res.data.data.channels.filter(item => this.ChannelsList.every(item1 => item1.id !== item.id))
        this.tuijianChannels = _.differenceBy(res.data.data.channels, this.ChannelsList, 'id')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    },
    add (id) {
      const index = this.tuijianChannels.findIndex(item => item.id === id)
      this.ChannelsList.push(this.tuijianChannels[index])
      this.tuijianChannels.splice(index, 1)
    },
    // del (id) {
    //   const index = this.ChannelsList.findIndex(item => item.id === id)
    //   this.tuijianChannels.push(this.ChannelsList[index])
    //   this.ChannelsList.splice(index, 1)
    // },
    onClick (index) {
      if (this.isCloseShow) {
        // 删除
        if (index === 0) { return }
        this.tuijianChannels.push(this.ChannelsList[index])
        this.ChannelsList.splice(index, 1)
        if (this.active > index) { this.$emit('change-active1', this.active - 1) }
      } else {
        // 点击跳转
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    ChannelsList: {
      async handler (newval) {
        if (this.$store.state.user && this.$store.state.user.token) {
          console.log(newval)
          const arr = []
          newval.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (error) {
            console.log(error)
          }
        } else {
          setItem(CHANNELS, newval)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 20px;
    h3 {
      font-size: 32px;
      font-weight: 400;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    background: #f4f5f6;
    border-radius: 6px;
    font-size: 28px;
    font-weight: 400;
    color: #222222;
    line-height: 86px;
    text-align: center;
    margin-left: 14px;
    position: relative;
    .van-icon-close {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
      color: initial;
    }
  }
}
.van-col {
  margin-bottom: 22px;
}
</style>
