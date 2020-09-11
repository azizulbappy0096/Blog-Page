const url = 'http://localhost:3000';

window.onload = () => {
    getData();
}

getData = () => {
    fetch(`${url}/api/posts/`).then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        buildPost(jsonResponse);
    });
};

buildPost = (data) => {
    let postsHTML = '';

    data.map(data => {
        let postDate = new Date(Number(data.added_date)).toDateString();

        postsHTML += `
        
        <a href="./post-page.html?id=${data.id}" class="post-link row justify-content-center ">
            <div class="row flex-nowrap justify-content-center blog-lists">
            
                <div class="blog-cover-img" style="background-image: url(${url}/${data.post_image})"></div>
                <div class="blog-content">
                    <div class="publish-time"> ${postDate} </div>
                    <h5> ${data.title} </h5>
                    <div class="actual-writing"> ${data.content} </div>
                </div>
             
            </div>
        </a>
        `
    });

    document.querySelector('.blog-container').innerHTML = postsHTML;
};



