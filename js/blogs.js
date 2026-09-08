/* =========================================================
   BLOG PAGE
========================================================= */


/* PRELOADER */

const preloader = document.getElementById("preloader");

const loaderPercentage =
    document.getElementById("loader-percentage");

const loaderProgress =
    document.getElementById("loader-progress");

let progress = 0;

const loaderInterval = setInterval(() => {

    progress++;

    loaderPercentage.textContent = `${progress}%`;

    loaderProgress.style.width = `${progress}%`;

    if (progress >= 100) {

        clearInterval(loaderInterval);

        setTimeout(() => {

            preloader.classList.add("loaded");

        }, 400);

    }

}, 15);



/* CUSTOM CURSOR */

const cursor = document.getElementById("cursor");

if (cursor) {

    document.addEventListener("mousemove", (event) => {

        cursor.style.left = `${event.clientX}px`;

        cursor.style.top = `${event.clientY}px`;

    });


    const interactiveElements =
        document.querySelectorAll("a, button");

    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            cursor.classList.add("cursor-hover");

        });

        element.addEventListener("mouseleave", () => {

            cursor.classList.remove("cursor-hover");

        });

    });

}



/* NAVBAR SCROLL */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* MOBILE MENU */

const menuToggle =
    document.getElementById("menu-toggle");

const mobileMenu =
    document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}
/* =========================================================
   BLOG FILTER SYSTEM
========================================================= */

const articlesGrid =
    document.getElementById("articles-grid");

const searchInput =
    document.getElementById("blog-search");

const clearSearch =
    document.getElementById("clear-search");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const articleCount =
    document.getElementById("article-count");

const noResults =
    document.getElementById("no-results");


let selectedCategory = "all";


/* =========================================================
   RENDER ARTICLES
========================================================= */

function renderArticles() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredArticles =
        articles.filter((article) => {

            const matchesCategory =
                selectedCategory === "all" ||
                article.category === selectedCategory;


            const matchesSearch =
                article.title
                    .toLowerCase()
                    .includes(searchValue) ||

                article.description
                    .toLowerCase()
                    .includes(searchValue) ||

                article.categoryName
                    .toLowerCase()
                    .includes(searchValue);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    /* Clear grid */

    articlesGrid.innerHTML = "";


    /* No results */

    if (filteredArticles.length === 0) {

        noResults.classList.add("show");

        articleCount.textContent =
            "No articles found";

        return;

    }


    noResults.classList.remove("show");


    /* Count */

    articleCount.textContent =
        `Showing ${filteredArticles.length} article${filteredArticles.length !== 1
            ? "s"
            : ""
        }`;


    /* Create cards */

    filteredArticles.forEach(
        (article, index) => {

            const card =
                document.createElement("article");

            card.className =
                "article-card";


            card.innerHTML = `

                <div class="article-image">

                    <img
                        src="${article.image}"
                        alt="${article.title}"
                        loading="lazy"
                    >

                    <span class="article-category">
                        ${article.categoryName}
                    </span>

                </div>


                <div class="article-content">

                    <div class="article-meta">

                        <span>
                            ${article.categoryName}
                        </span>

                        <span
                            class="article-meta-dot"
                        ></span>

                        <span>
                            ${article.readTime}
                        </span>

                    </div>


                    <h3>
                        ${article.title}
                    </h3>


                    <p>
                        ${article.description}
                    </p>


                    <div class="article-footer">

                        <a
                            href="${article.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="article-read"
                        >
                            Read Article
                            <span>↗</span>
                        </a>

                        <span class="article-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                    </div>

                </div>

            `;


            articlesGrid.appendChild(card);

        }
    );

}


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

categoryButtons.forEach((button) => {

    button.addEventListener("click", () => {

        categoryButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        selectedCategory =
            button.dataset.category;


        renderArticles();

    });

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        if (searchInput.value.trim()) {

            clearSearch.classList.add(
                "visible"
            );

        } else {

            clearSearch.classList.remove(
                "visible"
            );

        }


        renderArticles();

    }
);


/* =========================================================
   CLEAR SEARCH
========================================================= */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        clearSearch.classList.remove(
            "visible"
        );

        renderArticles();

        searchInput.focus();

    }
);


/* =========================================================
   INITIAL RENDER
========================================================= */
/* =========================================================
   INITIAL RENDER
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        renderArticles
    );

} else {

    renderArticles();

}
/* ================================
   POPULAR TOPICS
================================ */

const topicCards = document.querySelectorAll(".topic-card");

topicCards.forEach((card) => {
    card.addEventListener("click", () => {
        const topic = card.dataset.topic;

        const matchingCategory = document.querySelector(
            `.category-btn[data-category="${topic}"]`
        );

        if (matchingCategory) {
            matchingCategory.click();

            document.getElementById("latest-articles").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});