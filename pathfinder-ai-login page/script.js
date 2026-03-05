document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#00d2ff", "#3a7bd5", "#8e2de2"] },
            shape: {
                type: "circle",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 },
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
            },
            size: {
                value: 4,
                random: true,
                anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: { enable: true, rotateX: 600, rotateY: 1200 }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    });

    // 2. Toggle Password Visibility
    const togglePassword = document.getElementById("toggle-password");
    const passwordInput = document.getElementById("password");

    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Toggle icon class
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

    // 3. Form Submission & Validation Mock
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");
    const emailInput = document.getElementById("email");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Add loading state to button
        const submitBtn = loginForm.querySelector(".btn-primary");
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> <span>Authenticating...</span>';
        submitBtn.disabled = true;

        // Simulate API call and validation delay
        setTimeout(() => {
            // Mock validation: success if email contains 'admin'
            if (!emailInput.value.includes("@")) {
                showError("Please enter a valid email address.", submitBtn, originalBtnHtml);
            } else if (emailInput.value !== "admin@pathfinder.ai" && passwordInput.value !== "admin") {
                // For demo purposes, we accept any format, but show error just to demonstrate the UI
                // We'll show an error if it's not a specific mock admin account
                // Wait, let's just make it success for the demo so user sees the success state!
                // Actually, let's show an error if password is less than 6 chars to demo the error shake.
                if (passwordInput.value.length < 6) {
                    showError("Invalid credentials. Hint: use password >= 6 chars for demo.", submitBtn, originalBtnHtml);
                } else {
                    showSuccess(submitBtn, originalBtnHtml);
                }
            } else {
                showSuccess(submitBtn, originalBtnHtml);
            }
        }, 1500);
    });

    function showError(msg, btn, originalHtml) {
        errorMessage.querySelector("span").textContent = msg;
        errorMessage.classList.add("show");
        btn.innerHTML = originalHtml;
        btn.disabled = false;
        
        // Shake input fields for visual feedback
        loginForm.querySelectorAll(".input-group").forEach(group => {
            group.style.animation = "shake 0.5s ease-in-out";
            setTimeout(() => group.style.animation = "", 500);
        });
    }

    function showSuccess(btn, originalHtml) {
        errorMessage.classList.remove("show");
        btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>Success! Logging in...</span>';
        btn.style.background = "linear-gradient(135deg, #00b09b, #96c93d)";
        btn.style.boxShadow = "0 5px 20px rgba(0, 176, 155, 0.4)";
        
        // Simulate redirect
        setTimeout(() => {
            alert("Welcome to PathFinder AI Dashboard!");
            // Reset state
            btn.innerHTML = originalHtml;
            btn.disabled = false;
            btn.style = "";
            passwordInput.value = "";
        }, 1200);
    }

    // Hide error message on new user input
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            errorMessage.classList.remove("show");
        });
    });

    // 4. Input group focus visual enhancement
    // (Already handled mostly via CSS :focus-within, but can add extra logic if needed)
});
