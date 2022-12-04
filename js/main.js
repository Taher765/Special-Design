// Get All Selectors
const links = document.querySelectorAll(".navbar-nav .nav-item .nav-link");
const setting = document.querySelector(".setting");
const btnGear = document.querySelector(".setting #btn-gear");
const colors = document.querySelectorAll(".color-list .color");
const btnRandomBackground = document.querySelectorAll(".btn-random");
const landing = document.querySelector(".landing");
const bulletsEl = document.querySelector("#bullets");
const bullets = document.querySelectorAll(".bullets .bullet");
const settingBullets = document.querySelectorAll(
  ".box-nav-bullets .nav-bullet"
);
const reset = document.querySelector("#reset");
// varibels
let randomBackgroundOption = true;
let randomBackgroundInterval;

// Check Local Storage
(() => {
  // Check Color From Local Storage
  let checkColor = window.localStorage.getItem("color-option");
  if (checkColor !== null) {
    document.documentElement.style.setProperty("--main-color", checkColor);
    // Handle Active Class
    colors.forEach((color) => {
      // Remove Active Class from Li
      color.classList.remove("active");
      // Add Active Class From Local Storage
      if (color.dataset.color === checkColor) {
        color.classList.add("active");
      }
    });
  }
  // Check Random Background From Local Storage
  let randomBackgroundFromLocalStorage =
    window.localStorage.getItem("random-background");
  if (randomBackgroundFromLocalStorage != null) {
    // Check Add Active Class
    btnRandomBackground.forEach((btn) => {
      // Remove Active Class From Btn
      btn.classList.remove("active");
      // Check Add Active Class
      if (btn.classList.contains(randomBackgroundFromLocalStorage)) {
        btn.classList.add("active");
      }
    });
    // Run Random Background
    if (randomBackgroundFromLocalStorage === "true") {
      randomBackgroundOption = true;
    } else {
      // Stop Random Background
      randomBackgroundOption = false;
      // Save Background image From Local Storage
      landing.style.backgroundImage = `url(../images/${localStorage.getItem(
        "background-image"
      )})`;
    }
  }
  // Check Display Bullets From Local Storage
  if (localStorage.getItem("display-bullets") === "no") {
    // Remove Active Class
    settingBullets.forEach((bullet) => {
      bullet.classList.remove("active");
      // Add Active Class To Bullet
      if (bullet.dataset.bullet === localStorage.getItem("display-bullets")) {
        bullet.classList.add("active");
      }
    });

    bulletsEl.style.display = "none";
  }
})();

//// Start Setting Box //
btnGear.addEventListener("click", function () {
  this.classList.toggle("fa-spin");
  setting.classList.toggle("open");
});

// Handle Active Class // Setting Color
colors.forEach((color) => {
  color.addEventListener("click", (el) => {
    colors.forEach((removeEl) => {
      removeEl.classList.remove("active");
    });
    el.target.classList.add("active");
    let color = el.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);
    window.localStorage.setItem("color-option", color);
  });
});

// random background condition // Setting
btnRandomBackground.forEach((btn) => {
  btn.addEventListener("click", (btnEl) => {
    btnRandomBackground.forEach((btn) => {
      btn.classList.remove("active");
    });
    // Add Active Class To Btn
    btnEl.target.classList.add("active");
    // Stop Random Background
    if (btn.classList.contains("true")) {
      randomBackgroundOption = true;
      randomBackground();
    } else {
      randomBackgroundOption = false;
      clearInterval(randomBackgroundInterval);
    }
    window.localStorage.setItem("random-background", randomBackgroundOption);
  });
});

// Change State Bullets // Setting
settingBullets.forEach((bulletBtn) => {
  bulletBtn.addEventListener("click", (e) => {
    // Remove Active Class From Btn Bulllets
    settingBullets.forEach((btnClass) => {
      btnClass.classList.remove("active");
    });
    // Add Active Class To Bullet
    e.target.classList.add("active");
    // Change Display
    if (e.target.dataset.bullet === "no") {
      bulletsEl.style.display = "none";
    } else {
      bulletsEl.style.display = "block";
    }
    window.localStorage.setItem("display-bullets", e.target.dataset.bullet);
  });
});

///// END SETTING //

// START NAVBAR
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Scroll To Section Active
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// START BULLETS
bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    // SCROLL TO SECTION ACTIVE CLASS
    const test = document.querySelector(`#${e.target.dataset.section}`);
    test.scrollIntoView({
      behavior: "smooth",
    });
  });
});

// random background
const backgroundImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomBackground() {
  if (randomBackgroundOption) {
    randomBackgroundInterval = setInterval(() => {
      const rndomBackground = Math.floor(
        Math.random() * backgroundImages.length
      );
      landing.style.backgroundImage = `url(../images/${backgroundImages[rndomBackground]})`;
      localStorage.setItem(
        "background-image",
        backgroundImages[rndomBackground]
      );
    }, 500);
  }
}
randomBackground();

// START PROGRESS
const ourSkills = document.querySelector(".our-skills");
const brogressBar = document.querySelectorAll(".progress-item .progress-bar");
window.onscroll = () => {
  if (window.scrollY >= ourSkills.offsetTop - 100) {
    brogressBar.forEach((ele) => {
      ele.style.width = ele.dataset.progress;
    });
  }
};

// START GALLERY
const galleryImage = document.querySelectorAll(".gallery .gallery-img img");
const galleryImageArr = Array.from(galleryImage);
let count = 0;

galleryImageArr.forEach((imgClick) => {
  imgClick.addEventListener("click", () => {
    // Craete Parent Gallery
    let divParent = document.createElement("div");
    divParent.className = "gallery-parent";
    //Create Img
    let imgEl = document.createElement("img");
    imgEl.src = imgClick.src;

    // Create Arrow Right & Left
    let divNavigation = document.createElement("div");
    divNavigation.className =
      "arrow-nav d-flex align-items-center justify-content-between";
    let arrowLeft = document.createElement("i");
    arrowLeft.className = "fa-solid fa-angle-left";
    let arrowRight = document.createElement("i");
    arrowRight.className = "fa-solid fa-angle-right";
    divNavigation.appendChild(arrowLeft);
    divNavigation.appendChild(arrowRight);
    // Craete Btn Close Img
    let btn = document.createElement("button");
    btn.className = "btn-close-img";
    btn.innerHTML = "X";

    // Inject elements To the document
    divParent.appendChild(imgEl);
    divParent.appendChild(btn);
    divParent.appendChild(divNavigation);
    document.body.appendChild(divParent);

    // Logic Arrow Navigation
    document.querySelector(".fa-angle-right").onclick = () => {
      if (count < galleryImage.length - 1) {
        count++;
        imgEl.src = galleryImageArr[count].src;
      } else {
        count = 0;
      }
    };
    document.querySelector(".fa-angle-left").onclick = () => {
      if (count > 0) {
        count--;
        imgEl.src = galleryImageArr[count].src;
      } else {
        count = galleryImage.length - 1;
      }
    };
    // Close Image
    document.querySelector(".btn-close-img").addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  });
});

// START RESET SETTING
reset.addEventListener("click", () => {
  window.localStorage.removeItem("background-image");
  window.localStorage.removeItem("color-option");
  window.localStorage.removeItem("random-background");
  window.localStorage.removeItem("flag");
  window.localStorage.removeItem("display-bullets");
  window.location.reload();
});
