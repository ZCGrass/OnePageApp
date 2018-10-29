const args = require('minimist')(process.argv.slice(2));

let env = 'dev';
const allowedEnv = ['dev', 'prod'];

if (args.env) {
    env = args.env;
}

function buildConfig(e) {
    const isValid = e && e.length > 0 && allowedEnv.indexOf(e) > -1;
    const validEnv = isValid ? e : 'dev';
    return require(`./conf/${validEnv}.js`);
}
module.exports = buildConfig(env);
