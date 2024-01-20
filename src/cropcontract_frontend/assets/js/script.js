// menu navigation
function highlightMenu(id) {
    // deactivate all menu items
    for (var i = 1; i <= 6; i++) {
        var menu = document.getElementById("link" + i);
        menu.classList.remove("active");
    }

    // activate clicked menu
    var menu = document.getElementById("link" + id);
    menu.classList.add("active");
    // menu.style.color = "#f2b31a ";
    // menu.style.display = "none";

    console.log("Section " + id);

    // update body content
    var body_content = document.getElementById("body_content");
    if (id === "1") {
        body_content.innerHTML = homeData;
    } else if (id === "2") {
        body_content.innerHTML = contract_data;
    } else if (id === "3") {
        body_content.innerHTML = my_contract_data;
    } else if (id === "4") {
        body_content.innerHTML = crop_analyser_data;
    } else if (id === "5") {
        body_content.innerHTML = my_details;
    } else if (id === "6") {
        body_content.innerHTML = farmers_data;
    }
}

// homeData contract_data crop_analyser_data my_details 

// Login Listener 
function handleLoginEvent(data) {
   console.log('Login was successful', data);
   highlightMenu("6");
   //document.getElementById("login").style.display = "none";
   document.getElementById("show_section1").style.display = "none";
  
    //show all the other menu buttons
    document.getElementById("show_section2").style.display = "block";
    document.getElementById("show_section3").style.display = "block";
    document.getElementById("show_section4").style.display = "block";
    document.getElementById("show_section5").style.display = "block";
    document.getElementById("show_section6").style.display = "block";
    
    // Attach the click event listener to the button
document.getElementById("show_section1").addEventListener("click", function () {
    highlightMenu("1");
});
document.getElementById("show_section2").addEventListener("click", function () {
    highlightMenu("2");
});
document.getElementById("show_section3").addEventListener("click", function () {
    highlightMenu("3");
});
document.getElementById("show_section4").addEventListener("click", function () {
    highlightMenu("4");
    
    document.getElementById("submitImage").addEventListener("click", function () {
        submitImage();
    });
});

document.getElementById("show_section5").addEventListener("click", function () {
    highlightMenu("5");
});


document.getElementById("show_section6").addEventListener("click", function () {
    highlightMenu("6");
});

}

function submitImage() {
    document.getElementById("submitImage").innerHTML = "Uploading...";
    var input = document.getElementById("cropImage");
    var selectedImage = input.files[0];

    if (selectedImage) {
      var formData = new FormData();
      formData.append("image", selectedImage);

      // Send the selected image to the server using Fetch API
      fetch("https://endpoint.emmanuelhaggai.com/agri-forex/defect-api-v3/", {
        method: "POST",
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        // Handle server response 
          var outputDiv = document.getElementById("outputdiv");
          outputDiv.innerHTML = data;
          document.getElementById("submitImage").innerHTML = "Upload";
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("submitImage").innerHTML = "Upload";
      });
    } else {
      alert("Please select an image.");
      document.getElementById("submitImage").innerHTML = "Upload";
    }
  }


function convertImageToBase64() {
    var input = document.getElementById("cropImage");

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var base64String = e.target.result;

            // Log or use the base64String as needed
            console.log("Base64 String:", base64String);
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        console.log("Please select an image");
    }
}

var homeData = `
<section class="section bg-gradient half-home" id="section1" style="display: block;"> 
        <div class="home-center">
            <div class="home-desc-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="text-center">
                                <h1 class="text-white home-title mb-0">Agri-Forex: Empowering Farmers, Disrupting
                                    Middlemen</h1>
                                <p class="text-white home-subtitle-center home-subtitle mt-4 mb-0 mx-auto">
                                    Revolutionizing Agriculture with Direct Farm Produce Contracts on the Internet
                                    Computer.</p>
                                <div class="mt-4">
                                    <button id="login" class="btn btn-outline-white btn-round"> Log in with Internet
                                        Identity</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
`;

