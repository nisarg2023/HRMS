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
    <span ><label>Checked In :</label>${data.checkindate}  </span>
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
    <span ><label >Break Out :</label> ${data.brakeoutdate}</span>
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
        <span ><label > Break In :</label> ${data.brakeindata}</span>
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
        <span ><label > Check Out :</label>${data.checkoutdata}</span>
    </div>`
    } else {
        return false
    }
}

//



const handelPageLoad = () => {
    setInterval(() => {
        time = new Date();
        let t = time.toLocaleTimeString();

        document.getElementById("Time").innerHTML = t;

    }, 1000);

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    let currentDate = `${year}-${(month > 9) ? (month) : ("0" + month)}-${(day > 9) ? (day) : ("0" + day)}`;

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
                    <span ><label > Break In :</label> ${x.brakein_time}</span>
                    </div>`;
                }

                if (x.brakeout_time) {
                    document.getElementById("brakein").classList.toggle("btn-brakein1");
                    document.getElementById("checkout").classList.toggle("btn-checkout1");
                    document.getElementById("brakeout").classList.toggle("btn-brakeout1");

                    document.getElementById("yellow").innerHTML += `  <div class="check-yellow">
                    <span ><label >Break Out :</label> ${x.brakeout_time}</span>
                    </div>`
                }


            }
        })

    fetch(`/dashbord/getCkeckInOutInfo?emp_id=${emp_id}&date=${currentDate}`)
        .then(res => res.json())
        .then((data) => {



            if (data[0].checkin_time) {
                document.getElementById("green").innerHTML += ` <div class="check-green">
                        <span ><label>Checked In :</label>${data[0].checkin_time}  </span>
                        </div>`;
                document.getElementById("checkin").classList.toggle("btn-checkin1");
                document.getElementById("brakein").classList.toggle("btn-brakein1");
                document.getElementById("checkout").classList.toggle("btn-checkout1");

            }

            if (data[0].checkout_time) {

                document.getElementsByClassName("check-inout")[0].style.display = "none";
                document.getElementsByClassName("check-inout")[0].innerHTML = "none";

                document.getElementById("red").innerHTML += `  <div class="check-red">
                    <span ><label > Check Out :</label>${data[0].checkout_time}</span>
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