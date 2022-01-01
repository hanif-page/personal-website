// typing animation on my name
const typingOptions = {
    speed: 150,
    loop: true, 
    deleteSpeed: 150,
}
new TypeIt("#my-name", typingOptions)
    .pause(3000)
    .go();
new TypeIt("#my-name2", typingOptions)
    .pause(3000)
    .go();

// dark mode functionality
const colorModeToggle = document.querySelectorAll(".colorMode-toggle")
colorModeToggle.forEach(colorToggle => {
    colorToggle.addEventListener('click', function(){
        const circlesSlided = document.querySelectorAll(".circle-slided")
        circlesSlided.forEach(circleSlided => {
            circleSlided.classList.toggle("-translate-x-4")
            circleSlided.classList.toggle("translate-x-4")
        })
        const textDarks = document.querySelectorAll(".textDark")
        textDarks.forEach(textDark => {
            textDark.classList.toggle("opacity-0")
            textDark.classList.toggle("opacity-1")
        })
        const textLights = document.querySelectorAll(".textLight")
        textLights.forEach(textLight => {
            textLight.classList.toggle("opacity-0")
        })
        const vectorLights = document.querySelectorAll(".vector-light")
        vectorLights.forEach(vector => {
            vector.classList.toggle("hidden")
        })
        const vectorDarks = document.querySelectorAll(".vector-dark")
        vectorDarks.forEach(vector => {
            vector.classList.toggle("hidden")
        })

        const html = document.querySelector("html")
            html.classList.toggle("dark")
        })
})

// close modal/overlay
function closeProjectModal()
{
    projectModal.classList.remove("opened")
    document.querySelector("body").style.overflow = "auto"
}

// loading animation
window.addEventListener('load', () => {
    const body = document.querySelector("body")
    const loaderContainer = document.querySelector(".loaderContainer")

    body.classList.remove("overflow-hidden")
    loaderContainer.classList.add("opacity-0")
})