var contract_data = `
<section class="section bg-light" id="section2"> 
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-xl-6 col-10">
                    <div class="text-center">
                        <h3 class="title">All <span class="fw-bold">Contracts</span></h3>
                    </div>
                </div>
            </div>
            
            <div class="row mt-5">
                <div class="col-lg-3">
                    <div class="text-left bg-white contract-box mt-1 active p-1">
                        <div class="contract-details">
                            <p class="fw-bold mb-0 mt-1">Contract : 79080809</p>
                            <p class="mb-0">Crop Name: Maize</p>
                            <p class="mb-0">Duration: 90 days</p>
                            <p class="mb-0">Price per Unit: KES 150 per kg</p>
                            <p class="text-muted">Terms and Conditions: Organic farming practices, regular progress
                                updates</p>
                        </div>
                        <div>
                            <a href="" class="btn btn-primary btn-sm">Accept Contract</a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="text-left bg-white contract-box mt-1 active p-1">
                        <div class="contract-details">
                            <p class="fw-bold mb-0 mt-1">Contract : 79080809</p>
                            <p class="mb-0">Crop Name: Maize</p>
                            <p class="mb-0">Duration: 90 days</p>
                            <p class="mb-0">Price per Unit: KES 150 per kg</p>
                            <p class="text-muted">Terms and Conditions: Organic farming practices, regular progress
                                updates</p>
                        </div>
                        <div>
                            <a href="" class="btn btn-primary btn-sm">Accept Contract</a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="text-left bg-white contract-box mt-1 active p-1">
                        <div class="contract-details">
                            <p class="fw-bold mb-0 mt-1">Contract : 79080809</p>
                            <p class="mb-0">Crop Name: Maize</p>
                            <p class="mb-0">Duration: 90 days</p>
                            <p class="mb-0">Price per Unit: KES 150 per kg</p>
                            <p class="text-muted">Terms and Conditions: Organic farming practices, regular progress
                                updates</p>
                        </div>
                        <div>
                            <a href="" class="btn btn-primary btn-sm">Accept Contract</a>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="text-left bg-white contract-box mt-1 active p-1">
                        <div class="contracts-list">
                            <p class="fw-bold mb-0 mt-1">Contract : 79080809</p>
                            <p class="mb-0">Crop Name: Maize</p>
                            <p class="mb-0">Duration: 90 days</p>
                            <p class="mb-0">Price per Unit: KES 150 per kg</p>
                            <p class="text-muted">Terms and Conditions: Organic farming practices, regular progress
                                updates</p>
                        </div>
                        <div>
                            <a href="" class="btn btn-primary btn-sm">Accept Contract</a>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
    </section>
`;



var my_contract_data = `
<section class="section bg-light" id="section2"> 
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-xl-6 col-10">
                    <div class="text-center">
                        <h3 class="title">My <span class="fw-bold">Contracts</span></h3>
                    </div>
                </div>
            </div>
            
            <div class="row mt-5">
                <div class="col-lg-3">
                    <div class="text-left bg-white contract-box mt-1 active p-1">
                        <div class="contract-details">
                            <p class="fw-bold mb-0 mt-1">Contract : 79080809</p>
                            <p class="mb-0">Crop Name: Maize</p>
                            <p class="mb-0">Duration: 20 days</p>
                            <p class="mb-0">Price per Unit: KES 190 per kg</p>
                            <p class="text-muted">Terms and Conditions: Organic farming practices, regular progress
                                updates</p>
                        </div>
                        
                    </div>
                </div>


                <div class="col-lg-3">
                    <div class="text-left bg-white contract-box mt-1 active p-1">
                        <div class="contract-details">
                            <p class="fw-bold mb-0 mt-1">Contract : 79080809</p>
                            <p class="mb-0">Crop Name: Maize</p>
                            <p class="mb-0">Duration: 100 days</p>
                            <p class="mb-0">Price per Unit: KES 120 per kg</p>
                            <p class="text-muted">Terms and Conditions: Organic farming practices, regular progress
                                updates</p>
                        </div>
                        
                    </div>
                </div>

                <div class="col-lg-3">
                    <div class="text-left bg-white contract-box mt-1 active p-1">
                        <div class="contracts-list">
                            <p class="fw-bold mb-0 mt-1">Contract : 79080809</p>
                            <p class="mb-0">Crop Name: Maize</p>
                            <p class="mb-0">Duration: 90 days</p>
                            <p class="mb-0">Price per Unit: KES 150 per kg</p>
                            <p class="text-muted">Terms and Conditions: Organic farming practices, regular progress
                                updates</p>
                        </div>
                        
                    </div>
                </div>
                
            </div>
            
        </div>
    </section>
`;

