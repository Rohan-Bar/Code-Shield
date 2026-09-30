/* 
   CODESHIELD — LANDING PAGE JAVASCRIPT
*/
document.addEventListener("DOMContentLoaded", () => {

    /* 
       ELEMENTS
     */

    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");


    /*
       HAMBURGER MENU
 */

    if (hamburger && mobileMenu) {

        hamburger.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("open");

            hamburger.classList.toggle("active", isOpen);

            hamburger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            hamburger.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        });


        /* 
           CLOSE MENU WHEN A MENU LINK IS CLICKED
         */

        const menuLinks = mobileMenu.querySelectorAll("a");

        menuLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                hamburger.setAttribute(
                    "aria-label",
                    "Open menu"
                );
            });

        });


        /*
           CLOSE MENU WHEN CLICKING OUTSIDE
        */

        document.addEventListener("click", (event) => {

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedHamburger =
                hamburger.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedHamburger &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove("open");

                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                hamburger.setAttribute(
                    "aria-label",
                    "Open menu"
                );
            }
        });


        /*
           CLOSE MENU WITH ESC KEY
       */

        document.addEventListener("keydown", (event) => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove("open");

                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

                hamburger.setAttribute(
                    "aria-label",
                    "Open menu"
                );

                hamburger.focus();
            }
        });

    }


    /* 
       SMOOTH SCROLL FOR INTERNAL SECTION LINKS
 */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});