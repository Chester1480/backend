const fse = require('fs-extra');
// url : https://www.npmjs.com/package/fs-extra

exports.copy = async (fromPath, targetPath) => {
    try {
        await fs.copy(fromPath, targetPath);
    } catch (err) {
        console.error(err);
    }
}