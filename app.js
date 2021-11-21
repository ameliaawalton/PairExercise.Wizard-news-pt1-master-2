const express = require('express');
const morgan = require('morgan');
const postBank = require("./postBank");
const timeAgo = require('node-time-ago');
const html = require("html-template-tag");
const app = express();

app.use(morgan('dev'));

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

app.get("/", (req, res) => {
  const posts = postBank.list();

  const pagehtml = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => html`
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${timeAgo(post.date)}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`

res.send(pagehtml);

});

app.use(express.static(__dirname + "/public"));

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  
  if (!post.id) {
    
    res.status(404)
    
    const pagehtml = html`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p> 🧙‍♀️ ... Page Not Found</p>
        <img src="/GANDALF.jpg" />
      </div>
    </body>
    </html>`
    res.send(pagehtml)
  } else 
  res.send(html`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
          <p>${post.title}. <small>(by ${post.name})</small></p>
          <p>${post.content}
          </p>
      </div>
    </div>
  </body>
</html>`);
});