var crop_analyser_data = `
<section class="section" id="section4"> 
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-xl-12 col-10">
                    <div class="text-center">
                        <h3 class="title"><span class="fw-bold">AI Crop Analyzer</span></h3>
                        <p> 
                            This inteligent crop health analyser provides real-time diagnostics for 
                            plants though a simple image upload. Detect potential issues early, receive 
                            tailored recommendations, and empower your fields with the proactive care they 
                            deserve. Elevate your farming experience with the Agri-Forex crop analyser tool- 
                            cultivating a future of thriving crops and sustainable yields.
                        </p>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="text-center0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group mt-2">
                                    <input type="file" id="cropImage" name="cropImage" class="form-control" accept="image/*">
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="form-group mt-2">
                                    <a id="submitImage" class="btn btn-primary col-lg-12">Upload</a>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row pt-5 justify-content-center" id="outputdiv">
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
`;

var my_details = `
<section class="section " id="section5">
        <div class="container">

            <div class="row justify-content-center mt-4">
                <div class="col-xl-6 col-10">
                    <div class="text-center">
                        <h3 class="title">My <span class="fw-bold">Profile</span></h3>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-4">
                    <div class="mt-4 pt-4">
                        <h5> Personal Information </h5>
                        <div class="text-muted"> <span class="fw-bold ">Name:</span> Emmanuel Haggai </div>
                        <div class="text-muted"> <span class="fw-bold ">Email:</span> admin@emmanuelhaggai.com </div>
                        <div class="text-muted"> <span class="fw-bold ">Location:</span> Nairobi, Kenya </div>
                    </div>

                    <div class="mt-4 pt-4">
                        <h5> Farm Details </h5>
                        <div class="text-muted"> <span class="fw-bold ">Farm Name:</span> Green Fields Farm </div>
                        <div class="text-muted"> <span class="fw-bold ">Location:</span> Nairobi, Kenya </div>
                        <div class="text-muted"> <span class="fw-bold ">GPS Coordinates:</span> (34.647°E to 34.694°E)
                        </div>
                        <div class="text-muted"> <span class="fw-bold ">Main Crops:</span> Maize, Beans, Wheat </div>
                    </div>
                </div>

                <div class="col-lg-8">
                    <div class="myprofile-form mt-4 pt-4">
                        <h5> Edit Personal Information </h5>
                        <form method="post" name="myProfileForm">
                            <p id="error-msg"></p>
                            <div id="simple-msg"></div>
                            <div class="row">

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="name"> Name: </label>
                                        <input name="name" id="name" type="text" value="Emmanuel Haggai"
                                            class="form-control" placeholder="Your name*">
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="email"> Your email: </label>
                                        <input name="email" id="email" value="admin@emmanuelhaggai.com" type="email"
                                            class="form-control" placeholder="Your email*">
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-lg-12 text-end">
                                    <input type="submit" id="submit" name="send"
                                        class="submitBnt btn btn-primary col-lg-12" value="Edit Personal Details">
                                    <div id="simple-msg2"></div>
                                </div>
                            </div>

                        </form>

                        <form class="farm-form mt-4 pt-4">

                            <h5> Edit Farm Details </h5>

                            <div class="row">

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="farmname"> Farm Name: </label>
                                        <input name="name" id="farmname" type="text" value="Green Fields Farm"
                                            class="form-control" placeholder="Your farms name*">
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="farmLocation"> Location: </label>
                                        <input name="email" id="farmLocation" value="Nairobi, Kenya" type="text"
                                            class="form-control" placeholder="Your email*">
                                    </div>
                                </div>

                            </div>

                            <div class="row">

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="gps"> GPS Coordinates: </label>
                                        <input name="name" id="gps" type="text" value="(34.647°E to 34.694°E)"
                                            class="form-control"
                                            placeholder="GPS Coordinates e.g (34.647°E to 34.694°E)">
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label for="mainCrops"> Main Crops: </label>
                                        <input name="mainCrops" id="farmLocation" value="Maize, Beans, Wheat"
                                            type="text" class="form-control" placeholder="Main Crops">
                                    </div>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-lg-12 text-end">
                                    <input type="submit" id="submit" name="send"
                                        class="submitBnt btn btn-primary col-lg-12" value="Edit Farm Details">
                                    <div id="simple-msg"></div>
                                </div>
                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    </section>
`;

