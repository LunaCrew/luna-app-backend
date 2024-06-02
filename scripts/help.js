// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef

const BLUE = '\x1b[1;34m'
const YELLOW = '\x1b[1;33m'
const GREEN = '\x1b[1;32m'
const END = '\x1b[0m'

console.log(`${GREEN}-----------------------------------------------------------------------${END}`)
console.log(`${GREEN}                              NPM Scripts ${END}`)
console.log(`${GREEN}-----------------------------------------------------------------------${END}`)
console.log(' list of all available scripts in the project')
console.log(` To run a script: ${YELLOW}npm ${END}run ${BLUE}<script>${END}\n`)
console.log(`${YELLOW} WARNING:${END} Scripts in ${YELLOW}yellow${END} only run in a bash terminal${END}`)
console.log('-----------------------------------------------------------------------')
console.log(`${BLUE}                                General${END} \n`)
console.log(`${BLUE} help${END} - ${GREEN}list all available scripts${END}`)
console.log(`${BLUE} build${END} - ${GREEN}compile TypeScript files${END}`)
console.log(`${BLUE} lint${END} - ${GREEN}run ESLint and fix linting issues${END}`)
console.log(`${BLUE} prepare${END} - ${GREEN}install Husky hooks${END}`)
console.log('-----------------------------------------------------------------------')
console.log(`${BLUE}                              Application${END} \n`)
console.log(`${BLUE} dev${END} - ${GREEN}run dev application${END}`)
console.log(`${BLUE} start${END} - ${GREEN}run prod application${END}`)
console.log(`${BLUE} debug${END} - ${GREEN}run build and dev application${END}`)
console.log('-----------------------------------------------------------------------')
console.log(`${BLUE}                                Test${END} \n`)
console.log(`${BLUE} test${END} - ${GREEN}run unit tests with coverage${END}`)
console.log(`${BLUE} test${END}:unit - ${GREEN}run unit tests${END}`)
console.log(`${BLUE} test${END}:coverage - ${GREEN}run unit tests with coverage${END}`)
console.log('-----------------------------------------------------------------------')
console.log(`${BLUE}                           File Management ${END} \n`)
console.log(`${BLUE} dependencies${END}:fix - ${GREEN}remove ^ and ~ from package.json dependencies${END}`)
console.log(`${YELLOW} dependencies${END}:reset - ${GREEN}remove node_modules and package-lock.json then reinstall dependencies${END}`)
console.log(`${YELLOW} clear${END}:build - ${GREEN}remove all build files${END}`)
console.log(`${YELLOW} clear${END}:coverage - ${GREEN}remove all coverage files${END}`)
console.log(`${YELLOW} clear${END}:dependencies - ${GREEN}remove node_modules and package-lock.json${END}`)
console.log('=======================================================================')
