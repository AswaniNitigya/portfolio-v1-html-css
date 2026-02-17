document.addEventListener("DOMContentLoaded", () => {
  // Video background handling
  const homeVideo = document.getElementById("home-bg-video");
  const projectsVideo = document.getElementById("projects-bg-video");
  const linksVideo = document.getElementById("links-bg-video");

  // Ensure videos load and play properly
  const videos = [homeVideo, projectsVideo, linksVideo];
  videos.forEach((video) => {
    if (video) {
      video.play().catch((error) => {
        console.log("Auto-play was prevented for video:", error);
        // Add a play button or alternative solution if needed
      });
    }
  });

  // Adjust overlay opacity based on scroll position
  const homeSection = document.querySelector(".home-section");
  const projectsSection = document.querySelector(".projects-section");
  const sharedBgContainer = document.querySelector(
    ".shared-background-container",
  );

  function adjustOverlayOpacity() {
    // Update home section video overlay
    if (homeSection) {
      const homeOverlay = homeSection.querySelector(".overlay");
      const scrollPosition = window.scrollY;

      // Check if user has scrolled past the home section
      const homeSectionHeight = homeSection.offsetHeight;
      const homeSectionBottom = homeSection.offsetTop + homeSectionHeight;

      if (scrollPosition > homeSectionBottom) {
        // User has scrolled past home section, hide the home video
        homeSection.querySelector(".video-background").style.opacity = "0";
      } else {
        // User is still in home section, show the video and adjust opacity
        homeSection.querySelector(".video-background").style.opacity = "1";

        // Gradually increase opacity as user scrolls down
        if (scrollPosition < 200) {
          const opacity = 0.7 + scrollPosition / 500;
          homeOverlay.style.backgroundColor = `rgba(18, 18, 18, ${opacity})`;
        }
      }
    }

    // Update projects section video size
    if (projectsSection) {
      const projectsHeight = projectsSection.offsetHeight;
      const projectsVideo = projectsSection.querySelector("video");
      if (projectsVideo && projectsHeight > window.innerHeight) {
        projectsVideo.style.height = `${projectsHeight}px`;
      }
    }

    // Update links/contact shared background video size
    if (sharedBgContainer) {
      const sharedBgHeight = sharedBgContainer.offsetHeight;
      const sharedBgVideo = sharedBgContainer.querySelector("video");
      if (sharedBgVideo) {
        // Ensure video covers the entire container
        if (sharedBgHeight > window.innerHeight) {
          sharedBgVideo.style.height = `${sharedBgHeight}px`;
        }
      }
    }
  }

  window.addEventListener("scroll", adjustOverlayOpacity);
  window.addEventListener("resize", adjustOverlayOpacity);

  // Call once on load
  adjustOverlayOpacity();

  // Custom cursor implementation
  const cursor = document.querySelector(".cursor");
  const body = document.body;

  // Set CSS variables for cursor position
  document.addEventListener("mousemove", (e) => {
    document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);

    // Create trail effect
    createTrailDot(e.clientX, e.clientY);
  });

  // Handle mouse clicks for splash effect
  document.addEventListener("mousedown", () => {
    body.classList.add("click-effect");
  });

  document.addEventListener("mouseup", () => {
    body.classList.remove("click-effect");
  });

  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, .interactive, .folder-project",
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      body.classList.add("hover-effect");
    });

    element.addEventListener("mouseleave", () => {
      body.classList.remove("hover-effect");
    });
  });

  // Create trail effect dots
  function createTrailDot(x, y) {
    // Limit the rate of trail creation
    if (Math.random() > 0.7) {
      // Only create a dot 30% of the time
      const trailDot = document.createElement("div");
      trailDot.className = "cursor-trail";
      trailDot.style.left = `${x}px`;
      trailDot.style.top = `${y}px`;

      document.body.appendChild(trailDot);

      // Randomize the animation
      const size = Math.random() * 8 + 3; // Random size between 3 and 11px
      const opacityStart = Math.random() * 0.3 + 0.2; // Random opacity

      trailDot.style.width = `${size}px`;
      trailDot.style.height = `${size}px`;
      trailDot.style.opacity = opacityStart;

      // Animate and remove the trail dot
      setTimeout(() => {
        trailDot.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(trailDot);
        }, 500);
      }, 100);
    }
  }

  // Navigation active link highlighting and auto-hide navbar
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    // Remove console logs for production
    // console.log("Scroll position:", scrollY);

    // Simplest approach: check which section is closest to the top of the viewport
    const homeOffset = Math.abs(
      document.getElementById("home").getBoundingClientRect().top,
    );
    const projectsOffset = Math.abs(
      document.getElementById("projects").getBoundingClientRect().top,
    );
    const linksOffset = Math.abs(
      document.getElementById("links").getBoundingClientRect().top,
    );
    const contactOffset = Math.abs(
      document.getElementById("contact").getBoundingClientRect().top,
    );

    // Find the section with the smallest offset (closest to viewport top)
    const offsets = [
      { id: "home", offset: homeOffset },
      { id: "projects", offset: projectsOffset },
      { id: "links", offset: linksOffset },
      { id: "contact", offset: contactOffset },
    ];

    // Sort by offset (smallest first)
    offsets.sort((a, b) => a.offset - b.offset);

    // The section with smallest offset is the one most visible at top
    const currentSection = offsets[0].id;

    // Update active class on navigation links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    // Change navbar background based on scroll position
    if (scrollY > 100 && currentSection !== "home") {
      // Not on home section - change to solid black
      navbar.classList.add("navbar-scrolled");
    } else {
      // On home section - revert to gradient
      navbar.classList.remove("navbar-scrolled");
    }
  }

  // Throttle scroll events for better performance
  let scrollTimeout;
  window.addEventListener("scroll", function () {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(function () {
        highlightNavOnScroll();
        scrollTimeout = null;
      }, 50);
    }
  });

  // Call once on load to set the initial state
  highlightNavOnScroll();

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Only apply smooth scrolling to hash links within the current page
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Project folder hover effect enhancement
  const folderProjects = document.querySelectorAll(".folder-project");

  folderProjects.forEach((folder) => {
    // Add a slight delay on mouseout to make the transition smoother
    folder.addEventListener("mouseleave", function () {
      const folderContent = this.querySelector(".folder-content");
      const folderIcon = this.querySelector(".folder-icon");

      folderIcon.style.transition = "opacity 0.3s ease 0.1s";
      folderContent.style.transition = "opacity 0.3s ease";

      // Reset transitions after the animation
      setTimeout(() => {
        folderIcon.style.transition = "opacity 0.3s ease";
        folderContent.style.transition = "opacity 0.3s ease";
      }, 400);
    });
  });

  // Hover effect for links and buttons
  const hoverElements = document.querySelectorAll(
    "a, button, .project-item, .link-card, .contact-card",
  );
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("hover-effect");
    });
    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover-effect");
    });
  });

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.classList.add("click-effect");
  });
  document.addEventListener("mouseup", () => {
    cursor.classList.remove("click-effect");
  });
});
