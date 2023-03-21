const getDashboard = (req, res) => {
    res.render('dashboard')
        //res.send("hello");

}

const getHotlines = (req, res) => {
    res.render('hotline');
}

const getAttendance = (req, res) => {
    res.render('attendance');
}

module.exports = { getDashboard, getHotlines, getAttendance }