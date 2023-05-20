const image360 = document.getElementById('image360');
  const totalImages = 48;
  let currentImage = 1;

  // Mengambil data dari file JSON
  fetch('https://cdn.jsdelivr.net/gh/fesaone/streetfighterv4sp2@main/streetfighter.json')
    .then(response => response.json())
    .then(data => {
      const images = data.images;

      image360.style.backgroundImage = `url('${images[currentImage - 1]}')`;

      let isMouseDown = false;
      let startX;

      function updateImage() {
          image360.style.backgroundImage = `url('${images[currentImage - 1]}')`;
      }

      function handleStart(e) {
          isMouseDown = true;
          startX = e.clientX || e.touches[0].clientX;
      }

      function handleMove(e) {
          if (!isMouseDown) return;

          const x = e.clientX || e.touches[0].clientX;
          const dx = x - startX;
          if (Math.abs(dx) > 5) {
              if (dx < 0) {
                  currentImage++;
                  if (currentImage > totalImages) currentImage = 1;
              } else {
                  currentImage--;
                  if (currentImage < 1) currentImage = totalImages;
              }

              updateImage();
              startX = x;
          }
      }

      function handleEnd() {
          isMouseDown = false;
      }

      image360.addEventListener('mousedown', handleStart);
      image360.addEventListener('mousemove', handleMove);
      image360.addEventListener('mouseup', handleEnd);
      image360.addEventListener('mouseleave', handleEnd);

      image360.addEventListener('touchstart', handleStart);
      image360.addEventListener('touchmove', handleMove);
      image360.addEventListener('touchend', handleEnd);
    })
    .catch(error => {
      console.error('Terjadi kesalahan dalam mengambil data JSON:', error);
    });
