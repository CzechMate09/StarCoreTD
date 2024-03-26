window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  // Time for the stripes animation to complete plus delay for starting the fade-out
  setTimeout(() => {
    // Start fade-out
    loader.style.opacity = "0";
    // Wait for the fade-out transition to finish before hiding the loader
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000); // This matches the duration of the fade-out transition
  }, 2000); // Adjust this time to match your stripes animation duration plus any delay
});


