<template>
  <div class="datepicker" :style="{'width': width + 'px','min-width':range ? '210px' : '140px'}" v-clickoutside="closePopup">
    <input readonly class="input" :value="text" :placeholder="innerPlaceholder" ref="input" @click="togglePopup" @mousedown="$event.preventDefault()">
    <i class="input-icon" :class="showCloseIcon ? 'input-icon__close' : 'input-icon__calendar'" @mouseenter="hoverIcon" @mouseleave="hoverIcon" @click="clickIcon" >
    </i>
    <div class="datepicker-popup" :class="{'range':range}" :style="position" ref="calendar" v-show="showPopup">
      <template v-if="!range">
        <calendar-panel @select="showPopup = false" v-model="currentValue" :show="showPopup"></calendar-panel>
      </template>
      <template v-else>
        <!--<div class="datepicker-top" v-if="ranges.length">
          <span v-for="range in ranges" @click="selectRange(range)">{{range.text}}</span>
        </div>-->
        <calendar-panel style="width: 35%; box-shadow:1px 0 rgba(0, 0, 0, .1)" v-model="currentValue[0]" :end-at="currentValue[1]" :show="showPopup"></calendar-panel>
        <calendar-panel style="width: 35%; box-shadow:1px 0 rgba(0, 0, 0, .1)" v-model="currentValue[1]" :start-at="currentValue[0]" :show="showPopup"></calendar-panel>
        <div class="datepicker-left" style="width: 25%;float: left;margin-top: 20px;" v-if="ranges.length">
          <button v-for="range in ranges" @click="selectRange(range)" type="button" class="btn btn-sm btn-primary" style="display: block;margin: 10px;width: 100%;">
            {{range.text}}
          </button>
          <button type="button" class="btn btn-sm btn-success" style="margin: 10px;" @click="closePopup">Apply</button>
          <button type="button" class="btn btn-sm btn-secondary" style="margin: 10px;" @click="clickCancel">Cancel</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CalendarPanel from './calendar-panel.vue'
import Languages from './languages.js'