var farmers_data = `
<section class="section bg-light" id="farmers">
        <div class="container">
            <div class="row justify-content-center mt-5">
                <div class="col-xl-6 col-10">
                    <div class="text-center">
                        <h3 class="title"><span class="fw-bold">Empowering Farmers with Technology</span></h3>
                        <p class="text-muted mt-3 title-subtitle mx-auto">
                            Explore cutting-edge agriculture with our AI Crop Diagnostic Tool. We offer advanced solutions for farmers, leveraging artificial intelligence to diagnose crop health. Join us in supporting your favorite farmers by making donations – together, we're cultivating a resilient and sustainable future for agriculture.
                        </p>
                    </div>
                </div>
           
            </div>
          
            <div class="row mt-5">
                <div class="col-lg-4">
                    <div class="text-center bg-white farmers-box mt-3 p-5">
                        <div>
                            <img src="farmer2.jpeg" alt="" class="img-fluid rounded-circle mx-auto d-block">
                        </div>
                        <div class="farmers-name">
                            <p class="fw-bold mb-0 mt-4">Mwangi Kariuki</p>
                            <p class="text-muted mt-4">
                            Location: Nyeri County <br>
                            Farm Focus: Avocado Orchard
                                </p>
                        </div>
                        <div>
                            <a class="btn btn-round btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#icpWalletModal">Donate ICPs</a>
                        </div>
                    </div>
                </div>
              
                <div class="col-lg-4">
                    <div class="text-center bg-white farmers-box mt-3 active p-5">
                        <div class="">
                            <img src="f1.jpg" alt="" class="img-fluid rounded-circle mx-auto d-block">
                        </div>
                        <div class="farmers-name">
                            <p class="fw-bold mb-0 mt-4">Rajabu Maina</p>
                            <p class="text-muted mt-4">
                            	Location: Kisumu County <br>
				Farm Focus: Tea Plantation
                            </p>
                        </div>
                        <div>
                            <a class="btn btn-round btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#icpWalletModal">Donate ICPs</a>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-4">
                    <div class="text-center bg-white farmers-box mt-3 p-5">
                        <div>
                            <img src="f2.jpg" alt="" class="img-fluid rounded-circle mx-auto d-block">
                        </div>
                        <div class="farmers-name">
                            <p class="fw-bold mb-0 mt-4">Njoroge Kimani</p>
                            <p class="text-muted mt-4">
                            Location: Nakuru County <br>
Farm Focus: Maize and Wheat Farming
                                </p>
                        </div>
                        <div>
                            <a class="btn btn-round btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#icpWalletModal">Donate ICPs</a>
                        </div>
                    </div>
                </div>
              
            </div>
           
        </div>
    </section>
 `;
