const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    else {
        console.log('Connected to SQLite database.');
        db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')))",
        (err) => {
            if (err){
                //Table already created
                console.log('Looks like something went wrong! ', err)
            }
        });
    }
})

module.exports = db;