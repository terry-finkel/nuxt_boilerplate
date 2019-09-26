<template>
  <div class="list w-full rounded p-2 mx-3">
    <ListItem
      v-for="entity in entities"
      :key="entity.id"
      :item-type="source"
      :data="entity"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ListItem from '@/components/list/items/ListItem'

const { mapGetters } = createNamespacedHelpers('list')

export default {
  name: 'List',
  components: {
    ListItem
  },
  props: {
    source: {
      type: String,
      default: 'users'
    }
  },
  data() {
    return {
      entities: []
    }
  },
  computed: {
    ...mapGetters(['COMMENTS', 'USERS', 'IS_BUSY', 'ERROR'])
  },
  async mounted() {
    switch (this.source) {
      default:
      case 'users':
        await this.$store.dispatch('list/FETCH_USERS')
        this.entities = this.USERS
        break
      case 'comments':
        await this.$store.dispatch('list/FETCH_COMMENTS')
        this.entities = this.COMMENTS
        break
    }
  }
}
</script>

<style scoped>
.list {
  background: #eff8ff;
  max-height: 550px;
  overflow: auto;
}
</style>
