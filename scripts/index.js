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

function addRecommendedReading() {
    const links = [
        '<a target="_blank" href="https://www.amazon.com/gp/product/1593279922/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1593279922&linkCode=as2&tag=jorgehuang-20&linkId=0e46fa35e55effccb72d6c0511f7229c">Automate the Boring Stuff with Python, 2nd Edition: Practical Programming for Total Beginners</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=jorgehuang-20&l=am2&o=1&a=1593279922" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />',
    ]

    links.forEach((link) => {
        const linkContentEl = document.querySelector(".reading .content ul");
        if (linkContentEl) {
            linkContentEl.innerHTML += `<li>${link}</li>`;
        }
    });
}

(function () {
    addArticles();
    addRecommendedReading();
})();