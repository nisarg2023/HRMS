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



const loadDate = () => {
    setInterval(() => {
        time = new Date();
        let t = time.toLocaleTimeString();

        document.getElementById("Time").innerHTML = t;

    }, 1000);

}