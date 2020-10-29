/***** DERIVED FROM https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm *****/

const predictBtn = document.getElementById("predictBtn");

const stopBtn = document.getElementById("stopBtn");

const video = document.querySelector("#videoElement");


//Activate webcam video stream

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia(
    {
      video: true,
      video: {
        facingMode: { exact: "environment" } //force app to only use rear-facing cam. See https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      }
    }
    )
  .then(
    function (stream) {
      video.srcObject = stream;
    }
  )
  .catch(
    function (error) {
      console.log("Something is wrong! No rear cam detected")
    }
  )
};

//Stop webcam video stream

function stop(e) {
  const stream = video.srcObject;
  const tracks = stream.getTracks();
  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    track.stop();
  }
  video.srcObject = null;
}

//stopBtn event listener

stopBtn.addEventListener('click', stop);

//Click  predictBtn to launch prediction

 predictBtn.addEventListener("click", app); //ALT: predictBtn.onclick = app

//Image classifier function using MobileNet pre-trained machine learning model

const imageUsed = document.getElementById("videoElement");

async function app(input) {
    prediction = document.getElementById("classify")
    prediction.innerHTML = `Predicting...`;
    console.log("Loading mobilenet..");

    //Load the model
    const net = await mobilenet.load();
    console.log("Successfully loaded model");

    //Make a prediction on our image through the model
    const result = await net.classify(imageUsed);
    console.log(result);
    console.log(result[0].className);
    prediction.innerHTML = result[0].className + "  -  " + result[0].probability*100 + "% probability"; //push result text to html

};


