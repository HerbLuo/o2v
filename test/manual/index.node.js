// 不要将此文件混合到 webpack的配置中，会导致 WebStorm的解析卡顿
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const dir = fs.readdirSync('src/components')
fs.writeFileSync(path.resolve(__dirname, 'components.json'), JSON.stringify(dir))
console.log('components.json deployed')

exec('yarn dist:dev', (...args) => args.forEach(a => a && console.log(a)))

exec('yarn test:manual:webpack', (...args) => args.forEach(a => a && console.log(a)))
