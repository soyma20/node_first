const fs = require('fs')

fs.readdir('./users', (err, files) => {
    if (err) {
        console.log(err)
        return;
    }
    for (const file of files) {
        fs.readdir(`./users/${file}`, (err1, files1) => {
            if (err1) {
                console.log(err1)
                return;
            }
            for (const file1 of files1) {
                fs.readFile(`./users/${file}/${file1}`,
                    (err2, data) => {
                        if (err2) {
                            console.log(err2)
                            return;
                        }
                        const user = JSON.parse(data.toString());
                        if (user.gender === "female" && file.toString() === "boys") {
                            fs.writeFile(`./users/girls/${file1.toString()}`, JSON.stringify(user), (err3) => {
                                err3 && console.log(err3);
                            })
                            fs.unlink(`./users/boys/${file1}`, (err4) => {
                                err4 && console.log(err4);
                            })
                        }
                        if (user.gender === "male" && file.toString() === "girls"){
                            fs.writeFile(`./users/boys/${file1}`, JSON.stringify(user), (err3) => {
                                err3 && console.log(err3);
                            })
                            fs.unlink(`./users/girls/${file1}`, (err4) => {
                                err4 && console.log(err4);
                            })
                        }
                    })
            }
        })

    }

})

module.exports = {
    fs
}