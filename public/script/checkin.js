const tz = moment().utcOffset()

const checkIn = async() => {

    let res = await fetch("/checkin", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })

    let data = await res.json();

    console.log(data);






    document.getElementById("checkin").classList.toggle("btn-checkin1");
    document.getElementById("brakein").classList.toggle("btn-brakein1");
    document.getElementById("checkout").classList.toggle("btn-checkout1");

    document.getElementById("green").innerHTML += ` <div class="check-green">
    <span ><label>Checked In :</label>${moment(data.checkindate).utcOffset(tz).format("hh:mm:ss")}  </span>
</div>`


}

const brakeOut = async() => {


    let res = await fetch("/brakeout", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })

    let data = await res.json();



    // 


    document.getElementById("brakein").classList.toggle("btn-brakein1");
    document.getElementById("checkout").classList.toggle("btn-checkout1");
    document.getElementById("brakeout").classList.toggle("btn-brakeout1");


    document.getElementById("yellow").innerHTML += `  <div class="check-yellow">
    <span ><label >Break Out :</label> ${moment(data.breakoutdate).utcOffset(tz).format("hh:mm:ss")}</span>
</div>`

}



const brakeIn = async() => {

    let res = await fetch("/brakein", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })

    let data = await res.json();

    console.log(data);




    if (confirm("Do you really want to break in") == true) {
        document.getElementById("brakein").classList.toggle("btn-brakein1");
        document.getElementById("checkout").classList.toggle("btn-checkout1");
        document.getElementById("brakeout").classList.toggle("btn-brakeout1");
        document.getElementById("orange").innerHTML += `  <div class="check-orange">
        <span ><label > Break In :</label> ${moment(data.brakeindate).utcOffset(tz).format("hh:mm:ss") }</span>
    </div>`



    } else {
        return false
    }




}
const checkOut = async() => {

    let res = await fetch("/checkout", {
        method: "post",
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({

        })

    })
    let data = await res.json();
    // 
    
    if (confirm("Do you really want to checkout") == true) {
        document.getElementsByClassName("check-inout")[0].style.display = "none";
        document.getElementsByClassName("check-inout")[0].innerHTML = "none";

        document.getElementById("red").innerHTML += `  <div class="check-red">
        <span ><label > Check Out :</label>${moment(data.checkoutdata).utcOffset(tz).format("hh:mm:ss")}</span>
    </div>`
    } else {
        return false
    }
}
//



const handelPageLoad = () => {
    document.cookie = `tz=${tz}`;
    setInterval(() => {
        time = new Date();
        let t = time.toLocaleTimeString();

        document.getElementById("Time").innerHTML = t;

    }, 1000);

    const currentDate = moment().format("YYYY-MM-DD");
    console.log(currentDate);
    document.getElementById('date').innerText = currentDate

    let emp_id = document.getElementById("emp_id").value;

    fetch(`/dashbord/getBrakeInfo?emp_id=${emp_id}&date=${currentDate}`)
        .then(res => res.json())
        .then((data) => {
            for (x of data) {

                // console.log(x)
                if (x.brakein_time) {
                    document.getElementById("brakein").classList.toggle("btn-brakein1");
                    document.getElementById("checkout").classList.toggle("btn-checkout1");
                    document.getElementById("brakeout").classList.toggle("btn-brakeout1");

                    document.getElementById("orange").innerHTML += `  <div class="check-orange">
                    <span ><label > Break In :</label> ${moment(x.brakein_time).utcOffset(tz).format("hh:mm:ss")}</span>
                    </div>`;
                }
                
                if (x.brakeout_time) {
                    document.getElementById("brakein").classList.toggle("btn-brakein1");
                    document.getElementById("checkout").classList.toggle("btn-checkout1");
                    document.getElementById("brakeout").classList.toggle("btn-brakeout1");

                    document.getElementById("yellow").innerHTML += `  <div class="check-yellow">
                    <span ><label >Break Out :</label> ${moment(x.brakeout_time).utcOffset(tz).format("hh:mm:ss")}</span>
                    </div>`
                }


            }
        })

    fetch(`/dashbord/getCkeckInOutInfo?emp_id=${emp_id}&date=${currentDate}`)
        .then(res => res.json())
        .then((data) => {
<<<<<<< HEAD



=======
            
>>>>>>> 2bf6a464de941ab7e14c0c9bd035a563b138b6da
            if (data[0].checkin_time) {
                document.getElementById("green").innerHTML += ` <div class="check-green">
                        <span ><label>Checked In :</label>${moment(data[0].checkin_time).utcOffset(tz).format("hh:mm:ss")}  </span>
                        </div>`;
                document.getElementById("checkin").classList.toggle("btn-checkin1");
                document.getElementById("brakein").classList.toggle("btn-brakein1");
                document.getElementById("checkout").classList.toggle("btn-checkout1");

            }

            if (data[0].checkout_time) {

                document.getElementsByClassName("check-inout")[0].style.display = "none";
                document.getElementsByClassName("check-inout")[0].innerHTML = "none";

                document.getElementById("red").innerHTML += `  <div class="check-red">
                    <span ><label > Check Out :</label>${moment(data[0].checkout_time).utcOffset(tz).format("hh:mm:ss")}</span>
                    </div>`;
            }


        })



}

// for comment 
const addCommentBtn = document.getElementById('add-comment-btn');
let commentContainer = document.getElementById('comment-container')


async function addComment() {
    var comment = document.getElementById('comment').value;
    fetch(`/dashbord/get-comment?comment=${comment}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    }).then((res) => {}).then((res) => {
        console.log(res);
        var comment = document.getElementById('comment').value = "";

    });
    await updateCommentCard()
    // commentContainer.innerHTML += `<p>${comment}</p>`

    addCommentBtn.disabled = true
    addCommentBtn.style.opacity = 0.7

}


const updateCommentCard = async() => {
    commentContainer.innerHTML = ''
    await fetch(`/dashbord/updateCommentCard`)
        .then(res => res.json())
        .then(data => {
            data.forEach((singleComment) => {
                console.log(singleComment)
                commentContainer.innerHTML += `<p>${singleComment.comment}</p>`
            })
        })
}

let comment = document.getElementById('comment');
const validateComment = () => {
    console.log(comment.value)
    if (comment.value === "") {
        addCommentBtn.disabled = true
        addCommentBtn.style.backgroundColor = "var(--green-disable)"
    }
    if (comment.value != "") {
        addCommentBtn.disabled = false
        addCommentBtn.style.backgroundColor = "var(--green)"
    }
}