var usersLog = [];
const getAllEmployeesLogs = () => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let log_container = document.getElementById('log_container');

    let currentDate = `${year}-${(month > 9) ? (month) : ("0" + month)}-${(day > 9) ? (day) : ("0" + day)}`;

    fetch(`/dashbord/allEmployeesLog?date=${currentDate}`)
        .then(res => res.json())
        .then((data) => {
            let s = ""
            usersLog = data;
            //console.log(data)
            for (x of data) {


                if (x.checkin_time) {
                    s += `<div class="flex">
            <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
             <div class="today_logs check_in"><span>Check in</span> </div>
                <div class="time"><label>${x.checkin_time}</label> </div>
                </div>`

                    if (x.checkout_time) {
                        s += `<div class="flex">
                    <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
                     <div class="today_logs check_out"><span>Check Out</span> </div>
                        <div class="time"><label>${x.checkout_time}</label> </div>
                        </div>`
                    }
                }



                if (x.brakein_time) {
                    s += `<div class="flex">
            <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
             <div class="today_logs brake_in"><span>Brake in</span> </div>
                <div class="time"><label>${x.brakein_time}</label> </div>
                </div>`


                    if (x.brakeout_time) {
                        s += `<div class="flex">
            <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
              <div class="today_logs brake_out"><span>Brake Out</span> </div>
                <div class="time"><label>${x.brakeout_time}</label> </div>
                </div>`
                    }
                }



            }

            log_container.innerHTML = s;

        });
}

const handelUsersLogSearch = (value) => {

    let log_container = document.getElementById('log_container');
    let s = ""

    if (value == "") {
        getAllEmployeesLogs();
    }

    for (x of usersLog) {
        if (!x.first_name.search(value)) {
            if (x.checkin_time) {
                s += `<div class="flex">
        <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
         <div class="today_logs check_in"><span>Check in</span> </div>
            <div class="time"><label>${x.checkin_time}</label> </div>
            </div>`

                if (x.checkout_time) {
                    s += `<div class="flex">
                <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
                 <div class="today_logs check_out"><span>Check Out</span> </div>
                    <div class="time"><label>${x.checkout_time}</label> </div>
                    </div>`
                }
            }



            if (x.brakein_time) {
                s += `<div class="flex">
        <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
         <div class="today_logs brake_in"><span>Brake in</span> </div>
            <div class="time"><label>${x.brakein_time}</label> </div>
            </div>`


                if (x.brakeout_time) {
                    s += `<div class="flex">
        <div class="employee_name"><label>${x.first_name} ${x.last_name}</label> </div>
          <div class="today_logs brake_out"><span>Brake Out</span> </div>
            <div class="time"><label>${x.brakeout_time}</label> </div>
            </div>`
                }
            }

        }



    }
    log_container.innerHTML = s;

}

getAllEmployeesLogs();
setInterval(getAllEmployeesLogs, 300000);