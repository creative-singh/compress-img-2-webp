document.getElementById('imageInput').addEventListener('change', function (e) {
  const file = e.target.files[0];
  const image = new Image();

  image.onload = function () {
    const canvas = document.getElementById('compressedImage');
    const ctx = canvas.getContext('2d');
    const maxWidth = 800; // Max width for the compressed image
    const maxHeight = 600; // Max height for the compressed image
    let width = image.width;
    let height = image.height;

    // Calculate the new dimensions
    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    // Resize the canvas and draw the image
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);

    // Convert the canvas to a compressed image (JPEG)
    const compressedImageData = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

    // Display the download link for the compressed image
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = compressedImageData;
    downloadLink.download = 'compressed.jpg';
    downloadLink.style.display = 'block';
  };

  // Load the selected image
  const reader = new FileReader();
  reader.onload = function (e) {
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
});