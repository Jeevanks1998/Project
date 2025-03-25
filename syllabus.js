// Function to toggle syllabus content
function toggleSyllabus(id) {
    const content = document.getElementById(id);
    const toggleIcon = content.previousElementSibling.querySelector('.toggle-icon');

    if (content.style.display === "block") {
        content.style.display = "none";
        toggleIcon.textContent = "+";
        toggleIcon.style.transform = "rotate(0deg)";
    } else {
        content.style.display = "block";
        toggleIcon.textContent = "×";
        toggleIcon.style.transform = "rotate(45deg)";
    }
}

// Hamburger menu toggle
document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
});