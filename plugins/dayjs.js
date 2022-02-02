import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, fromat = 'YYY-MM-DD') => {
  return dayjs(value).fromat(fromat)
})
