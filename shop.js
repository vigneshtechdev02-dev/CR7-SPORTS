// Seleting navbar Section
var menu = document.getElementById("menubtn")
var canclebar = document.getElementById("xcancle")

menu.addEventListener("click", function () {
    var sidebar = document.getElementById("Sidenavbarbutton")
    sidebar.style.left = "0"
})

canclebar.addEventListener("click", function () {
    var sidebar = document.getElementById("Sidenavbarbutton")
    sidebar.style.left = "-70%"
})



// HEREO SLIDER
const slides = document.querySelectorAll(".slide");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentSlide = 0;
let autoSlide;


/* =========================
   SHOW SLIDE
========================= */

function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");
}


/* =========================
   NEXT SLIDE
========================= */

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

    resetAutoSlide();
}


/* =========================
   PREVIOUS SLIDE
========================= */

function previousSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

    resetAutoSlide();
}


/* =========================
   BUTTON EVENTS
========================= */

nextBtn.addEventListener("click", nextSlide);

prevBtn.addEventListener("click", previousSlide);


/* =========================
   AUTO SLIDER
========================= */

function startAutoSlide() {

    autoSlide = setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }, 5000);
}


/* =========================
   RESET AUTO SLIDER
========================= */

function resetAutoSlide() {

    clearInterval(autoSlide);

    startAutoSlide();
}


/* START */

showSlide(currentSlide);

startAutoSlide();

/* =========================
   PRODUCT FUNCTION
========================= */

/* =========================================
   PRODUCT FILTER + SEARCH SYSTEM
========================================= */

const products = document.querySelectorAll(".product-card");

const searchInput = document.getElementById("searchInput");

const checkboxes = document.querySelectorAll(
    '.check-row input[type="checkbox"]'
);

const productCount = document.getElementById("productCount");

const noResults = document.getElementById("noResults");

const clearFilters = document.getElementById("clearFilters");

const clearSearch = document.getElementById("clearSearch");

const activeFilters = document.getElementById("activeFilters");

const resetNoResults = document.getElementById("resetNoResults");


/* =========================================
   SIDEBAR
========================================= */

const sidebar = document.getElementById("sidebar");

const sidebarOverlay = document.getElementById("sidebarOverlay");

const mobileFilterBtn =
    document.getElementById("mobileFilterBtn");

const mobileFilterBottom =
    document.getElementById("mobileFilterBottom");

const closeSidebar =
    document.getElementById("closeSidebar");


function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeFilterSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";
}


mobileFilterBtn.addEventListener(
    "click",
    openSidebar
);


mobileFilterBottom.addEventListener(
    "click",
    openSidebar
);


closeSidebar.addEventListener(
    "click",
    closeFilterSidebar
);


sidebarOverlay.addEventListener(
    "click",
    closeFilterSidebar
);


/* =========================================
   GET SELECTED FILTERS
========================================= */

function getSelectedFilters() {

    const selected = {

        occasion: [],

        color: [],

        arrival: []

    };


    checkboxes.forEach((checkbox) => {

        if (checkbox.checked) {

            const type = checkbox.dataset.filter;

            selected[type].push(
                checkbox.value
            );

        }

    });


    return selected;
}


/* =========================================
   CHECK PRODUCT
========================================= */

function productMatchesFilters(
    product,
    filters
) {

    const productOccasion =
        product.dataset.occasion;

    const productColor =
        product.dataset.color;

    const productArrival =
        product.dataset.arrival;


    /* OCCASION */

    if (
        filters.occasion.length > 0 &&
        !filters.occasion.includes(productOccasion)
    ) {

        return false;

    }


    /* COLOR */

    if (
        filters.color.length > 0 &&
        !filters.color.includes(productColor)
    ) {

        return false;

    }


    /* ARRIVAL */

    if (
        filters.arrival.length > 0 &&
        !filters.arrival.includes(productArrival)
    ) {

        return false;

    }


    return true;
}


/* =========================================
   SEARCH
========================================= */

function productMatchesSearch(
    product,
    searchValue
) {

    const productName =
        product.dataset.name.toLowerCase();

    return productName.includes(
        searchValue.toLowerCase()
    );
}


/* =========================================
   FILTER PRODUCTS
========================================= */

