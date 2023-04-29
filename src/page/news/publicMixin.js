import { formatDate } from '@/utils/util'

export default {
  data() {
    return {
      newsTypeList: [],
      rightNewsLoading: false
    }
  },
  methods: {
    // 获取资讯类型
    getNewsTypeList() {
      return new Promise(async (resolve, reject) => {
        const response = await this.$http(this.ApiSetting.vkNews.newsType)
        console.info("初始化资讯类型：", response)
        if (response.status === 1 && response.data) {
          this.newsTypeList = response.data
          resolve()
        } else {
          reject()
        }
      })
    },

    /**
     * 获取右侧固定推荐资讯
     * @param isReset
     * @return {Promise<void>}
     */
    async getRightNewsList() {
      if (this.rightNewsLoading) return
      this.rightNewsLoading = true
      const params1 = {
        category: this.nextTwoNewType[0].id,
        page: 1,
        page_size: 4
      }

      const params2 = {
        category: this.nextTwoNewType[1].id,
        page: 1,
        page_size: 4
      }

      console.info(`获取右侧资讯列表1入参：`, params1)
      console.info(`获取右侧资讯列表2入参：`, params2)

      const res1 = await this.$http(this.ApiSetting.vkNews.newsList, params1)
      const res2 = await this.$http(this.ApiSetting.vkNews.newsList, params2)

      console.info(`获取右侧资讯列表1：`, res1)
      console.info("获取右侧资讯列表2：", res2)

      if (res1.status === 1 && res1.data) {
        const { list } = res1.data
        this.rightNewsDataList.push(list)
      }

      if (res2.status === 1 && res2.data) {
        const { list } = res2.data
        this.rightNewsDataList.push(list)
      }
      this.rightNewsLoading = false
    },

    /**
     * 时间轴计算
     * @param timestamp
     * @return {string}
     */
    dateTimeFormatByNews(timestamp) {
      if (typeof timestamp === 'undefined') return ''
      const numTimestamp = +timestamp
      const remainTimestamp = Date.now() - numTimestamp
      const currentDate = new Date()
      let backForMat = ''
      // 当天凌晨0点
      const today = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()} 00:00:00`).getTime()

      const timeMap = new Map()
      // 1年前
      timeMap.set(() => { return remainTimestamp > 1000 * 60 * 60 * 24 * 7 && new Date(numTimestamp).getFullYear() < currentDate.getFullYear() }, () => formatDate(numTimestamp, 'yyyy年MM月dd日'))
      // 1天内
      timeMap.set(() => { return remainTimestamp < 1000 * 60 * 60 * 24 && currentDate.getDate() === new Date(numTimestamp).getDate() }, () => `${remainTimestamp / (1000 * 60 * 60) | 0}小时前`)
      // 1小时内
      timeMap.set(() => { return remainTimestamp < 1000 * 60 * 60 }, () => `${remainTimestamp / (1000 * 60) | 0}分钟前`)
      // 1分钟内
      timeMap.set(() => { return remainTimestamp < 1000 * 60 }, () => '刚刚')
      // 昨天
      timeMap.set(() => {
        return numTimestamp > today - 1000 * 60 * 60 * 24 && numTimestamp < today
      }, () => {
        const hours = new Date(numTimestamp).getHours()
        const minutes = new Date(numTimestamp).getMinutes()
        return `昨天${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
      })
      // 前天
      timeMap.set(() => {
        return numTimestamp > today - 1000 * 60 * 60 * 24 * 2 && numTimestamp < today - 1000 * 60 * 60 * 24
      }, () => {
        const hours = new Date(numTimestamp).getHours()
        const minutes = new Date(numTimestamp).getMinutes()
        return `前天${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`
      })
      // 7天内
      timeMap.set(() => {
        return numTimestamp > today - 1000 * 60 * 60 * 24 * 7 && numTimestamp < today - 1000 * 60 * 60 * 24 * 2
      }, () => {
        return `${remainTimestamp / (1000 * 60 * 60 * 24) | 0}天前`
      })
      // 超过7天
      timeMap.set(() => {
        return remainTimestamp >= 1000 * 60 * 60 * 24 * 7 && new Date(numTimestamp).getFullYear() === currentDate.getFullYear()
      }, () => {
        const month = new Date(numTimestamp).getMonth() + 1
        const day = new Date(numTimestamp).getDate()
        return `${month < 10 ? `0${month}` : month}月${day < 10 ? `0${day}` : day}日`
      })

      for (const [key, value] of timeMap) {
        key() && (backForMat = value())
      }

      return backForMat
    }
  }
}
