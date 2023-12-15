'use strict'

// 문서에 있는 element에 있는 요소를 받아온다.
// --> document.querySelector('element Selecter');
const navBar = document.querySelector('#navbar');
const navBarHeight = navBar.getBoundingClientRect().height;

// document에 원하는 event를 더하기 위해 Evert Listener 함수를 등록한다.
// 스크롤이 되면 등록된 함수를 호출한다.
// --> document.addEventListener('event name', function(){
//          원하는 동작
//      })
document.addEventListener('scroll', function() {
    // console.log(window.scrollY);
    console.log(`navBarHeight : ${navBarHeight}`);

    if (window.scrollY > navBarHeight) {
        navBar.classList.add('navbar--dark');
    } else {
        navBar.classList.remove('navbar--dark');
    }
});


// dataset에 우리가 정의한 변수들이 다 할당되어 진다.
const navMenu = document.querySelector('.navbar__menu');

// click하면 parameter에 클릭한 이벤트가 들어오게 된다.
navMenu.addEventListener('click', function(event){

    // 클릭한 event의 target 출력
    // dataset : 우리가 정의한 변수들이 다 할당되어 진다.
    // Currently undefined is displayed because 'data' is not put in the navbar.
    // console.log(event.target.dataset.link);
 
    const target = event.target;
    const link = target.dataset.link;

    // 우리가 원하는 data가 아닌 경우를 빨리 확인한 다음에 함수를 리턴하고 
    // 더 이상 밑에있는 코드가 실행이 되지 않도록 리턴이 되기 때문에 
    // link가 있는 경우에만 아래 if문이 실행이 된다.
    if(link == null) {
        return;
    }
    console.log(event.target.dataset.link);

    // const scrollTo = document.querySelector(link);
    // scrollTo.scrollIntoView({behavior: 'smooth'});

    // mediaQuery일때 경우
    navMenu.classList.remove('open');

    scrollIntoView(link);
});

// Navbar toggle button for small screen

const navbarTobbleBtn = document.querySelector('.navbar__toggle-btn');

navbarTobbleBtn.addEventListener('click', function(){
   navMenu.classList.toggle('open');
});



// Handle click on "contact me!"  button on home.
const homeContactbtn = document.querySelector('.home__contact');

homeContactbtn.addEventListener('click' , function(event){
    
    // const scrollTo = document.querySelector('#contact');
    // scrollTo.scrollIntoView({behavior: 'smooth'});
    scrollIntoView('#contact');
});

// Make home slowly fade to  transparent as3 the window scolls down.
const home = document.querySelector('.home_inner');
const homeHeight = home.getBoundingClientRect().height;

// scroll이 되면 원하는 함수를 호출해달라는 event Listener
document.addEventListener('scroll' , function(){    
    // console.log(homeHeight);
    // 1 - (window.scrollY / homeHight)
    // 1 - (0 / 552) =  1 (완전붗투명)
    // 1 - (276 / 552) = 0.5
    // 1 - (552 / 552) = 0

    home.style.opacity = 1 - (window.scrollY / homeHeight); 
});

// show "arrow up" button when scrolling down.
// display인 경우 완전히 없어졌다가 나타나는거기 때문에 애니메이션이 안된다.
const arrowUp = document.querySelector('.arrow-up');

document.addEventListener('scroll', function(){
    
    if(window.scrollY > (homeHeight / 2)) {
        arrowUp.classList.add('visiable');  
    } else {
        arrowUp.classList.remove('visiable');   
    }    
});

// handle click on the "arrow up" button
arrowUp.addEventListener('click', function(){
    scrollIntoView('#home');
});

// projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');

// 총 project가 6개니까 이 요소가 담긴 배열이 projects에 할당이 된다.
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', function(e){

    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    console.log(filter);
    // filter가 null이면 아무것도 아무것도 하지 않을것이다.
    if(filter == null) {
        return;
    }

    // Remove selection from previous item and select the new one.
    const active = document.querySelector('.categories__btn.active');
    active.classList.remove('active');

    // 지금 클릭된것이 button이면 그대로 e.target을 쓰고
    // 아닐경우 span의 parentNode는 button이니까
    // button을 쓴다는 의미이다.
    // 조건 ? true실행 | false실행
    const target = // 항상 target은 button만 할당 
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    e.target.classList.add('active');

    // 일단 porojets 안보이게 한다.
    // projects array의 아이템을 forEach 하나당 각각 번갈아 가면서 처리
    // forEach는 for(let project of projects) 와 같다.
    // forEach는 for(let i=0; i<projects.length; i++)
    projectContainer.classList.add('animation-out');

    // timeout이 되면 우리가 등록한 함수를 불러달라
    setTimeout(() => {

        projects.forEach((project) => {
            console.log(project.dataset.type);
            
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });

        projectContainer.classList.remove('animation-out');
    }, 300);

    // for(let project of projects) {
    //     console.log(project);
    // }
    // 
    // let project;
    // for(let i = 0; i < projects.length; i++) {
    //     project = projects[i];
    //     console.log(project);
    // }


});









// 사용자 정의 유틸리티 함수
// 중복되는 메소드를 함수로 만들어서 중복코드 작성하지 않도록한다.
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}



