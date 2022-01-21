
function loadServiceWorker(file, cb) {
    if(navigator.serviceWorker) {
        navigator.serviceWorker.register(file)
          .then(reg => {
                cb(reg)
          })
          .catch(err => {
                console.error(`Failed to register sw (${err})`);
          });
    }
}

loadServiceWorker("/sw.js", () => {})
