function formatCardNumber(number) {
    return number.replace(/(\d{4})(?=\d)/g, '$1 ');
}

document.getElementById('kissanForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const farmerID = document.getElementById('farmerID').value;
    const formattedFarmerID = formatCardNumber(farmerID); // Format Farmer ID
    const name = document.getElementById('name').value;
    const fatherName = document.getElementById('fatherName').value;
    const gender = document.getElementById('gender').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;

    // Update card content
    document.querySelectorAll('.card-number')[0].textContent = formattedFarmerID;
    document.querySelectorAll('.card-number')[1].textContent = formattedFarmerID;
    document.querySelector('.info').innerHTML = `
        <p>${name}</p>
        <p>${fatherName}</p>
        <p>${gender}</p>
       
    `;
    document.querySelectorAll('.info')[1].innerHTML = `
        <p>Address:</p>
        <p>${address}</p>
         <p>Mo. ${mobile}</p>
    `;

    // Generate QR Code
    QRCode.toString("https://mpfr.agristack.gov.in/farmer-registry-mp/#/", 
        { type: 'svg', color: { dark: '#000', light: '#FFF' } }, 
        (err, svg) => {
            if (err) throw err;
            document.getElementById('qrcode').innerHTML = svg;
        }
    );

    // Hide form and show card with buttons
    document.querySelector('.form-container').style.display = 'none'; // Hide form
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.style.display = 'flex'; // Ensure the card is shown
    document.getElementById('buttons').style.display = 'block'; // Show buttons
});


        // Handle photo upload
        document.getElementById('photo').addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const photoDiv = document.querySelector('.photo');
                    photoDiv.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });



        document.getElementById('editButton').addEventListener('click', function () {
    document.querySelector('.form-container').style.display = 'block';
    document.getElementById('cardContainer').style.display = 'none';
    document.getElementById('buttons').style.display = 'none';
});

// Handle Print button
document.getElementById('printButton').addEventListener('click', function () {
    const printContent = document.getElementById('cardContainer').innerHTML;
    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write('<html><head><title>Print Card</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
});

// Handle Save as PNG button


   function saveButton() {
        const gridContainer = document.getElementById("cardContainer");
        html2canvas(gridContainer, { scale: 2 }).then(canvas => {
            const link = document.createElement("a");
            link.download = "kisan-card.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });


   

    }
