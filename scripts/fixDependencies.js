// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { readFileSync, writeFileSync } = require('node:fs')

const data = readFileSync('./package.json', 'utf8')
const file = JSON.parse(data)

for (const dep in file.dependencies) {
  file.dependencies[dep] = file.dependencies[dep].replace(/[~^]/g, '')
}

for (const dep in file.devDependencies) {
  file.devDependencies[dep] = file.devDependencies[dep].replace(/[~^]/g, '')
}

writeFileSync('./package.json', JSON.stringify(file, null, 2) + '\n', 'utf8')
