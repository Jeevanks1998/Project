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

//download
// Toggle syllabus content
function toggleSyllabus(id) {
    const content = document.getElementById(id);
    const icon = content.previousElementSibling.querySelector('.toggle-icon');
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.textContent = '+';
    } else {
        content.style.display = 'block';
        icon.textContent = '-';
    }
}

// Show download form modal
function showDownloadForm(courseId) {
    document.getElementById('courseId').value = courseId;
    document.getElementById('downloadModal').style.display = 'block';
}

// Close modal
function closeModal() {
    document.getElementById('downloadModal').style.display = 'none';
}

// Generate PDF from syllabus content
function generatePDF() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const courseId = document.getElementById('courseId').value;
    
    if (!name || !email || !phone) {
        alert('Please fill in all fields');
        return;
    }

    // Close the modal
    closeModal();
    
    // Get the course content
    const courseContent = document.getElementById(courseId);
    const courseTitle = courseContent.previousElementSibling.textContent.trim();
    
    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text(`Complete Analytics - ${courseTitle} Syllabus`, 105, 20, { align: 'center' });
    
    // Add user details
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Downloaded by: ${name}`, 14, 30);
    doc.text(`Email: ${email}`, 14, 36);
    doc.text(`Phone: ${phone}`, 14, 42);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 48);
    
    // Add line separator
    doc.setDrawColor(200);
    doc.line(14, 52, 196, 52);
    
    // Extract course details
    const details = [];
    const paragraphs = courseContent.querySelectorAll('p');
    const lists = courseContent.querySelectorAll('ul');
    const tools = courseContent.querySelectorAll('.tools');
    
    // Add course details
    let yPosition = 60;
    
    // Basic info
    doc.setFontSize(14);
    doc.setTextColor(40);
    doc.text('Course Information', 14, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    paragraphs.forEach(p => {
        const text = p.textContent.trim();
        if (text) {
            const lines = doc.splitTextToSize(text, 180);
            doc.text(lines, 14, yPosition);
            yPosition += lines.length * 7;
        }
    });
    
    // Syllabus
    doc.setFontSize(14);
    doc.text('Syllabus Details', 14, yPosition);
    yPosition += 10;
    
    lists.forEach(ul => {
        const items = ul.querySelectorAll('li');
        items.forEach(item => {
            doc.setFontSize(12);
            doc.text('• ' + item.textContent.trim(), 16, yPosition);
            yPosition += 7;
            
            // Add new page if needed
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
        });
    });
    
    // Tools
    if (tools.length > 0) {
        doc.setFontSize(14);
        doc.text('Tools Covered', 14, yPosition);
        yPosition += 10;
        
        const toolsText = [];
        tools[0].querySelectorAll('span').forEach(span => {
            toolsText.push(span.textContent.trim());
        });
        
        doc.setFontSize(12);
        const toolsLines = doc.splitTextToSize(toolsText.join(', '), 180);
        doc.text(toolsLines, 14, yPosition);
        yPosition += toolsLines.length * 7;
    }
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('© 2025 Complete Analytics - All rights reserved', 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save(`CompleteAnalytics_${courseTitle.replace(/\s+/g, '_')}_Syllabus.pdf`);
}

// Initialize all syllabus contents as hidden
document.addEventListener('DOMContentLoaded', function() {
    const syllabusContents = document.querySelectorAll('.syllabus-content');
    syllabusContents.forEach(content => {
        content.style.display = 'none';
    });
});
