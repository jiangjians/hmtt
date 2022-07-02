<template>
  <div>
    <van-cell
      v-for="(item, index) in SuggestList"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      SuggestList: []
    }
  },
  methods: {
    // 因为这块要渲染的不是普通的字符串，而是html片段，所以必须要用v-html v-html是属性绑定，所以不能用过滤器
    // 所以只能在methods中写
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style='color:red'>${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            this.SuggestList = res.data.data.options
          } catch (error) {
            console.log(error)
          }
        }, 200)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
