const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const path = "./data.js";
const date = moment().subtract(5, 'd').format();
const markCommit = (2, 3) => {
    const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();
    const data = {
        date: date,
    }
};

jsonfile.writeFile(path, data,()=>{
simpleGit().add([path]).commit(date, { "--date": date }).push();    
});

