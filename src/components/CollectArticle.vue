<template>
  <van-loading v-if="isLoading" size=".53333rem" />
  <van-icon
    v-else
    color="#777"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onclick"
  />
</template>

<script>
import { addCollected, delCollected } from '@/api/article'
export default {
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  name: 'CollectArticle',
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onclick () {
      this.isLoading = true
      const target = this.$route.params.article_id
      if (this.is_collected) {
        try {
          await delCollected(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await addCollected(target)
          this.$emit('update:is_collected', !this.is_collected)
        } catch (error) {
          console.log(error)
        }
      }
      this.isLoading = false
      // this.$emit('update:is_collected', !this.is_collected)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
