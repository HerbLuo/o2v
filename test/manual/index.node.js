/* eslint-disable */
// 不要将此文件混合到 webpack的配置中，会导致 WebStorm的解析卡顿
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const runCmd = cmd => exec(cmd, (error, out, stdError) => {
  if (error !== undefined) {
    console.error(error)
  }
  if (out !== undefined) {
    console.log(out)
  }
  if (stdError !== undefined) {
    console.warn(stdError)
  }
})

const dir = fs.readdirSync('src/components')
fs.writeFileSync(path.resolve(__dirname, 'components.json'), JSON.stringify(dir))
console.log('components.json deployed')

runCmd('yarn dist:dev')

runCmd('yarn test:manual:webpack')
