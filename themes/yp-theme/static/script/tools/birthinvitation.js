 // Function to preview the invitation
 function previewInvitation() {
    // Update preview with form values
    document.getElementById('preview-invitee').textContent = document.getElementById('invitee').value || "_______________";
    document.getElementById('preview-parents').textContent = document.getElementById('parents').value;
    document.getElementById('preview-birthdayNum').textContent = document.getElementById('birthdayNum').value;
    document.getElementById('preview-child-for').textContent = document.getElementById('child-for').value;
    document.getElementById('preview-child-name').textContent = document.getElementById('child-name').value; 
    document.getElementById('preview-formatted-date').textContent = document.getElementById('formatted-date').value;
    document.getElementById('preview-time').textContent = document.getElementById('time').value;
    document.getElementById('preview-venue').textContent = document.getElementById('venue').value;
    document.getElementById('preview-address').textContent = document.getElementById('address').value;
    document.getElementById('preview-hosts').innerHTML = document.getElementById('hosts').value.replace(/\n/g, '<br>');
    
    // Handle child photo
    let photoInput = document.getElementById('child-photo');
    if (photoInput.files && photoInput.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview-child-photo').src = e.target.result;
        }
        reader.readAsDataURL(photoInput.files[0]);
    }
    
    document.getElementById('form-section').style.display = 'none';
    document.getElementById('preview-container').style.display = 'block';
    
    // Scroll to preview
    document.getElementById('preview-container').scrollIntoView({ behavior: 'smooth' });
}

        
        // Function to go back to the form
        function goBackToForm() {
            document.getElementById('form-section').style.display = 'block';
            document.getElementById('preview-container').style.display = 'none';
            
            // Scroll to form
            document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
        }
        
        // Function to download the invitation as HTML
        function downloadInvitation() {
            // First update the preview if not already visible
            if (document.getElementById('preview-container').style.display !== 'block') {
                previewInvitation();
            }
            
            // Create a clone of the preview card
            let cardClone = document.querySelector('.card').cloneNode(true);
            
            // Create a new HTML document
            let htmlContent = `
            <!DOCTYPE html>
            <html lang="hi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>प्रथम जन्मदिन निमंत्रण</title>
                <style>
                ${document.querySelector('style').innerHTML}
                </style>
            </head>
            <body style="background-color: white; padding: 20px; display: flex; justify-content: center;">
                ${cardClone.outerHTML}
            </body>
            </html>
            `;
            
            // Create a blob with the HTML content
            let blob = new Blob([htmlContent], { type: 'text/html' });
            
            // Create a download link
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'जन्मदिन_निमंत्रण.html';
            
            // Trigger the download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        
        // Function to download the invitation as PNG
      // Function to download the invitation as PNG
function downloadAsPNG() {
    const element = document.getElementById('invitation-card'); // Invitation card को target करें
    html2canvas(element, {
        useCORS: true, // Cross-Origin इमेज को allow करने के लिए
        scale: 2, // High resolution के लिए scale बढ़ाएँ
        logging: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'birthday-invitation.png';
        link.href = canvas.toDataURL('image/png'); // PNG format में convert करें
        link.click();
    }).catch(error => {
        console.error('Error generating PNG:', error);
    });
}

        
        // Function to print the invitation
        function printInvitation() {
            // First update the preview if not already visible
            if (document.getElementById('preview-container').style.display !== 'block') {
                previewInvitation();
            }
            
            // Print the page
            window.print();
        }
   
   