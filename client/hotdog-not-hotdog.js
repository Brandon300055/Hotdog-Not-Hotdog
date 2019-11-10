// import Swal from 'sweetalert2/dist/sweetalert2.js'

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

// set global variables
this.thehotdog = "";
this.blob = [];
this.type = '';
this.confidence = 0;

// show seefood input
function showSeeFood()
{

    $( "#getStarted" ).slideUp( "slow", function() {
        // Animation complete.

        console.log("Test test")
    });


    $( "#seefood" ).slideDown( "slow", function() {
        // Animation complete.

        console.log("Test test")
    });



}

function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file[0].files[0]);
    reader.onload = () => {
        callback(reader.result);
    };
}

document.getElementById("file").onchange = function() {
    upload()
};

/**
 *
 */
function upload()
{
    // get the file as a blob
    var file = $("#file")[0].files[0];
    console.log(file);

    // set the file blob to be global
    this.blob = file;

    // check if file type is png, jpg, or jpeg
    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'  )
    {
        // store the url in a temporary url
        var objectURL = URL.createObjectURL(file);

        // display the image
        document.querySelector("#image").src = objectURL;

        this.thehotdog = objectURL;

        // console log image url
        console.log(this.thehotdog);

    }
    // else no image provide

    // set image to null
    document.querySelector("#image").src = objectURL;

    // return false
    return false
}

/**
 *
 */
function seefood() {

    classifier = ml5.imageClassifier('MobileNet');
    // images/
    //lion.jpeg
    src = this.thehotdog;
    img = document.createElement('img');
    img.src = src;

    classifier.classify(img, gotResult);

}

/**
 * checks the confidence an array of lables/tags
 * @param results
 * @returns {number}
 */
function checkLable(results) {
    //check if it is a
    var confidence = 0;
    var i;

    let hotdog = 0;
    let pizza = 0;
    let notHotdog = 0;

    // let type = "Not A hotdog";

    for (i = 0; i < results.length; i++) {

        // check if label is a hot dog
        if (results[i].label === 'hotdog, hot dog, red hot' ) {

            // add confidence to hotdog
            hotdog += results[i].confidence;

        } else if (results[i].label === 'pizza, pizza pie'
        ) {
            // add confidence to big hotdog
            pizza += results[i].confidence;
        } else {
            // add up confidence to big not a hotdog
            notHotdog += results[i].confidence;
        }

    } //end for loop

    console.log("pizza");
     console.log(pizza);

    // set label based on the confidence score
    if (hotdog > pizza && hotdog > notHotdog ) {

        this.type = "Hot Dog";
        this.confidence = hotdog;

    } else if (pizza > .15) {

        this.type = "Pizza";
        this.confidence = pizza;

    } else {
        this.type = "Not Hotdog";
        this.confidence = notHotdog;
    }

    return this.score
}

// A function to run when we get any errors and the results
function gotResult(error, results) {

    // Display error in the console
    if (error) {
        console.error(error);
    } else {
        // The results are in an array ordered by confidence.
        console.log(results);

        // get the confidence
        let confidence = checkLable(results);

        console.log(confidence);

        // check swal animation popup type
        let swalType = 'success';

        if (this.type === "Not Hotdog")
        {
            swalType = 'error';
        }

        // notify of the result
        Swal.fire({
            title: this.type,
            type: swalType,
            showCloseButton: false,
            showCancelButton: false,

            confirmButtonColor: '#a40819',
            // background: '#f1f1f1 url("") ',


            focusConfirm: true,
            html:
                'I am ' +
                Math.round(this.confidence * 100) +
                '% sure!',
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Nifty!',
            confirmButtonAriaLabel: 'Nifty!',

            imageUrl: this.thehotdog,
            imageSize: '600x600',
        })

    }
}
