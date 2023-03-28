const renderOnline =  () =>{

    let row = document.getElementById('row');
    fetch(`/dashbord/onlineEmployeeData`)
    .then(res=>res.json())
    .then(onlinedata=>{
        let div =  document.createElement('div');
        let s = ""
        onlinedata.forEach(data=>{
        s += `<%- include('components/hoteline-user-card.ejs'{"first_name":${data.first_name},"last_name":${data.last_name},profile_photo:"dasda","email":"emails[i].email","status":"online" })%>`;
        })
        // div.appendChild(s)
        
    })
}
renderOnline()
