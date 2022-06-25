const config = require('../config.json');
exports.postServices = {

   async createPost(post){
        const response = await fetch(`${config.baseURL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {"post": post.post, "date": new Date()}
            )
        });

        const result = await response.json();
        return result.id; 
    },

    async delPost (id){
        const response = await fetch(`${config.baseURL}/posts/${id}`, {method: 'DELETE'});
        const result = await response.ok;
        if(result)
            return result;

    },

    async filterPost (fromDate, toDate){
        const filterPost = await fetch(`${config.baseURL}/posts/filter?fromDate=${fromDate}&toDate=${toDate}`);
        const result = await filterPost.json();
        return result;    
    }


};
