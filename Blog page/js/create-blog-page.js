getId = () => {
    const queryParams = window.location.search;
    const urlParams = new URLSearchParams(queryParams);
    const id = urlParams.get('admin_id');
    return id;
}

document.querySelector('.navigator').href = `index.html?admin_id=${getId()}`;

postData = () => {
    let title = document.querySelector("#post-title").value;
    let content = document.querySelector("#post-content").value;
    let post_image = document.querySelector("#post-image");

    let data = new FormData;
    data.append("title", title);
    data.append("content", content);
    data.append("post_image", post_image.files[0]);

    fetch(`http://localhost:3000/api/posts/${getId()}`, {
        method: "POST",
        body: data
    }).then((response) => {
        if(response.ok) {
            setTimeout(() => {
                window.location.href = `index.html?admin_id=${getId()}`;
            });
        }
    })
};

