// Libs
const fs = require('fs');
const ps = require('child_process');
const path = require('path');

// Globals
const pName = process.argv.splice(2,1)[0];

const CURRENT = process.cwd();

const message = fs.readFileSync(path.join(__dirname, 'console.txt')); // Message console
const index = fs.readFileSync(path.join(__dirname, 'template', 'index.js')); // index.js

console.log(Buffer.from(message).toString('utf8')+"\n\n");

// Creating files

const current_path = path.join(CURRENT, pName);
const packagePath = path.join(current_path, 'package.json');
const publicPath = path.join(current_path, 'public');
const viewsPath = path.join(current_path, 'views');
const routesPath = path.join(current_path, 'routes');
const databasePath = path.join(current_path, 'database');
const modelsPath = path.join(databasePath, 'models');

if(!fs.existsSync(current_path)){
    console.log('Wait, create and installing packages')
    fs.mkdirSync(current_path); // Create path
    process.chdir(current_path);
    if(fs.existsSync(current_path))
    {
        let process1 = ps.exec('npm init -y', {
            cwd:current_path
        }, (err, stdout, stderr)=>{
            if(err) console.log(err);
            console.log("Create package.json");
            let process2 = ps.exec('npm install express express-session express-handlebars cors morgan connect-flash method-override', {
                cwd:current_path
            }, (err, stdout, stderr)=>{
                if(err) console.log(err);
                console.log("Install express");
                let process3 = ps.exec('npm install -D nodemon', {
                    cwd:current_path
                },(err, stdout, stderr)=>{
                    if(err) console.log(err);
                    console.log("Install nodemon");
                    console.log('Success :D happy hacking!')
                    // Create index.js
                    fs.writeFileSync('index.js', index);
                    if(fs.existsSync(packagePath))
                    {
                        let package = JSON.parse(fs.readFileSync(packagePath).toString('utf-8'));
                        package.scripts = {"start":".", "dev":"nodemon ."};
                        package = JSON.stringify(package);
                        fs.writeFileSync(packagePath, package);
                        fs.mkdirSync(publicPath);
                        fs.mkdirSync(viewsPath);
                        fs.mkdirSync(routesPath);
                        fs.mkdirSync(databasePath);
                        fs.mkdirSync(modelsPath);
                    }
                });
        
                process3.on('exit', ()=>{
                    process3.kill('SIGINT');
                });
            }); // Install express and others
            process2.on('exit', ()=>{
                process2.kill('SIGINT');
            });
        });
        process1.on('exit', ()=>{
            process1.kill('SIGINT');
        });
    }
    else console.log("Error on create directory...");
}