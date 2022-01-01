const projectModal = document.querySelector("#projectModal")

// open modal/overlay
async function openProjectModal(e)
{
    document.querySelector("body").style.overflow = "hidden"
    projectModal.classList.add("opened")
    
    // get the json
    const projectID = "project" + e.dataset.id
    const jsonURL = "./project-information.json"
    var projectInformation = await getAPI(jsonURL) // it will be a global variable, because it will be use more than once
    
    // get the specific project inside the json
    const projectInformationSpecific = projectInformation[projectID]

    // the overlay 
    const modalOverlay = document.querySelector("#projectModal")

    // main container with the content inside 
    const modalMainContainer = `
    <div class="w-11/12 sm:w-3/4 min-h-[60vh] max-h-[85vh] flex flex-col justify-center items-center relative lg:flex-row lg:min-h-[30vh]" data-ProjectID="${projectID}">
        <i onclick="closeProjectModal()" class="fas fa-times text-3xl text-my-white absolute -top-10 right-0 cursor-pointer hover:text-my-orange"></i>

        <div class="image-slider-container text-my-orange relative h-1/2 w-full lg:h-full lg:w-3/5">
            <i data-slide="-1" class="fas fa-chevron-right py-1 px-1 rounded bg-black bg-opacity-70 text-my-orange cursor-pointer rotate-180 absolute top-1/2 left-2 transform -translate-y-1/2 opacity-80 hover:opacity-100 text-2xl"></i>
            <span id="img-indicator" class="absolute left-1/2 bottom-1 transform -translate-x-1/2 text-base text-my-orange bg-black bg-opacity-70 py-0 px-1 rounded"><span class="currentIndicatorNumber">1</span> / ${Object.keys(projectInformationSpecific.imgSources).length /* total photos */}</span>
            <i data-slide="1" class="fas fa-chevron-right py-1 px-1 rounded bg-black bg-opacity-70 text-my-orange cursor-pointer absolute top-1/2 right-2 transform -translate-y-1/2 opacity-80 hover:opacity-100 text-2xl"></i>

            <img src="${projectInformationSpecific.imgSources.img1}" alt="Project Image" data-imgNumber="1" class="w-full h-full object-cover">
        </div>
        <div class="project-information p-4 bg-my-white h-1/2 w-full space-y-5 flex flex-col justify-center items-start lg:min-h-full lg:w-2/5 lg:justify-center dark:bg-my-black dark:text-my-white">
            <!-- header of the content -->
            <div class="">
                <h1 class="capitalize text-xl text-my-black font-bold dark:text-my-white">
                    ${projectInformationSpecific.projectName}
                </h1>
                <h2 class="capitalize text-sm text-[#AAAAAA]">
                    ${projectInformationSpecific.dateFinish}              
                </h2>
            </div>

            <!-- project description -->
            <p class="text-my-black text-xs sm:text-sm md:text-base dark:text-my-white">
                <!-- it can only fit well with 25 word (lorem25) -->
                ${projectInformationSpecific.projectDesc}
            </p>

            <!-- several link -->
            <div class="">
                <a href="${projectInformationSpecific.liveWebLink}" target="_blank" class="hover:opacity-50 flex items-center justify-start space-x-2">
                    <i class="fas fa-link text-lg"></i>
                    <span class="capitalize underline text-sm">live website</span>
                </a>
                <a href="${projectInformationSpecific.githubRepoLink}" target="_blank" class="hover:opacity-50 flex items-center justify-start space-x-2 mt-0.5">
                    <i class="fab fa-github text-lg"></i>
                    <span class="capitalize underline text-sm">source code / contribute</span>
                </a>
            </div>

        </div>
    </div>
    ` 
    // renew the display
    modalOverlay.innerHTML = modalMainContainer;


    // slide button functionality
    const slideButtons = document.querySelectorAll("[data-slide]")
    slideButtons.forEach(slideBtn => {
        slideBtn.addEventListener('click', async function() {
            // offset => use for change the image number 
            let offSet = +slideBtn.dataset.slide // -1 or 1

            // get image element (first get parent element, then querySelector for 'img' element)
            let parentContainer = this.parentElement
            let imgElement = parentContainer.querySelector("img")   
            let numberIndicator = parentContainer.querySelector(".currentIndicatorNumber")
            let maxNumberIndicator = parentContainer.querySelector(".maxIndicatorNumber")
            
            // get the parent element data-projectID value
            let projectID = parentContainer.parentElement.dataset.projectid

            // get the image element data-imgNumber (so, it will be the current image number)
            let currentImgNumber = +imgElement.dataset.imgnumber      

            // imgNumber after getting change by the offset
            let newImgNumber = currentImgNumber + offSet

            // count the length of the object property
            const imagesMaxLength = Object.keys(projectInformation[projectID].imgSources).length // get the size of the imageSources object

            // filter the number, on few condition
            if(newImgNumber < 1) newImgNumber = imagesMaxLength;
            else if (newImgNumber > imagesMaxLength) newImgNumber = 1;

            // renew the actual dataset 
            imgElement.dataset.imgnumber = newImgNumber;

            // get the new image source from the json  
            const newImageSrc = projectInformation[projectID].imgSources[`img${newImgNumber}`] // use the same variable (projectInformation)
            
            // change the image source and the number indicator
            imgElement.src = newImageSrc
            numberIndicator.innerText = newImgNumber
        })
    })
}

const getAPI = async (src) => {
    return await fetch(src)
                    .then(async res => await res.json())
                    .then(async res => await res)
                    .catch(async err => await err)
}