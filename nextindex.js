document.addEventListener('DOMContentLoaded', function() {
  var style = document.createElement('style');
  style.innerHTML = `
    [id^="visual"] {
        height: 0;
        padding-bottom: 66.67%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        cursor: ew-resize;
        position: relative;
        filter: brightness(125%) contrast(90%) saturate(100%) blur(0px) hue-rotate(0deg);
    }

    @media (max-width: 767px) {
        [id^="visual"] {
            max-width: 100%;
            padding-bottom: 66.67%;
        }
    }

    [id^="visual"] {
        padding: 31%;
    }
  `;
  document.head.appendChild(style);

  function fetchDataAndHandleEvents(elementId, jsonUrl) {
    const element = document.getElementById(elementId);
    const totalImages = 48;
    let currentImage = 1;

    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        const images = data.images;

        element.style.backgroundImage = `url('${images[currentImage - 1]}')`;

        let isMouseDown = false;
        let startX;

        function updateImage() {
          element.style.backgroundImage = `url('${images[currentImage - 1]}')`;
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

        element.addEventListener('mousedown', handleStart);
        element.addEventListener('mousemove', handleMove);
        element.addEventListener('mouseup', handleEnd);
        element.addEventListener('mouseleave', handleEnd);

        element.addEventListener('touchstart', handleStart);
        element.addEventListener('touchmove', handleMove);
        element.addEventListener('touchend', handleEnd);
      })
      .catch(error => {
        console.error(`Terjadi kesalahan dalam mengambil data JSON (${elementId}):`, error);
      });
  }

  fetchDataAndHandleEvents('visual1', 'https://cdn.jsdelivr.net/gh/fesaone/streetfighterv4sp2@main/SFV4S_RED.json');
  fetchDataAndHandleEvents('visual2', 'https://cdn.jsdelivr.net/gh/fesaone/streetfighterv4sp2@main/SFV4.json');
  fetchDataAndHandleEvents('visual3', 'https://cdn.jsdelivr.net/gh/fesaone/streetfighterv4sp2@main/SFV4_SP2.json');
});
