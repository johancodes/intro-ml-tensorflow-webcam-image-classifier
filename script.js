
/***** DERIVED FROM https://www.kirupa.com/html5/accessing_your_webcam_in_html5.htm *****/

const predictBtn = document.getElementById("predictBtn");

const stopBtn = document.getElementById("stopBtn");

const video = document.querySelector("#videoElement");

//const spacebarBtn = document.getElementById("spacebarBtn");

//Activate webcam video stream

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({video: true})
  .then(
    function (stream) {
      video.srcObject = stream;
    }
  )
  .catch(
    function (error) {
      console.log("Something is wrong!")
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

stopBtn.addEventListener('click', stop)

//Click  predictBtn to launch prediction

 predictBtn.addEventListener("click", app); //ALT: predictBtn.onclick = app

 //Hit spacebar to launch prediction (spacebar = keyCode 32; see https://keycode.info/)
 
 window.addEventListener("keydown", event => {
   if (event.keyCode === 32) {
    app(); //!!! Must use () after app unlike the predictBtn event listener -- different syntax to call the function !!!
   }
 });

//Image classifier function using MobileNet pre-trained machine learning model

const imageUsed = document.getElementById("videoElement");

async function app(input) {
    prediction = document.getElementById("classify")
    prediction.innerHTML = `Predicting...`;
    console.log("Loading mobilenet..");

    //Load the model
    const net = await mobilenet.load();
    console.log("Successfully loaded model");

    //Make a prediction through the model on our image
    const result = await net.classify(imageUsed);
    console.log(result);
    console.log(result[0].className);
    prediction.innerHTML = result[0].className + "  -  " + result[0].probability*100 + "% probability"; //push result text to html

};






/* IF FROM https://github.com/tensorflow/tfjs-models/tree/master/mobilenet

const img = document.getElementById('img');

  // Load the model.
  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(img).then(predictions => {
      console.log('Predictions: ');
      console.log(predictions);
    });
  }); */

