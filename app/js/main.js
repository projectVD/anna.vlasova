// App setings

const app = {
  pages: [],
  show: new Event('show'),
  init: function() {
    app.pages = document.querySelectorAll('.page');
    app.pages.forEach(pg => {
      pg.addEventListener('show', app.pageShown);
    })

    document.querySelectorAll('.active-link').forEach(link => {
      link.addEventListener('click', app.nav);
    })

    history.replaceState({}, 'portfolio', '#portfolio');
    window.addEventListener('popstate', app.poppin);
  },
  nav: function(e) {
    e.preventDefault();
    
    const loadPage = document.querySelector('.load-page');
    const mainScreen = document.querySelector('#main');


    hideBurgerMenu();
    loadPageShow();
    setTimeout(activePage, 2500);
    setTimeout(goTop, 2500);
    setTimeout(loadPageHide, 5000);
    
    function activePage() {
      let currentPage = e.target.getAttribute('data-target');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(currentPage).classList.add('active');
      history.pushState({}, currentPage, `#${currentPage}`);
      document.getElementById(currentPage).dispatchEvent(app.show);
    }
    
    function loadPageShow() {
      loadPage.classList.add('load-page-active');
    }

    function loadPageHide() {
      loadPage.classList.remove('load-page-active');
    }

    function goTop() {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
  },
  pageShown: function(e) {
    let headerLink = document.querySelectorAll('.nav-link');
    let headerItems = document.querySelectorAll('.menu__items');
    let aboutPage = document.querySelector('.about');
    
    if (aboutPage.classList[2] == 'active') {
      headerLink.forEach(link => {
        link.style.color = '#2B2B2B'
      });
      headerItems[1].style.borderBottom = '1px solid #2B2B2B'
    } else {
      headerLink.forEach(link => {
        link.style.color = '#FCF9F5'
      });
      headerItems[1].style.borderBottom = '1px solid transparent'
      headerItems[0].style.borderBottom = '1px solid #FCF9F5'
    }

  },
  poppin: function(e) {
    // console.log(location.hash, 'popstate event');
    let hash = location.hash.replace('#', '')
    document.querySelector('.active').classList.remove('active');
    document.getElementById(hash).classList.add('active');
    document.getElementById(hash).dispatchEvent(app.show);
  }
}

document.addEventListener('DOMContentLoaded', app.init);



// Cursor setting

let mouseCursor = document.querySelector('.cursor');
let pageLinks = document.querySelectorAll('a');
let pageImg = document.querySelectorAll('img');
// let portfolioCard = document.querySelectorAll('.portfolio__items');

window.addEventListener('mousemove', cursor);

function cursor(e) {
  // mouseCursor.style.top = e.pageY + 'px';
  // mouseCursor.style.left = e.pageX + 'px';

  const x = e.clientX;
  const y = e.clientY;
  
  mouseCursor.style.transform = `translate(${x - 8}px , ${y - 8}px)`;
}

pageLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    mouseCursor.style.padding = '16px'
  });

  link.addEventListener('mouseleave', () => {
    mouseCursor.style.padding = '8px'
  });
});

pageImg.forEach(img => {
  img.addEventListener('mouseover', () => {
    mouseCursor.style.mixBlendMode = 'normal'
  });

  img.addEventListener('mouseleave', () => {
    mouseCursor.style.mixBlendMode = 'difference'
  });
})



// smoot scroll

Scrollbar.init(document.querySelector('.scroll-portfolio'), {
  damping: 0.05,
});

Scrollbar.init(document.querySelector('.scroll-portraits'), {
  damping: 0.05,
});

Scrollbar.init(document.querySelector('.scroll-fashion'), {
  damping: 0.05,
});

Scrollbar.init(document.querySelector('.scroll-stage'), {
  damping: 0.05,
});

Scrollbar.init(document.querySelector('.scroll-media'), {
  damping: 0.05,
});

Scrollbar.init(document.querySelector('.scroll-bueauty'), {
  damping: 0.05,
});







// Portfoli card animations
const portfolioItems = document.querySelectorAll('.portfolio__items');

portfolioItems.forEach(items => {
  items.addEventListener('mousemove', function() {
    const text = this.querySelector('.items-title');
    text.style.transform = 'translateY(20px)';
  });

  items.addEventListener('mouseleave', function() {
    const text = this.querySelector('.items-title');
    text.style.transform = 'translateY(0)';
  });
})

// Image galery if hover annimation 

const photoGroup = document.querySelectorAll('.animate-img');

photoGroup.forEach(card => {
  card.addEventListener('mousemove', sartRotateCard);
  card.addEventListener('mouseout', stopRotateCard);
})


function sartRotateCard() {
  const cardItem = this.querySelector('img');
  const halfHight = cardItem.offsetHeight / 2;
  const halfWidth = cardItem.offsetWidth / 2;
  const coefY = cardItem.offsetHeight / 15;
  const coefX = cardItem.offsetWidth / 15;
  cardItem.style.transition = 'transform 0.8s'
  cardItem.style.transform = 'scale(0.95) rotateX('+ (event.offsetY - halfHight) / coefY +'deg) rotateY('+ -(event.offsetX - halfWidth) / coefX +'deg)';
}

function stopRotateCard() {
  const cardItem = this.querySelector('img');
  cardItem.style.transition = 'transform 0.8s'
  cardItem.style.transform = 'scale(1) rotate(0)';
}


// Burger menu 
const burgerBtnOn = document.querySelector('.burger-on');
const burgerBtnOff = document.querySelector('.burger-off');
const burgerMenu = document.querySelector('.burger-menu');

burgerBtnOn.onclick = showBurgerMenu;

burgerBtnOff.onclick = hideBurgerMenu;

function showBurgerMenu() {
  burgerMenu.style.transform = 'translateX(0)'
}

function hideBurgerMenu() {
  burgerMenu.style.transform = 'translateX(-100%)'
}

// Adaptive 
if (window.innerWidth <= 480) {
  const attention =  document.querySelectorAll('.img-attention_on');
  const footerLinks = document.querySelectorAll('.footer-link');


  photoGroup.forEach(photo => {
    photo.classList.remove('animate-img')
  });

  attention.forEach(anim => {
    anim.classList.remove('img-attention_on');
  });

  footerLinks[0].innerHTML = 'annyvlasova@yahoo.com';
  footerLinks[2].innerHTML = 'My profile at Vogue';
}