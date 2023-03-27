const conn = require('../config/dbConnect');
const util =  require('util');
const query =  util.promisify(conn.query).bind(conn)

const getUserBasicinfo = async(id = "") => {

    if (id == "") {

        const data = await query(`SELECT * FROM basic_info `)
        return data;
    } else {

        const data = await query(`SELECT basic_info_id,first_name FROM basic_info where fk_emp_id = ${id};`)
        return data;
    }

}

const getUserProfilePhoto = async(fields = "*", id = "") => {

    if (id == "") {
        data = await query(`SELECT ${fields.toString()} FROM document;`)
        return data;
    } else {
        data = await query(`SELECT ${fields.toString()} FROM document where fk_emp_id=${id}`);
        return data;
    }
}

module.exports = {getUserBasicinfo , getUserProfilePhoto}