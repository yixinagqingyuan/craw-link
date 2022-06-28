const grab = require('./main.js')
const program = require("commander");
const inquirer = require('inquirer');
const fs = require("fs");
const path = require("path");
module.exports = function create() {
    // 创建命令
    program.argument('<url>').action((homeUrl) => {
        inquirer.prompt([
            {
                name: "ok",
                type: "confirm",
                message: `是否输出文本 ?`,
            },
        ]).then(res => {
            if (res.ok) {
                grab(homeUrl, (arr) => {
                    fs.writeFile(path.join(process.cwd(), 'url.text'), arr.join('\n'), "utf-8", (err) => {
                        // 打印错误信息
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(`保存成功`);
                    });
                });
            } else {
                grab(homeUrl, (arr) => {
                    console.log(arr.join('\n'));
                });
            }
        })

    });

    program.parse(process.argv);
}


