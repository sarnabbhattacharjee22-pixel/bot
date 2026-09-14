const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const path = "./data.js";
const git = simpleGit();
const githubEmail = "246118040+sarnabbhattacharjee22-pixel@users.noreply.github.com";

const makeCommits = async () => {
    await git.addConfig("user.email", githubEmail, false, "local");
    const startDate = moment("2025-01-01");
    const endDate = moment("2026-01-01");
    const commitsPerDay = 20;

    for (const date = startDate.clone(); date.isBefore(endDate); date.add(1, "day")) {
        for (let commitNumber = 1; commitNumber <= commitsPerDay; commitNumber += 1) {
            const commitDate = date.format();
            const data = { date: commitDate, commitNumber };

            console.log(`${commitDate} (${commitNumber}/${commitsPerDay})`);
            await new Promise((resolve, reject) => {
                jsonfile.writeFile(path, data, (error) => {
                    if (error) reject(error);
                    else resolve();
                });
            });

            await git.add([path]).commit("Update data", {"--date": commitDate});
        }
    }

    await git.push("origin", "main");
};

makeCommits().catch(console.error);