function filterProducts() {

    const filters =
        getSelectedFilters();


    const searchValue =
        searchInput.value.trim().toLowerCase();


    let visibleProducts = 0;


    products.forEach((product) => {

        const matchesFilter =
            productMatchesFilters(
                product,
                filters
            );


        const matchesSearch =
            productMatchesSearch(
                product,
                searchValue
            );


        if (
            matchesFilter &&
            matchesSearch
        ) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }

    });


    /* UPDATE PRODUCT COUNT */

    productCount.textContent =
        visibleProducts;


    /* NO RESULTS */

    if (visibleProducts === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }


    /* SEARCH CLEAR BUTTON */

    if (searchValue.length > 0) {

        clearSearch.classList.add("show");

    } else {

        clearSearch.classList.remove("show");

    }


    updateActiveFilters();
}


/* =========================================
   ACTIVE FILTER TAGS
========================================= */

function updateActiveFilters() {

    activeFilters.innerHTML = "";


    const filters =
        getSelectedFilters();


    Object.keys(filters).forEach(
        (filterType) => {

            filters[filterType].forEach(
                (value) => {

                    const tag =
                        document.createElement("div");

                    tag.className =
                        "filter-tag";


                    tag.innerHTML = `

                        <span>${value}</span>

                        <button
                            type="button"
                            data-value="${value}"
                            data-type="${filterType}"
                        >
                            ×
                        </button>

                    `;


                    activeFilters.appendChild(tag);

                }
            );

        }
    );


    /* SEARCH TAG */

    if (searchInput.value.trim()) {

        const tag =
            document.createElement("div");

        tag.className =
            "filter-tag";


        tag.innerHTML = `

            <span>
                Search: "${searchInput.value.trim()}"
            </span>

            <button type="button" id="removeSearchTag">
                ×
            </button>

        `;


        activeFilters.appendChild(tag);


        const removeSearchTag =
            document.getElementById(
                "removeSearchTag"
            );


        removeSearchTag.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                filterProducts();

            }
        );

    }


    /* ACTIVE TAG REMOVE */

    document
        .querySelectorAll(".filter-tag button")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const value =
                        button.dataset.value;

                    const type =
                        button.dataset.type;


                    checkboxes.forEach(
                        (checkbox) => {

                            if (
                                checkbox.value === value &&
                                checkbox.dataset.filter === type
                            ) {

                                checkbox.checked = false;

                            }

                        }
                    );


                    filterProducts();

                }
            );

        });

}


/* =========================================
   CHECKBOX EVENTS
========================================= */

checkboxes.forEach((checkbox) => {

    checkbox.addEventListener(
        "change",
        filterProducts
    );

});


/* =========================================
   SEARCH EVENT
========================================= */

searchInput.addEventListener(
    "input",
    filterProducts
);


/* =========================================
   CLEAR SEARCH
========================================= */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        searchInput.focus();

        filterProducts();

    }
);


/* =========================================
   CLEAR ALL FILTERS
========================================= */

function resetAllFilters() {

    checkboxes.forEach(
        (checkbox) => {

            checkbox.checked = false;

        }
    );


    searchInput.value = "";

    filterProducts();

}


clearFilters.addEventListener(
    "click",
    resetAllFilters
);


resetNoResults.addEventListener(
    "click",
    resetAllFilters
);


/* =========================================
   MOBILE SEARCH
========================================= */

const mobileSearchBottom =
    document.getElementById(
        "mobileSearchBottom"
    );


mobileSearchBottom.addEventListener(
    "click",
    () => {

        searchInput.focus();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================
   HEART BUTTON
========================================= */

document
    .querySelectorAll(".heart-btn")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const icon =
                    button.querySelector("i");


                if (
                    icon.classList.contains(
                        "ri-heart-line"
                    )
                ) {

                    icon.classList.remove(
                        "ri-heart-line"
                    );

                    icon.classList.add(
                        "ri-heart-fill"
                    );

                    button.style.color =
                        "#e74c3c";

                } else {

                    icon.classList.remove(
                        "ri-heart-fill"
                    );

                    icon.classList.add(
                        "ri-heart-line"
                    );

                    button.style.color =
                        "";

                }

            }
        );

    });


/* =========================================
   ADD TO BAG
========================================= */

document
    .querySelectorAll(".add-btn")
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const original =
                    button.innerHTML;


                button.innerHTML =
                    '<i class="ri-check-line"></i>';


                button.style.background =
                    "#111";

                button.style.color =
                    "#fff";


                setTimeout(() => {

                    button.innerHTML =
                        original;

                    button.style.background =
                        "";

                    button.style.color =
                        "";

                }, 1200);

            }
        );

    });


/* =========================================
   INITIAL LOAD
========================================= */

filterProducts();