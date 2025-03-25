
// Function to get URL parameters
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Pre-fill the course or batch dropdown based on URL parameters
document.addEventListener('DOMContentLoaded', function () {
    const course = getParameterByName('course');
    const batch = getParameterByName('batch');

    if (course) {
        const courseSelect = document.getElementById('course');
        courseSelect.value = course;
    }

    if (batch) {
        const batchSelect = document.getElementById('batch');
        batchSelect.value = batch;
    }
});

// Handle form submission
document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;
    const batch = document.getElementById('batch').value;

    // Validate form inputs
    if (!name || !email || !phone || !course || !batch) {
        alert('Please fill in all fields.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }

    // Display confirmation message
    alert(`Thank you, ${name}! You have successfully registered for the ${course} course (Batch: ${batch}).`);

    // Clear the form
    document.getElementById('registration-form').reset();
});