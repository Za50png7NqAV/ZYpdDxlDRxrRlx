 // Variables to store the original image and converted WebP
 let originalImage = null;
 let webpImage = null;
 
 // Setup drag and drop
 const dropArea = document.getElementById('drop-area');
 
 ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
     dropArea.addEventListener(eventName, preventDefaults, false);
 });
 
 function preventDefaults(e) {
     e.preventDefault();
     e.stopPropagation();
 }
 
 ['dragenter', 'dragover'].forEach(eventName => {
     dropArea.addEventListener(eventName, highlight, false);
 });
 
 ['dragleave', 'drop'].forEach(eventName => {
     dropArea.addEventListener(eventName, unhighlight, false);
 });
 
 function highlight() {
     dropArea.style.backgroundColor = '#edf7fd';
     dropArea.style.borderColor = '#2980b9';
 }
 
 function unhighlight() {
     dropArea.style.backgroundColor = '';
     dropArea.style.borderColor = '#3498db';
 }
 
 dropArea.addEventListener('drop', handleDrop, false);
 
 function handleDrop(e) {
     const dt = e.dataTransfer;
     const files = dt.files;
     handleFiles(files);
 }
 
 function handleFileSelect(event) {
     const files = event.target.files;
     handleFiles(files);
 }
 
 function handleFiles(files) {
     if (files.length > 0) {
         const file = files[0];
         
         // Check if file is JPG or PNG
         const fileType = file.type;
         if (!['image/jpeg', 'image/png'].includes(fileType)) {
             alert('Please select a JPG or PNG image.');
             return;
         }
         
         originalImage = file;
         
         // Enable convert button
         document.getElementById('convert-btn').disabled = false;
         
         // Display original image preview
         const reader = new FileReader();
         reader.onload = function(e) {
             const preview = document.getElementById('preview');
             preview.innerHTML = `
                 <div class="preview-item">
                     <h3>Original Image (${fileType === 'image/jpeg' ? 'JPG' : 'PNG'})</h3>
                     <img src="${e.target.result}" class="preview-image" id="original-preview">
                     <div class="stats">
                         <p>Size: ${formatBytes(file.size)}</p>
                         <p>Type: ${fileType}</p>
                     </div>
                 </div>
                 <div class="preview-item">
                     <h3>WebP Image (Not converted yet)</h3>
                     <div id="webp-placeholder" style="height: 200px; background-color: #eee; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                         <p>Convert to see WebP preview</p>
                     </div>
                     <div class="stats" id="webp-stats">
                         <p>Size: -</p>
                         <p>Type: -</p>
                     </div>
                 </div>
             `;
             
             // Get original image dimensions
             const img = new Image();
             img.onload = function() {
                 const dimensions = document.createElement('p');
                 dimensions.textContent = `Dimensions: ${this.width} × ${this.height}`;
                 document.querySelector('.stats').appendChild(dimensions);
             };
             img.src = e.target.result;
         };
         reader.readAsDataURL(file);
     }
 }
 
 // Convert to WebP
 document.getElementById('convert-btn').addEventListener('click', convertToWebP);
 
 function convertToWebP() {
     if (!originalImage) {
         alert('Please select an image first.');
         return;
     }
     
     const progressBar = document.getElementById('progress-bar');
     const progress = document.querySelector('.progress');
     
     progress.style.display = 'block';
     progressBar.style.width = '20%';
     
     const quality = parseInt(document.getElementById('quality').value) / 100;
     
     // Create image from the file
     const reader = new FileReader();
     reader.onload = function(e) {
         const img = new Image();
         img.onload = function() {
             progressBar.style.width = '50%';
             
             // Create canvas
             const canvas = document.createElement('canvas');
             canvas.width = img.width;
             canvas.height = img.height;
             
             // Draw image on canvas
             const ctx = canvas.getContext('2d');
             ctx.drawImage(img, 0, 0);
             
             progressBar.style.width = '70%';
             
             // Convert canvas to WebP
             canvas.toBlob(function(blob) {
                 progressBar.style.width = '90%';
                 
                 webpImage = blob;
                 
                 // Display WebP preview
                 const webpURL = URL.createObjectURL(blob);
                 const webpPreview = document.createElement('img');
                 webpPreview.src = webpURL;
                 webpPreview.className = 'preview-image';
                 webpPreview.id = 'webp-preview';
                 
                 const webpPlaceholder = document.getElementById('webp-placeholder');
                 webpPlaceholder.parentNode.replaceChild(webpPreview, webpPlaceholder);
                 
                 // Update WebP stats
                 document.getElementById('webp-stats').innerHTML = `
                     <p>Size: ${formatBytes(blob.size)}</p>
                     <p>Type: ${blob.type}</p>
                     <p>Dimensions: ${img.width} × ${img.height}</p>
                     <p>Compression: ${Math.round((1 - (blob.size / originalImage.size)) * 100)}% smaller</p>
                 `;
                 
                 // Show download button
                 document.getElementById('download-btn').style.display = 'inline-block';
                 
                 progressBar.style.width = '100%';
                 setTimeout(() => {
                     progress.style.display = 'none';
                     progressBar.style.width = '0';
                 }, 500);
             }, 'image/webp', quality);
         };
         img.src = e.target.result;
     };
     reader.readAsDataURL(originalImage);
 }
 
 // Download WebP image
 document.getElementById('download-btn').addEventListener('click', function() {
     if (!webpImage) {
         alert('Please convert the image first.');
         return;
     }
     
     const a = document.createElement('a');
     a.href = URL.createObjectURL(webpImage);
     
     // Get original filename and replace extension with .webp
     let filename = originalImage.name;
     const lastDot = filename.lastIndexOf('.');
     if (lastDot !== -1) {
         filename = filename.substring(0, lastDot);
     }
     a.download = `${filename}.webp`;
     
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
 });
 
 // Format bytes to human-readable format
 function formatBytes(bytes, decimals = 2) {
     if (bytes === 0) return '0 Bytes';
     
     const k = 1024;
     const dm = decimals < 0 ? 0 : decimals;
     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
     
     const i = Math.floor(Math.log(bytes) / Math.log(k));
     
     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }