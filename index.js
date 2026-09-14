const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const path = "./data.js";
const git = simpleGit();

const makeCommits = async (n) => {
    if (n === 0) {
        await git.push("origin", "main", {"--set-upstream": null});
        return;
    }

    const date = moment().subtract(n, "days").startOf("day").format();
    const data = { date };

    console.log(date);
    await new Promise((resolve, reject) => {
        jsonfile.writeFile(path, data, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });

    await git.add([path]).commit("Update data", {"--date": date});
    await makeCommits(n - 1);
};

makeCommits(365).catch(console.error);
