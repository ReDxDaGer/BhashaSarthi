Shery.mouseFollower();
Shery.makeMagnet('.magnet');

function bttnAnimation(){
    gsap.from(".btn a",{
        y:200,
        opacity:0,
        delay:1.5,
        duration:0.5,  
})}
function navAnimation(){
    gsap.from('.hide',{
        y:-100,
        opacity:0,
        delay:1,
        duration:0.3
    })
}
function cardAnimation(){
    gsap.from('.team__member-image',{
        scale:0,
        ease:"elastic.out(0.6,0.5)",
        opacity:0,
        delay:1.5,
        duration:1.3,
        stagger:0.1
    })
    gsap.from('.team__member-info',{
        scale:0,
        ease:"elastic.out(0.6,0.5)",
        opacity:0,
        delay:1.5,
        duration:1.3,
        stagger:0.1
    })
}
function h1Animation(){
    gsap.from("#page1 h1",{
        y:0,
        opacity:1,
        delay:1,
        duration:0.5,    
        stagger:0.3
    })}
function inputCardAnimation(){
    gsap.from('.slider',{
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.6
    })
}
function inputBoxAnimationm(){
    gsap.from('.input-container',{
        x:-100,
        opacity:0,
        delay:0.8,
        duration:0.6
    })
}
function inputBoxAnimationm2(){
    gsap.from('.input-container2',{
        x:100,
        delay:0.8,
        opacity:0,
        duration:0.6
    })
}
function translateButtonAnimation(){
    gsap.from('#btn-container',{
        // y:100,
        delay:0.8,
        duration:0.8,
        // opacity:0,
        scale:0
    })
}
function dropDownAnimation(){
    gsap.from('.dropdown1',{
        x:-100,
        duration:1.6,
        delay:0.8,
        opacity:0
    })
    gsap.from('.dropdown',{
        x:100,
        duration:1.6,
        delay:0.8,
        opacity:0
    })
}
const dropdowns = document.querySelectorAll(".dropdown")
const dropdown1 = document.querySelectorAll(".dropdown1")


dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector(".select")
    const caret = dropdown.querySelector(".caret")
    const menu = dropdown.querySelector(".menu")
    const options = dropdown.querySelectorAll(".menu li")
    const selected = dropdown.querySelectorAll(".selected")

    select.addEventListener('click',() => {
        select.classList.toggle("select-clicked");
        caret.classList.toggle("caret-rotate")
        menu.classList.toggle("menu-open")
    });
    options.forEach(option => {
        option.addEventListener('click',() => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove("caret-rotate");
            menu.classList.remove("menu-open");
            options.forEach(option => {
                option.classList.remove('active');
            });
            option.classList.add('active');
        });
    });
});



dropDownAnimation();
translateButtonAnimation();
cardAnimation();
navAnimation();
bttnAnimation();

h1Animation();
inputBoxAnimationm();
inputBoxAnimationm2();