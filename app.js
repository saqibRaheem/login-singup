// const { default: axios } = require("axios");
// const { response } = require("express");

    // const loginPassward = document.getElementById("loginPassword").value;
function signUp() {
    const firstName = document.getElementById("firstname").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    axios.post('http://localhost:3000' + '/user', {

        firstName: firstName, lastName: lastName, email: email, password: password

    }).then((response) => {
        // if(response.status(403)){
        //     alert(response.message)
        // }
        alert(response.data.message);
        alert(request.error);
        console.log(response);
        document.getElementById("firstname").value = "";
        document.getElementById("lastname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

    })
        .catch((error) => {
            alert(error.response.data.message)
            console.log(error.response.data.message)
            // console.log(err);
            // if(res.status(403)){
            //     alert("noga ye wakal")
            //  if(error){
            //      alert("hah alrady axist")
            //      alert("ye error h " + error.message)
            //  console.log("yae error ha"+error)
            //  console.log()
            //  console.log(response.error.message)
            //  console.log(response.message)

            //  }else if(error){
            //      alert("invalid data")
            //  }else{
            //      alert("SignUp Faield")
            //      console.log('error', error);
            //  }

            // alert("Not Responding")
        }
            // return false)
            // signUp()
        )
}







function login() {
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassward = document.getElementById("loginPassword").value;
    console.log("yae login password ha ", loginEmail + loginPassward);
    axios.post('http://localhost:3000/login', {
        email: loginEmail, password: loginPassward
    }).then((response) => {
        if(response.status===201){

            document.getElementById("loginEmail").value = "";
            document.getElementById("loginPassword").value = "";
            console.log(response.data.message);
            console.log(response);
            alert(response.data.message);
            window.location.href = "home.html";
            window.localStorage.setItem("loginemail", loginEmail)
            window.localStorage.setItem("loginpassword", loginPassward)
            // getData()
            // console.log("getData",getData())
            
            
            
            
        }else{alert("try again")}
        }).catch((error) => {


            console.log(error)
            // console.log(error.response.message)
            alert(error.response.data.message)
            //  console.log(error)
            // if (error.response){
            //     alert("Login Success")
            // }else if(error.request){
            //     alert("InCorrect ")
            // }
            // console.log(error);
            //    alert("Try Again")
        })
    return false
}

function getData() {
    var email = window.localStorage.getItem("loginemail")
    var password = window.localStorage.getItem("loginpassword")

    // console.log(email)
    // console.log(password)
    axios.get('http://localhost:3000/home')
        .then((data) => {
            

            console.log(data)
                console.log(data.data)
                // console.log(data.data._id)
                // console.log(password)
                // console.log(loginPassward)

                for (var i = 0; i < data.data.length; i++){
                    if (data.data[i].email === email ) {
                    console.log(data.data[i]);
                    var homeData = `
                    <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col-6">
                    <div class="card">
                    <div class="card" style="width: 42rem;">
                    <div class="card-header">
                    <h3>Login ID</h3>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item" ><b>Name</b> : <i>${data.data[i].firstName} </i> </li>
                    <li class="list-group-item"><b>Email</b> : <i>${data.data[i].email} </i> </li>
                    
                    </ul>
                    </div>
                    </div>
                    </div>
                    <div class="col-6">
                    <div class=" class="card text-center" style="width: 20rem;">
                    <div class="card" style="width: 42rem;">
                    <div class="card-header">
                    <h3> LoGin Details</h3
                    </div>
                    <ul class="list-group list-group-flush" id="idd">
                    <li class="list-group-item" id="_id" ><b>ID</b> : <i>${data.data[i]._id} </i></li>
                    <li class="list-group-item" id="firstName_"><b>First Name </b>: <i>${data.data[i].firstName} </i></li>
                            <li class="list-group-item"><b>Laast Name</b> : <i>${data.data[i].lastName} </i></li>
                            <li class="list-group-item"><b>Email</b> : <i>${data.data[i].email} </i></li>
                            <li class="list-group-item" id="pass"><b>Password</b> : <i>${password} </i></li>
                            <button href="javascript:void(0)" onclick=upDate("${data.data[i].firstName}","${data.data[i]._id}")>Edit</button>
                            <button href="javascript:void(0)" onclick=deleteId("${data.data[i]._id}")>Delete</button>
                            </ul>
                            </div>
                            </div>
                            </div>
                            `
                            
                            document.getElementById("root").innerHTML = homeData;
                            
                            
                    // document.getElementById("root").innerText = data.data[1]
                    
            window.localStorage.setItem("loginemail", "")
            window.localStorage.setItem("loginpassword", "")
                    
                }
            }
            
          
        }).catch((err) => {
            console.log(err)
        })
    // .then((response)=>{
    // console.log(users.data);
    // console.log(response);
    // document.getElementById("root").innerHTML = " hello saqib"
    // users((data)=>{
    //         var homeData = `
    //         <h2>Login</h2>
    //         <tr id"${data._id} ">
    //         <td id="email">${data.email}</td>
    //         <td id="password">${data.password}</td>
    //         <br />
    //         <br />
    //         <h2>Login User Detail</h2>
    //         <td >${data._id} </td>
    //         <td id="firstName" >${data.firstName}</td>
    //         <td id="lastName">${data.lastName}</td>
    //         <td id="email">${data.email}</td>
    //         <td id="password">${data.password}</td>
    //         </tr>
    //         `
    //     document.getElementById("root").innerHTML=homeData;
    // })
    // })
    // .catch((error)=>{
    //     console.log(error.loginReq);
    // })

}


function upDate(firstName_,_id) {
console.log(_id);
console.log(firstName_);
    document.getElementById('firstName_').innerHTML=`
    <div id="${_id}">
    <input type="text" id="${_id}-change" value="${firstName_}" />
    <button href="javascript:void(0)" type="button" onclick="upTodate('${_id}','${_id}-change')" class="btn btn-success">Update</button>
    </div>
    
    `
    // document.getElementById("change").value
    console.log(firstName_);
 
    
}
            
function upTodate(_id ){
    console.log(_id);

    let  firstname = document.getElementById(`${_id}-change`).value;

    console.log(firstname);
    axios.put('http://localhost:3000/update/'+ _id, {
       firstName: firstname,
    })
        .then((response) => {
            alert("Update SuccessFully")
            console.log(response);
        })
        .catch((err) => {
            alert("Don't Ubdate")
            console.log("ye error h " , err);
        })
        
        getData();
}

function deleteId(_id){
 console.log("delete krne wali id" ,_id);
axios.delete('http://localhost:3000/delete/'+ _id)
.then((response)=>{
    console.log(response);
    alert(response.data)
    window.location.href = "index.html"
})
.catch((error)=>{
    console.log(error);
    alert(error.response.data)
})
}