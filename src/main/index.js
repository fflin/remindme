'use strict'

// eslint-disable-next-line standard/object-curly-even-spacing
import {app, BrowserWindow, Tray, Menu, ipcMain } from 'electron'

const path = require('path')
const envPath = require('../config/environment')

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray
let v

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    useContentSize: true,
    autoHideMenuBar: true
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 获取窗口关闭事件
  mainWindow.on('close', function (e) {
    if (!app.isQuiting) {
      e.preventDefault()
      mainWindow.hide()
      tray.displayBalloon({
        title: '方便签',
        content: '程序已最小化到系统托盘！',
        icon: path.join(envPath.staticPath, 'static/icons/icon.png')
      })
      return false
    }
  })
  // 设置系统托盘
  // tray = new Tray(path.join(envPath.staticPath, 'static/icons/icon.png'))
  // const Tray = electron.Tray
  var trayIcon = path.join(__dirname, 'icons')
  tray = new Tray(path.join(trayIcon, 'icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开窗口',
      type: 'normal',
      click: () => {
        console.log('11--' + mainWindow.webContents.id)
        mainWindow.show()
      }
    },
    {
      label: '退出程序',
      type: 'normal',
      click: () => {
        app.isQuiting = true
        app.quit()
      }
    }
  ])
  tray.setToolTip('方便签')
  tray.setContextMenu(contextMenu)
  tray.on('double-click', function () {
    if (v != null) {
      clearInterval(v)
    }
    mainWindow.show()
  })

  tray.setContextMenu(contextMenu)

  var count = 0

  // 创建提醒窗口
  function showNotice () {
    console.log('!!!!!!!!!!!!!!!!!!!!!111')
    // var noticeWin = new BrowserWindow({
    //   width: 0,
    //   height: 0,
    //   parent: mainWindow, // win是主窗口
    //   frame: false,
    //   webPreferences: {
    //     nodeIntegration: true
    //   }
    // })
    // // noticeWin.loadURL(notice)
    // noticeWin.loadURL('https://bilibili.com/')
    // // noticeWin.loadFile('../renderer/components/notice/notice.vue')
    // noticeWin.on('closed', () => { noticeWin = null })
    v = setInterval(function () {
      console.log('!!!!!!!!!!!!!!!!!!!!!')
      // appIcon.path = path.join(__dirname, 'lufi.ico')
      if (count++ % 2 === 0) {
        tray.setImage(path.join(trayIcon, 'icon.png'))
      } else {
        tray.setImage(path.join(trayIcon, 'icon_trans.png'))
        // appIcon.setImage(path.join(__dirname, 'static/icons/icon_trans.png'))
      }
    }, 400)
  }
  // https://blog.csdn.net/yu17310133443/article/details/79540398
  // ipcMain.on('startShark', setInterval(function () {
  //   console.log('!!!!!!!!!!!!!!!!!!!!!')
  //   if (count++ % 2 === 0) {
  //     appIcon.setImage(path.join(__dirname, '../static/icons/icon.png'))
  //   } else {
  //     appIcon.setImage(path.join(__dirname, '../static/icons/icon_trans.png'))
  //   }
  // }, 400))
  ipcMain.on('showNotice', showNotice)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
