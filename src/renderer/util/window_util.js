import Vue from 'vue'

/**
 * 窗口旁边，默认窗口左上角，若左边不够，则显示在右边
 */
export function followWin (_config) {
  let config = JSON.parse(JSON.stringify(_config))
  let winInfo = Vue.prototype.$Win.winInfo

  if (winInfo.x - (config.width || 800) < 0) {
    config.x = winInfo.width + winInfo.x
  } else {
    config.x = winInfo.x - (config.width || 800)
  }

  config.y = winInfo.y

  return config
}

/**
 * 窗口显示在屏幕右下角，并且窗口从右边往左边滑入
 */
export function bottomRightToleft (_config) {
  let config = JSON.parse(JSON.stringify(_config))
  let screenInfo = Vue.prototype.$Win.screenInfo

  config.x = screenInfo.workArea.width - (config.width || 800)
  config.y = screenInfo.workArea.height - (config.height || 600)

  config.windowConfig = config.windowConfig || {}
  config.windowConfig.animation = config.windowConfig.animation || {}
  config.windowConfig.animation.fromConfig = config.windowConfig.animation.fromConfig || {}

  config.windowConfig.animation.fromConfig.x = screenInfo.workArea.width
  config.windowConfig.animation.fromConfig.y = config.y

  config.windowConfig.time = 3000
  config.alwaysOnTop = true
  return config
}

/**
 * 窗口显示在屏幕右下角，并且窗口从下边往上边滑入
 */
export function bottomRightToup (_config) {
  let config = JSON.parse(JSON.stringify(_config))
  let screenInfo = Vue.prototype.$Win.screenInfo

  config.x = screenInfo.workArea.width - (config.width || 800)
  config.y = screenInfo.workArea.height - (config.height || 600)

  config.windowConfig = config.windowConfig || {}
  config.windowConfig.animation = config.windowConfig.animation || {}
  config.windowConfig.animation.fromConfig = config.windowConfig.animation.fromConfig || {}

  config.windowConfig.animation.fromConfig.x = config.x
  config.windowConfig.animation.fromConfig.y = screenInfo.workArea.height

  config.windowConfig.time = 3000
  config.alwaysOnTop = true
  return config
}
