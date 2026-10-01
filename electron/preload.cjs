const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('zcodeDesktop', {
  platform: process.platform,
  isDesktop: true,
})
