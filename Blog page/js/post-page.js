const url = 'http://localhost:3000';

getId = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    
    return id;
}

getIndividualPost = () => {
    fetch(`${url}/api/posts/${getId()}`).then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        buildPost(jsonResponse);
    });
};

buildPost = (individualData) => {
    let postDate = new Date(Number(individualData.added_date)).toDateString();

    let HTML = `
        <div>
            <a href="./index.html" class="navigator"> Back </a>
        </div>
        <div class="post-container">
            <div id="individual-title">
                <h2> ${individualData.title} </h2>
            </div>

            <div id="individual-time">
                <hr>
                <p> ${postDate} </p>
                <hr>
            </div>

            <div id="individual-content"> ${individualData.content} </div>
        </div>
        `;
    
    document.getElementById('header').style.backgroundImage = `url(http://localhost:3000/${individualData.post_image})`;
    document.querySelector('.individualPost').innerHTML = HTML;
}

window.onload = () => {
    getId();
    getIndividualPost();
}