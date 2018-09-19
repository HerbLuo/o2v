/* eslint-disable */
// 不要将此文件混合到 webpack的配置中，会导致 WebStorm的解析卡顿
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const runCmd = cmd => {
  const workerProcess = exec(cmd, {})
  workerProcess.stdout.on('data', console.log)
  workerProcess.stderr.on('data', console.error)
}

const dir = fs.readdirSync('src/components')
fs.writeFileSync(path.resolve(__dirname, 'components.json'), JSON.stringify(dir))
console.log('components.json deployed')

runCmd('yarn dist:dev')

runCmd('yarn test:manual:webpack')
