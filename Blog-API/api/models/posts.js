const fs = require('fs');
const PATH = "./data.json";

class Posts {

    get() {
        return this.readData();
    }

    getIndividualPost(postId) {
        const currentData = this.readData();
        const foundData = currentData.find(post => post.id === postId);
        return foundData;
    }

    addPost(newPost) {
        const currentData = this.readData();
        currentData.unshift(newPost);
        this.storeData(currentData);
    }

    readData() {
        let rawdata = fs.readFileSync(PATH);
        let postsData = JSON.parse(rawdata);

        return postsData;
    }

    storeData(rawData) {
        let data = JSON.stringify(rawData, null, 2);
        fs.writeFileSync(PATH, data);
    }
};

module.exports = Posts;