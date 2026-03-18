function sendHeight() {
      const height = document.getElementById('contentWrapper').scrollHeight;
      window.parent.postMessage({ type: 'setHeight', height }, '*');
    }

    window.onload = sendHeight;
    window.onresize = sendHeight;