export default {
  components: { CalendarPanel },
  props: {
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    range: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 210
    },
    placeholder: String,
    lang: {
      type: String,
      default: 'en'
    },
    value: null,
    shortcuts: {
      type: [Boolean, Array],
      default: true
    },
    disabledDays: {
      type: Array,
      default: function () { return [] }
    },
    notBefore: {
      type: String,
      default: ''
    },
    notAfter: {
      type: String,
      default: ''
    },
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: val => val >= 1 && val <= 7
    }
  },
  data () {
    return {
      showPopup: false,
      showCloseIcon: false,
      currentValue: this.value,
      position: null,
      ranges: []
    }
  },
  watch: {
    value: {
      handler (val) {
        if (!this.range) {
          this.currentValue = this.isValidDate(val) ? val : undefined
        } else {
          this.currentValue = this.isValidRange(val) ? val : [undefined, undefined]
        }
      },
      immediate: true
    },
    currentValue (val) {
      if ((!this.range && val) || (this.range && val[0] && val[1])) {
        this.$emit('input', val)
      }
    },
    showPopup (val) {
      if (val) {
        this.$nextTick(this.displayPopup)
      }
    }
  },
  computed: {
    translation () {
      return Languages[this.lang] || Languages['en']
    },
    innerPlaceholder () {
      return this.placeholder || (this.range ? this.translation.placeholder.dateRange : this.translation.placeholder.date)
    },
    text () {
      if (!this.range && this.currentValue) {
        return this.stringify(this.currentValue)
      }
      if (this.range && this.currentValue[0] && this.currentValue[1]) {
        return this.stringify(this.currentValue[0]) + ' ~ ' + this.stringify(this.currentValue[1])
      }
      return ''
    }
  },
  methods: {
    closePopup () {
      this.showPopup = false
    },
    togglePopup () {
      if (this.showPopup) {
        this.$refs.input.blur()
        this.showPopup = false
      } else {
        this.$refs.input.focus()
        this.showPopup = true
      }
    },
    hoverIcon (e) {
      if (e.type === 'mouseenter' && this.text) {
        this.showCloseIcon = true
      }
      if (e.type === 'mouseleave') {
        this.showCloseIcon = false
      }
    },
    clickCancel(){
      this.$emit('input', '')
    },
    clickIcon () {
      if (this.showCloseIcon) {
        this.$emit('input', '')
      } else {
        this.togglePopup()
      }
    },
    formatDate (date, fmt) {
      const map = {
        'M+': date.getMonth() + 1, // 月份
        '[Dd]+': date.getDate(), // 日
        '[Hh]+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      let str = fmt.replace(/[Yy]+/g, function (str) {
        return ('' + date.getFullYear()).slice(4 - str.length)
      })
      Object.keys(map).forEach((key) => {
        str = str.replace(new RegExp(key), function (str) {
          const value = '' + map[key]
          return str.length === 1 ? value : ('00' + value).slice(value.length)
        })
      })
      return str
    },
    stringify (date) {
      return this.formatDate(new Date(date), this.format)
    },
    isValidDate (date) {
      return !!new Date(date).getTime()
    },
    isValidRange (date) {
      return Array.isArray(date) &&
        date.length === 2 &&
        this.isValidDate(date[0]) &&
        this.isValidDate(date[1])
    },
    selectRange (range) {
      this.$emit('input', [range.start, range.end])
    },
    initRanges () {
      let thisMonthStart = new Date();
      let thisMonthFinish = new Date();

      let lastMonthStart = new Date();
      let lastMonthFinish = new Date();
      
      thisMonthStart.setFullYear(thisMonthStart.getFullYear(), thisMonthStart.getMonth(), 1);
      thisMonthFinish.setFullYear(thisMonthFinish.getFullYear(), thisMonthFinish.getMonth()+1, 1);

      lastMonthFinish.setFullYear(lastMonthFinish.getFullYear(), lastMonthFinish.getMonth(), 1);
      lastMonthFinish = new Date(lastMonthFinish - 3600 * 1000 * 24);
      lastMonthStart.setFullYear(lastMonthFinish.getFullYear(), lastMonthStart.getMonth()-1, 1);
      
      var d = new Date(lastMonthFinish - 3600 * 1000 * 24)
      console.log(d);

      if (Array.isArray(this.shortcuts)) {
        this.ranges = this.shortcuts
      } else if (this.shortcuts) {
        this.ranges = [{
          text: 'Today',
          start: new Date(),
          end: new Date()
        }, {
          text: 'Yesterday',
          start: new Date(Date.now() - 3600 * 1000 * 24),
          end: new Date(Date.now() - 3600 * 1000 * 24)
        }, {
          text: 'Last 7 days',
          start: new Date(Date.now() - 3600 * 1000 * 24 * 7),
          end: new Date()
        }, {
          text: 'Last 30 days',
          start: new Date(Date.now() - 3600 * 1000 * 24 * 30),
          end: new Date()
        },
        {
          text: 'This Month',
          start: new Date(thisMonthStart - 3600),
          end: new Date(thisMonthFinish - 3600 * 1000 * 24)
        },
        {
          text: 'Last Month',
          start: new Date(lastMonthStart - 3600),
          end: new Date(lastMonthFinish)
        }]
        this.ranges.forEach((v, i) => {
          v.text = this.translation.pickers[i]
        })
      } else {
        this.ranges = []
      }
    },
    displayPopup () {
      const dw = document.documentElement.clientWidth
      const dh = document.documentElement.clientHeight
      const InputRect = this.$el.getBoundingClientRect()
      const PopupRect = this.$refs.calendar.getBoundingClientRect()
      this.position = {}
      if (dw - InputRect.left < PopupRect.width && InputRect.right < PopupRect.width) {
        this.position.left = 1 - InputRect.left + 'px'
      } else if (InputRect.left + InputRect.width / 2 <= dw / 2) {
        this.position.left = 0
      } else {
        this.position.right = 0
      }
      if (InputRect.top <= PopupRect.height + 1 && dh - InputRect.bottom <= PopupRect.height + 1) {
        this.position.top = dh - InputRect.top - PopupRect.height - 1 + 'px'
      } else if (InputRect.top + InputRect.height / 2 <= dh / 2) {
        this.position.top = '100%'
      } else {
        this.position.bottom = '100%'
      }
    }
  },
  created () {
    this.initRanges()
  },
  directives: {
    clickoutside: {
      bind (el, binding, vnode) {
        el['@clickoutside'] = (e) => {
          if (!el.contains(e.target) && binding.expression && vnode.context[binding.expression]) {
            binding.value()
          }
        }
        document.addEventListener('click', el['@clickoutside'], true)
      },
      unbind (el) {
        document.removeEventListener('click', el['@clickoutside'], true)
      }
    }
  }
}
</script>


<style scoped>
.datepicker {
  position: relative;
  display: inline-block;
  color:#73879c;
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", sans-serif;
}

.datepicker * {
  box-sizing: border-box;
}


.datepicker-popup {
  position: absolute;
  width: 250px;
  margin-top: 1px;
  margin-bottom: 1px;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
  z-index: 1000;
}

.range {
  width: 750px;
}

.input {
  display: inline-block;
  width: 100%;
  height: 34px;
  padding: 6px 30px 6px 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
}

.input-icon {
  top: 0;
  right: 0;
  position: absolute;
  width: 30px;
  height: 100%;
  color: #888;
  text-align: center;
  font-style: normal;
}
.input-icon::after{
  content:'';
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
}
.input-icon__calendar{
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA00lEQVQ4T72SzQ2CQBCF54UGKIES6EAswQq0BS/A3PQ0hAt0oKVQgiVYAkcuZMwSMOyCyRKNe9uf+d6b2Qf6csGtL8sy7vu+Zebn/E5EoiAIwjRNH/PzBUBEGiJqmPniAMw+YeZkFSAiJwA3j45aVT0wsxGitwOjDGDnASBVvU4OLQARRURk9e4CAcSqWn8CLHp3Ae6MXAe/B4yzUeMkz/P9ZgdFUQzFIwD/B4yKgwMTos0OtvzCHcDRJ0gAzlmW1VYSq6oKu66LfQBTjC2AT+Hamxcml5IRpPq3VQAAAABJRU5ErkJggg==);
  background-position: center;
  background-repeat: no-repeat;
}
.input-icon__close::before {
  content: '\2716';
  vertical-align: middle;
}

.datepicker-left {
  margin: 0 12px;
  line-height: 34px;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
}

.datepicker-left>span {
  white-space: nowrap;
  cursor: pointer;
}

.datepicker-left>span:hover {
  color: #1284e7;
}

.datepicker-left>span:after {
  content: "|";
  margin: 0 10px;
  color: #48576a;
}
</style>
