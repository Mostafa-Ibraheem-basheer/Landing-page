// Build menu with anchors in each li that refrerences each section
const navList = document.querySelector('ul');
let sections = []; //array to store sections name
let numOfSections = document.querySelectorAll('.landing__container'); //list of divs for each section
const fragment = document.createDocumentFragment();
for (let i = 0; i< numOfSections.length; i++){
    sections[i] = numOfSections[i].parentElement.dataset.nav;
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.textContent = sections[i];
    anchor.href = '#'+ numOfSections[i].parentElement.id; // the # to use it as id
    anchor.className = sections[i]
    li.appendChild(anchor);    
    fragment.appendChild(li) //we use the doc fragment to append all list items to it and then apend them to the DOM once
}
navList.appendChild(fragment); //one reflow rather than 4!

const navItems = document.querySelectorAll('a'); //list to store all anchors after being built
const header = document.querySelector('.page__header');
const btn = document.querySelector('#up-btn');
const title = document.querySelector('h1');
const pageHeight = document.documentElement.scrollHeight; // get the entire height of the page
// Scroll to section on link click
navList.addEventListener('click',function scrollToSection(evt){//we use the parent node so we don't have to make listeners for each anchor
    evt.preventDefault();
    const reference = document.querySelector(evt.target.getAttribute('href')); //we can access each anchor with the .target
    reference.scrollIntoView({behavior: 'smooth', block: 'end' , inline: 'nearest'});
});
// Scroll to the top of the page on click
btn.addEventListener('click',function scrollToTop(){
    title.scrollIntoView({behavior: 'smooth', block: 'end' , inline: 'nearest'});
});

// Set sections as active
document.addEventListener('scroll',function activeSection(){
    if (pageHeight/2 <= scrollY){ // if the user scrolls to more than half of the page the button appears
        btn.style.opacity = '0.5';
    }
    else{// hide the bytton when he returns to the upperside of the page
        btn.style.opacity = '0';
    }
    for (let i = 0; i<numOfSections.length; i++){//loops over all sections to see which one is in the viewport
        if(numOfSections[i].getBoundingClientRect().top <=250 && numOfSections[i].getBoundingClientRect().top >= -250){//when the section has these values its highlighted
            numOfSections[i].parentElement.className = 'your-active-class';
            navItems[i].style.cssText= 'padding: 0.5em; border-bottom: 2px solid; border-color: #fff; transition: 0.3s linear;';//to highlight the anchor with the highlighted section
        }
        else {//when the section is no longer in display we remove the highlights
            numOfSections[i].parentElement.className = '';
            navItems[i].style.cssText = '';
        }
    }
  });
