getName = () => {
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const name = urlParams.get('name');
    return name;
};

displaySign = () => {
    const name = getName();
    if(name === "sign_in") {
        document.getElementById("sign-in").classList.remove("d-none");
        document.getElementById("sign-up").classList.add("d-none");
    }else {
        document.getElementById("sign-in").classList.add("d-none");
        document.getElementById("sign-up").classList.remove("d-none");
    }
}

getAdmin = () => {
    const userName = document.getElementById('userName').value;
    const userPassword = document.getElementById("userPassword").value;

    fetch("http://localhost:3000/api/admin").then(response => {
        if(response.ok) {
            return response.json();
        }

        throw new Error("Request failed.");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        jsonResponse.map(data => {
            if((data["user_name"] === userName) && (data["password"] === userPassword)) {
                document.getElementById('button').href = `index.html?admin_id=${data["user_id"]}`;
            }
        })
    })
};

createAdmin = () => {
    const name = document.getElementById("name").value;
    const userName = document.getElementById("username").value;
    const userPassword = document.getElementById("user-password").value;
    const userProfilePhoto = document.getElementById("profile-photo");

    let adminData = new FormData();

    adminData.append("name", name);
    adminData.append("user_name", userName);
    adminData.append("password", userPassword);
    adminData.append("profile_image", userProfilePhoto.files[0]);
    
    if(name && userPassword && userName && userProfilePhoto.value) {
        fetch(`http://localhost:3000/api/admin`, {
            method: "POST",
            body: adminData
        }).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then(jsonResponse => {
            setTimeout(() => {
                window.location.href = `index.html?admin_id=${jsonResponse}`;
            });
        }) 
    }else {
        alert("Please fill up all the fields including Profile picture")
    }
};



window.onload = () => {
    displaySign();
}







