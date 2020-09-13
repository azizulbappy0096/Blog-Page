const url = 'http://localhost:3000';

window.onload = () => {
    getData();
};

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
        data.blogs.map(alldata => {
            if(alldata !== null) {
            let postDate = new Date(Number(alldata.added_date)).toDateString();

            postsHTML += `
            <a href="./post-page.html?id=${alldata.id}" class="post-link row justify-content-center ">
                <div class="row flex-nowrap justify-content-center blog-lists">
                
                    <div class="blog-cover-img" style="background-image: url(${url}/${alldata.post_image})"></div>
                    <div class="blog-content">
                        <div class="publish-time-name"> 
                            <p class="time"> ${postDate} </p>
                            <p class="name"> ~${data.name} </p> 
                        </div>
                        <h5> ${alldata.title} </h5>
                        <div class="actual-writing"> ${alldata.content} </div>
                    </div>
                    
                </div>
            </a>
            `;
            
            };
        })
        
    });

    document.querySelector('.blog-container').innerHTML = postsHTML;
};









