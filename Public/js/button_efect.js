const links = document.querySelectorAll("a");
links.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        event.target.classList.add("active");
        setTimeout(() => {
            event.target.classList.remove("active");
        }, 500);
    });
});
