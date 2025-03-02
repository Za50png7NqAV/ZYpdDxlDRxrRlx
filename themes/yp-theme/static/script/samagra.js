const dragDropZone = document.getElementById('dragDropZone');
        const qrFileInput = document.getElementById('qrFileInput');
        const qrCodeImg = document.getElementById('qrCodeImg');
        const fullDataTextarea = document.getElementById('fullData');

        dragDropZone.addEventListener('click', () => qrFileInput.click());

        dragDropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dragDropZone.classList.add('dragover');
        });

        dragDropZone.addEventListener('dragleave', () => {
            dragDropZone.classList.remove('dragover');
        });

        dragDropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dragDropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            handleFile(file);
        });

        qrFileInput.addEventListener('change', () => {
            const file = qrFileInput.files[0];
            handleFile(file);
        });

        function handleFile(file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                qrCodeImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

       fullDataTextarea.addEventListener('paste', (e) => {
    setTimeout(() => {
        fullDataTextarea.disabled = true; // Disable after paste
    }, 0);
});

function generatePreview() {
    fullDataTextarea.disabled = false;
    const fullData = fullDataTextarea.value;
    fullDataTextarea.disabled = true;

    const sections = fullData.split('परिवार के सदस्यो की जानकारी');
    const leftData = sections[0].trim();
    const rightData = sections[1].trim();

    const leftDetails = processLeftData(leftData);
    document.getElementById('leftDetails').innerHTML = leftDetails;

    const familyMembers = processRightData(rightData);
    updateFamilyMembersTable(familyMembers);

    const printDate = extractPrintDate(fullData);
    document.getElementById('printDate').innerHTML = `<strong>कार्ड प्रिंट दिनांक:</strong> ${printDate}`;

    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('previewContainer').style.display = 'block';
}

function processLeftData(data) {
    // Split the input data into lines
    const lines = data.trim().split('\n');
    let html = '';
    
    // Define regex patterns to extract specific key-value pairs
    const patterns = {
        familyID: /समग्र परिवार आईडी\s*:\s*(.+)/,
        headOfFamily: /मुखिया का नाम\s*:\s*(.+)/,
        currentAddress: /वर्तमान निवास\s*:\s*(.+)/,
        aadhaarAddress: /आधार के अनुसार पता\s*:\s*(.+)/,
        registrationDate: /समग्र में पंजीयन की दिनांक\s*:\s*(.+)/,
        registrant: /पंजीयन कर्ता\s*:\s*(.+)/
    };

    // Loop through each line and match it with the appropriate pattern
    lines.forEach(line => {
        let match;
        
        if (match = line.match(patterns.familyID)) {
            html += `<p>समग्र परिवार आईडी: <strong>${match[1]}</strong></p>`;
        } else if (match = line.match(patterns.headOfFamily)) {
            html += `<p>मुखिया का नाम: <strong>${match[1]}</strong></p>`;
        } else if (match = line.match(patterns.currentAddress)) {
            html += `<p>वर्तमान निवास: <strong>${match[1]}</strong></p>`;
        } else if (match = line.match(patterns.aadhaarAddress)) {
            html += `<p>आधार के अनुसार पता: <strong>${match[1]}</strong></p>`;
        } else if (match = line.match(patterns.registrationDate)) {
            html += `<p>समग्र में पंजीयन की दिनांक: <strong>${match[1]}</strong></p>`;
        } else if (match = line.match(patterns.registrant)) {
            html += `<p> पंजीयन कर्ता: <strong>${match[1]} </strong></p>`;
        }
    });

    return html;
}

function extractPrintDate(data) {
    const dateRegex = /कार्ड प्रिंट दिनांक:\s*(.*)/;
    const match = data.match(dateRegex);
    
    if (match && match[1]) {
        return match[1];
    } else {
        const today = new Date().toLocaleDateString('hi-IN'); // Default to today's date
        return today;
    }
}

        function processRightData(data) {
            const lines = data.trim().split('\n').slice(1);
            return lines.map((line) => {
                const [number, id, aadhar, name, age, gender] = line.split('\t').map(item => item.trim());
                return {number, id, aadhar, name, age, gender };
            }).filter(member => member.id && member.aadhar && member.name);
        }
     
        function updateFamilyMembersTable(familyMembers) {
            const tableBody = document.querySelector('#familyMembersTable tbody');
            tableBody.innerHTML = '';
            familyMembers.forEach((member) => {
                const row = tableBody.insertRow();
                row.innerHTML = `
                    <td>${member.number}</td>
                    <td>${member.id}</td>
                    <td>${member.aadhar}</td>
                    <td>${member.name}</td>
                    <td>${member.age || ''}</td>
                    <td>${member.gender || ''}</td>
                `;
            });
        }

          function extractPrintDate(data) {
        const dateRegex = /कार्ड प्रिंट दिनांक:\s*(.*)/;
        const match = data.match(dateRegex);
        const today = new Date().toLocaleDateString('hi-IN'); // Today's date in Hindi format

        return match && match[1] ? match[1] : today; // Default to today's date if no date is found
    }

        function editForm() {
            document.getElementById('formContainer').style.display = 'block';
            document.getElementById('previewContainer').style.display = 'none';
            fullDataTextarea.disabled = false;
        }

        function printPreview() {
            window.print();
        }

  
  var allowedDomains = ["www.v2kcomputers.com", "tools.v2kcomputers.com"];

  if (window !== window.top) {
    var referrer = document.referrer; 
 var referrerDomain = new URL(referrer).hostname;

    if (!allowedDomains.includes(referrerDomain)) {
      window.top.location = "tools.v2kcomputers.com/p/samagra-id-card_14.html"; 
      }
  }