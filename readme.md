# Overview

In this project I sought to better understand full-stack web development using a commonly used development stack, that being MERN.
At the time of making the project, I was already familiar with MongoDB, Express, and Node. However, react was new to me.

Using react on the client side and an MVC organization on the server side allowed me to develop this project in a much easier manner than I have done in the past. Problems were easy to resolve as I was easily able to identify where the issue was and what to do about it thanks to the organization provided by this stack and the MVC architecture.

There is much that I wanted to add to the site, including a working user dashboard and login, however I was unable to complete these functions on the client side in the time I had. These routes are likely the first thing I will add when I return to the project. Note however, that much of what is needed to accomplish this has already been done on the server side, although without a proper front end I have not yet been able to test it to ensure that it works. 

Video demonstration of the site and brief code walkthrough:

[Software Demo Video](https://drive.google.com/file/d/16_mV9eYSU0GlB8Mx4BloVD_Gp7jKx_NX/view?usp=drive_link)

# Web Pages

For the initial two weeks, I created 4 web pages. 3 of these pages retrieve data from the server via API calls which is demonstrated in the video. 

Other pages have been created or planned, but are not yet being used.

The first page is the home page, which calls the API to request data for all projects in the database, then display the 6 most recently added ones. (Determined by their projectId)

The second page is similar to the home page in its dynamic content, with the difference of being able to filter out the results by their title.

Lastly, the project page displays all the individual details of a project. The page makes an API call, which then sends back the requested data if found by the corresponding controller in the server.

# Development Environment

For my development environment, I chose VSCode.
For the mongo database, I chose to create it in a docker container, which simplified the database administration.

As mentioned previously, I used React on the front end.
On the backend, I used node, using bcrypt, cors, dotenv, jsonwebtoken, and of course, express as my chosen packages. I also used nodemon to allow me to restart the server everytime a file was changed.

# Useful Websites

{Make a list of websites that you found helpful in this project}
* [How to Create a Express/Node + React Project](https://www.youtube.com/watch?v=w3vs4a03y3I)
* [React Tutorial for Beginners](https://www.youtube.com/watch?v=SqcY0GlETPk&t=1292s)
* [AI] (ChatGPT.com)

# AI Use

I like to use AI as a personal tutor, asking it questions to allow me to learn and create my own implementations after seeing unrelated code examples. For example, I often asked ChatGPT, "I know I need X, but where does it go? How should I call it?" or, "My API call looks good and matches the route I set in the server, but why is my projectId still being set as undefined?"

(That second question was a bit difficult for me. It took my longer than I would like to admit to eventually find that I was using the wrong variable in the frontend router....)

# Future Work
My plans for the future with this project:
* Finish authentication and dashboard routes, allowing for adding, editing, and removal of projects for logged in users.
* Polish each page. Right now each page is very simple and not very pretty to look at.
* Upload actual project data rather than AI generated data.

