function addArticles() {
    const articles = [
        {
            "title": "Creating your first Express application in Node.js",
            "url": "https://medium.com/@jorgehuang88/creating-your-first-express-application-in-node-js-d92893329e82"
        },
        {
            "title": "3 Ways to handle routing in Expressjs",
            "url": "https://medium.com/@jorgehuang88/3-ways-to-handle-routing-in-expressjs-e8145f194243"
        },
        {
            "title": "Handling errors in Expressjs",
            "url": "https://medium.com/@jorgehuang88/handling-errors-in-expressjs-63b6b3db92f3"
        }
    ];

    articles.forEach((article) => {
        const articlesContentEl = document.querySelector(".articles .content ul");
        if (articlesContentEl) {
            articlesContentEl.innerHTML += `<li><a href="${article.url}">${article.title}</a></li`;
        }
    });
}

(function () {
    addArticles();
})();