document.getElementById('rationData').addEventListener('paste', function(e) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = 'block';
    
    setTimeout(function() {
        generatePreview();
        hideForm();
        loadingSpinner.style.display = 'none';
    }, 500);
});

function showForm() {
    document.getElementById('form-container').style.display = 'flex';
    document.getElementById('rationData').value = '';
    document.getElementById('rationData').focus();
}

function hideForm() {
    document.getElementById('form-container').style.display = 'none';
}

function saveAsPDF() {
    window.print();
}

function generatePreview() {
 const data = document.getElementById('rationData').value;
 // Extract details using regular expressions or splitting
 const rationCardNo = data.match(/Ration Card No\.\s*:\s*(\d+)/)?.[1] || 'N/A';
 const scheme = data.match(/Scheme:\s*(\w+)/)?.[1] || 'N/A';
 const headOfFamily = data.match(/Head of the Family:\s*(.+)/)?.[1] || 'N/A';
 const address = data.match(/Address:\s*(.+)/)?.[1] || 'N/A';
 const onorc = data.match(/Allowed for ONORC:\s*(.+)/)?.[1] || 'N/A';

 document.getElementById('rationCardNo').innerText = rationCardNo;
 document.getElementById('scheme').innerText = scheme;
 document.getElementById('headOfFamily').innerText = headOfFamily;
 document.getElementById('address').innerText = address;
 document.getElementById('onorccheck').innerText = onorc;

 const familyMembersMatch = data.match(/Family Members\s*([\s\S]*?)(?=\s*Note:|$)/);
 if (!familyMembersMatch) return;


  const familyMembersSection = familyMembersMatch[1]
     .trim()
     .split('\n')
     .filter(line => line.trim() && !line.includes('Note:- Source IMPDS'));

 const tableBody = document.getElementById('familyMembersTable');
 tableBody.innerHTML = `
     <tr>
         <th>Sl.No.</th>
         <th>Member Id</th>
         <th>Member Name</th>
         <th>Relation with HoF</th>
         <th>UID Status</th>
     </tr>
 `;
   let rowCount = 0; // Initialize row counter
 const startIndex = familyMembersSection[0].toLowerCase().includes('sl.no') ? 1 : 0;

 for (let i = startIndex; i < familyMembersSection.length; i++) {
     const line = familyMembersSection[i].trim();
     if (!line) continue;
      const components = line.split(/\s+/);
     if (components.length < 5) continue;

     const slNo = components[0];
     const memberId = components[1];
     const uidStatus = components[components.length - 1];
     const toBeCapturedIndex = components.findIndex(comp => comp === "TO");
     
     let memberName, relation;
     
     if (toBeCapturedIndex !== -1) {
         memberName = components.slice(2, toBeCapturedIndex).join(' ');
         relation = components.slice(toBeCapturedIndex, -1).join(' ');
     } else {
         relation = components[components.length - 2];
         memberName = components.slice(2, -2).join(' ');
     }

     const row = document.createElement('tr');
     row.innerHTML = `
         <td>${slNo}</td>
         <td>${memberId}</td>
         <td>${memberName}</td>
         <td>${relation}</td>
         <td>${uidStatus}</td>
     `;
     tableBody.appendChild(row);
     rowCount++; // Increment row counter for each added row
 }
 // Calculate and display Patrata amount
const actualMemberCount = familyMembersSection.length - startIndex;
 const patrataAmount = rowCount * 5;  // 5 kg per row
 document.querySelector('.Patrata').innerText = ` ${patrataAmount} kg`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    showForm();
});

function formatDate(date) {
 const day = String(date.getDate()).padStart(2, '0');
 const month = String(date.getMonth() + 1).padStart(2, '0');
 const year = date.getFullYear();
 return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', function() {
 const today = new Date();
 document.getElementById('currentDate').textContent = formatDate(today);
 showForm();
});