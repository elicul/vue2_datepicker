<template>
  <div id="app">
    <div class="demo">
      <date-picker v-model="value" range></date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from '../datepicker/index.vue'

export default {
  name: 'app',
  components: { DatePicker },
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style>
.demo {
  float:left;
  margin:250px;
}
.label{
  margin-right: 1em;
}
</style>
