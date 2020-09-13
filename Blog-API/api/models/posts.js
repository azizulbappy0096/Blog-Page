const fs = require('fs');
const PATH = "./data.json";

class Posts {

    get() {
        return this.readData();
    }

    getIndividualPost(postId) {
        const currentData = this.readData();
        let foundData;
        for(let data of currentData) {
            foundData = data.blogs.find(post => post.id === postId);
        };
        return foundData;
    }

    getAdminInfo() {
        const data = this.readData();
        const allAdmin = data.map(admin => ({
            "user_id": admin["user_id"],
            "name": admin["name"],
            "user_name": admin["user_name"],
            "password": admin["password"]
        }));

        return allAdmin;
    }

    getAdminPosts(adminId) {
        const currentData = this.readData();
        const foundData = currentData.find(admin => admin["user_id"] === adminId);
        return foundData;
    }

    addPost(adminId, newPost) {
        const currentData = this.readData();
        for(let admin of currentData) {
            if(admin["user_id"] === adminId) {
                admin["blogs"].unshift(newPost);
            }
        }
        this.storeData(currentData);
    }

    addAdmin(details) {
        const currentData = this.readData();
        currentData.unshift(details);
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