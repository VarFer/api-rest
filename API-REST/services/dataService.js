const db = require('../config').db;

const getAllRecords = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM records', (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const insertRecord = (content) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO records (content) VALUES (?)', [content], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

const updateRecord = (id, content) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE records SET content = ? WHERE id = ?',
            [content, id],
            (err, results) => {
                if (err) reject(err);
                resolve(results);
            }
        );
    });
};

const deleteRecord = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM records WHERE id = ?', [id], (err, results) => {
            if (err) reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    getAllRecords,
    insertRecord,
    updateRecord,
    deleteRecord
};
