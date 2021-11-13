const data = JSON.stringify({
    "usr": "hallo",
    "pwd": "1234"
  });
  
  const xhr = new XMLHttpRequest();
  //xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "http://192.168.2.135/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);