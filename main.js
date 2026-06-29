/* Le'Efa Consulting — shared behaviour */
(function(){
  // current year in footer
  var yr = document.getElementById('yr');
  if(yr) yr.textContent = new Date().getFullYear();

  // mobile menu
  var mb = document.getElementById('menuBtn'), mm = document.getElementById('mobileMenu');
  if(mb && mm){
    mb.addEventListener('click', function(){
      var open = mm.classList.toggle('open');
      mb.setAttribute('aria-expanded', open);
    });
    mm.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ mm.classList.remove('open'); mb.setAttribute('aria-expanded','false'); });
    });
  }

  // soft scroll reveal
  var els = document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
    },{threshold:.14, rootMargin:'0px 0px -50px 0px'});
    els.forEach(function(el){ io.observe(el); });
  } else {
    els.forEach(function(e){ e.classList.add('in'); });
  }

  // accordions (services) + portfolio cards share the same toggle pattern
  document.querySelectorAll('[data-toggle]').forEach(function(btn){
    function toggle(){
      var item = btn.closest('[data-item]');
      if(!item) return;
      var isOpen = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    }
    btn.addEventListener('click', toggle);
    // Enter / Space for elements that aren't native buttons
    if(btn.tagName !== 'BUTTON'){
      btn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); toggle(); }
      });
    }
  });

  // portfolio filters
  var pfFilters = document.getElementById('pfFilters');
  if(pfFilters){
    var pfcards = document.querySelectorAll('#pfCards .pf2');
    pfFilters.addEventListener('click', function(e){
      var btn = e.target.closest('.pf-filter');
      if(!btn) return;
      pfFilters.querySelectorAll('.pf-filter').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      pfcards.forEach(function(c){
        c.classList.toggle('hide', f!=='all' && c.getAttribute('data-category')!==f);
      });
    });
  }

  // contact form (front-end only — connect to a form service to receive messages)
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = document.getElementById('formNote');
      if(!form.checkValidity()){ note.style.color='var(--mustard-deep)'; note.textContent='Please add your name, a valid email and a short message.'; return; }
      note.style.color = 'var(--mustard-deep)';
      note.textContent = 'Thank you — this is a demo form. Connect it to email or a form service to receive enquiries.';
      form.reset();
    });
  }
})();
