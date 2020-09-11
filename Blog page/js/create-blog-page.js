postData = () => {
    let title = document.querySelector("#post-title").value;
    let content = document.querySelector("#post-content").value;
    let post_image = document.querySelector("#post-image");

    let data = new FormData;
    data.append("title", title);
    data.append("content", content);
    data.append("post_image", post_image.files[0]);

    fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: data
    }).then(() => {
        setTimeout(() => {
            window.location.href = "index.html";
        })
    })
};

