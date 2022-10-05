1.API is created using node.js and sqlite as database.
2.Index js is the entry point.
3.database folder has files for connecting to database and ceating the table.
4. Table has the name "blog" with three columns- title,body,category.
4.Inside route folder there is a file "posts.js" which has all the endpoints.
    1.First route is - ("/createPost)
        for creating a blog post which can be accessed using url in the postman-
        POST: http://localhost:3000/api/createPost and in body send- {"title":"","body":"","category":""};
    
    2. second route is ("/getallposts)
        this will give you all the posts in the blog with pagination, specify page and limit of the page in url.
        GET: http://localhost:3000/api/getAllPosts?page=1&limit=5 here page=1 , 1st page and limit=5 means 5 results in a page.

    3. Third route is ("/getpost/:id")- GET
        It Returns an array of all the words in the post body starting letter a or A.
        GET: http://localhost:3000/api/getpost/7  where 7 is the ID of that particular post.

    4. Fourth route is ("/getPostid/:id")- PUT 
        It updates the post by Replacing the last 3 letters of all the words starting with letter a or A with * in the post body and modifies the database.
        PUT: http://localhost:3000/api/getpost/7  where 7 is the ID of that particular post.