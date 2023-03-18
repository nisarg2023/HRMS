const checkIn = () => {
    const date = new Date();
    let hours = date.getHours();
    let minuts = date.getMinutes();
    let second = date.getSeconds();

    let ampm;
    if (minuts < 10) {
        minuts = "0" + minuts
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    if (hours < 12) {
        ampm = "am"
    } else {
        ampm = "pm"
    }

    document.getElementById("checkin").classList.toggle("btn-checkin1");
    document.getElementById("brakein").classList.toggle("btn-brakein1");
    document.getElementById("checkout").classList.toggle("btn-checkout1");

    document.getElementById("green").innerHTML += ` <div class="check-green">
    <span class="attend-type check-label full check-in ng-star-inserted "><label>Checked In :</label>  ${hours}:${minuts} ${ampm}</span>
</div>`





}
const brakeOut = () => {
    const date = new Date();
    let hours = date.getHours();
    let minuts = date.getMinutes();
    let second = date.getSeconds();
    let ampm;
    if (minuts < 10) {
        minuts = "0" + minuts
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    if (hours < 12) {
        ampm = "am"
    } else {
        ampm = "pm"
    }
    document.getElementById("brakein").classList.toggle("btn-brakein1");
    document.getElementById("checkout").classList.toggle("btn-checkout1");
    document.getElementById("brakeout").classList.toggle("btn-brakeout1");


    document.getElementById("yellow").innerHTML += `  <div class="check-yellow">
    <span class="attend-type check-label full check-in ng-star-inserted "><label >Break Out :</label> ${hours}:${minuts} ${ampm}</span>
</div>`


}
const brakeIn = () => {
    const date = new Date();
    let hours = date.getHours();
    let minuts = date.getMinutes();
    let second = date.getSeconds();
    let ampm;
    if (minuts < 10) {
        minuts = "0" + minuts
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    if (hours < 12) {
        ampm = "am"
    } else {
        ampm = "pm"
    }
    if (confirm("Do you really want to break in") == true) {
        document.getElementById("brakein").classList.toggle("btn-brakein1");
        document.getElementById("checkout").classList.toggle("btn-checkout1");
        document.getElementById("brakeout").classList.toggle("btn-brakeout1");
        document.getElementById("orange").innerHTML += `  <div class="check-orange">
        <span class="attend-type check-label full check-in ng-star-inserted "><label > Break In :</label> ${hours}:${minuts} ${ampm}</span>
    </div>`

    } else {
        return false
    }




}
const checkOut = () => {

    const date = new Date();
    let hours = date.getHours();
    let minuts = date.getMinutes();
    let second = date.getSeconds();
    let ampm;
    if (minuts < 10) {
        minuts = "0" + minuts
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    if (hours < 12) {
        ampm = "am"
    } else {
        ampm = "pm"
    }
    if (confirm("Do you really want to checkout") == true) {
        document.getElementsByClassName("check-inout")[0].innerHTML = "thanks for your presence.";

        document.getElementById("red").innerHTML += `  <div class="check-red">
        <span class="attend-type check-label full check-in ng-star-inserted "><label > Check Out :</label>${hours}:${minuts} ${ampm}</span>
    </div>`
    } else {
        return false
    }
}

//

const loadDate = () => {

    let currentdate = document.getElementById("Date");
    let currenttime = document.getElementById("Time");
    const date = new Date();
    let hours = date.getHours();
    let minuts = date.getMinutes();
    let second = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (second < 10) {
        second = "0" + second
    }
    if (minuts < 10) {
        minuts = "0" + minuts
    }
    if (hours < 10) {
        hours = "0" + hours
    }
    if (month < 10) {
        month = "0" + month
    }
    if (day < 10) {
        day = "0" + day
    }
    currenttime.innerHTML = `${hours}:${minuts}:${second}`;
    currentdate.innerHTML = `${day}/${month}/${year}`;

}