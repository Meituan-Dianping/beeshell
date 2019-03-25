const http = require('http');
const roo = require('../package.json');
const pkg = require('../../../../package.json');

const APP_KEY = 'roo_mobile_rn';

// 获取仓库地址
function getGitUrl() {
    if (pkg.repository && pkg.repository.url) {
        return pkg.repository.url;
    }
    return '';
}

// 获取项目名称
function getProjectName() {
    if (!pkg.name) {
        const gitUrl = getGitUrl();
        if (gitUrl) {
            return gitUrl.split('/').pop().replace('.git', '');
        }
        if (!gitUrl) {
            return process.cwd().split('/node_modules')[0].split('/').pop();
        }
    }
    return pkg.name;
}

// 获取业务react、react-dom版本
function getReactVersion() {
    if (pkg.dependencies) {
        return {
            React: pkg.dependencies.react || '',
            ReactDOM: pkg.dependencies['react-dom'] || ''
        };
    }
    return {
        React: '',
        ReactDOM: ''
    };
}

// 数据上报
function report() {
    try {
        const projectName = getProjectName();
        const gitUrl = getGitUrl();
        const data = JSON.stringify(getReactVersion());
        const params = `appKey=${APP_KEY}&projectName=${projectName}&gitUrl=${gitUrl}&version=${roo.version}&data=${data}`;

        http.get(`http://camel.waimai.dev.sankuai.com/camel/center/reportData?${params}`);
    } catch (e) {
        // error
    }
}

report();