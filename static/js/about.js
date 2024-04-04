//change navbar colour
Shery.mouseFollower();
Shery.makeMagnet('.magnet')


window.addEventListener('scroll', () =>{
    document.querySelector('nav').classList.toggle
    ('window-scroll',window.scrollY > 0)
})

//show hide faq
const faqs =document.querySelectorAll('.faq');

faqs.forEach(faq => {
    faq.addEventListener('click', () =>{
        faq.classList.toggle('open');

        //change icon crow vro
        const icon =faq.querySelector('.faq__icon i');
        if(icon.className==='uil uil-plus'){
            icon.className='uil uil-minus'
        }else{
            icon.className='uil uil-plus'
        }
    })
}
)

//show/hide menu

const menu=document.querySelector(".nav__menu");
const menuBtn=document.querySelector("#open-menu-btn");
const closeBtn=document.querySelector("#close-menu-btn");

menuBtn.addEventListener('click', ()=>{
    menu.style.display="flex";
    closeBtn.style.display="inline-block";
    menuBtn.style.display="none";
})

//closenav menu

const closeNav=()=>{
    menu.style.display="none";
    closeBtn.style.display="none";
    menuBtn.style.display="inline-block";
}

closeBtn.addEventListener('click', closeNav)


//Animation Scroll
const observer = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else
            entry.target.classList.remove('show');
    });
});

{const categoryElements = document.querySelectorAll('.category');
categoryElements.forEach((el) => observer.observe(el));

const departmentElements = document.querySelectorAll('.department');
departmentElements.forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", function() {
    // Check if the animation should be applied based on user preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

    // Get all elements with the 'department' class
    const departmentElements = document.querySelectorAll('.department');

    // Apply animation styles only if prefers-reduced-motion is true
    if (prefersReducedMotion) {
        // Apply the 'animate-once' class to the first department element
        departmentElements[0].classList.add('animate-once');
    }
});