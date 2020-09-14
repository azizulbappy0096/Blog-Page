const url = "http://localhost:3000/";

getId = () => {
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const id = urlParams.get('admin_id');
    return id;
}


getAdminPosts = () => {
    
    fetch(`http://localhost:3000/api/posts/admin/${getId()}`).then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error("Request failed.");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        buildPost(jsonResponse); 
    })

};

buildPost = (data) => {
    let postsHTML = '';
    const allData = data["blogs"];

        allData.map(data => {
            
            if(data !== null) {    
                let postDate = new Date(Number(data.added_date)).toDateString();
                postsHTML += ` 
                <a href="./post-page.html?id=${data.id}&admin_id=${getId()}"  class="post-link row justify-content-center ">
                    <div class="row flex-nowrap justify-content-center blog-lists">
                    
                        <div class="blog-cover-img" style="background-image: url(${url}${data.post_image})"></div>
                        <div class="blog-content">
                            <div class="publish-time-name"> 
                                <p class="time"> ${postDate} </p>
                            </div>
                            <h5> ${data.title} </h5>
                            <div class="actual-writing"> ${data.content} </div>
                        </div>
                    
                    </div>
                </a>
               ` 
            };
        });

    document.querySelector('.blog-container').innerHTML = postsHTML;
    document.querySelector('.new-button').href = `create-blog-page.html?admin_id=${getId()}`;
    document.querySelector('.profile-image').style.backgroundImage = `url(${url}${data["profile_image"]})`;
    document.querySelector('.profile-name').innerHTML = `${data["name"]}`;
};

window.onload = () => {
    getAdminPosts();
}