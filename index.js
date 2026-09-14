const jsonfile = require("jsonfile");
const moment = require("moment");
const random = require("random");
const simpleGit = require("simple-git");
const path = "./data.js";
const git = simpleGit();

const markCommit = (weeks, days, remaining) => {
    const date = moment()
        .subtract(1, "y")
        .add(1, "d")
        .add(weeks, "w")
        .add(days, "d")
        .format();
    const data = { date };

    jsonfile.writeFile(path, data, (error) => {
        if (error) throw error;

        git.add([path]).commit(date, { "--date": date }, (commitError) => {
            if (commitError) throw commitError;
            makeCommits(remaining - 1);
        });
    });
};

const makeCommits = (remaining) => {
    if (remaining === 0) return git.push();

    markCommit(random.default.int(0, 54), random.default.int(0, 6), remaining);
};

makeCommits(100);