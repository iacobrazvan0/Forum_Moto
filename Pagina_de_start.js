// script.js

// Simulăm o listă de cele mai recente discuții
var latestDiscussions = [
    "Titlul Discuției 1",
    "Titlul Discuției 2",
    "Titlul Discuției 3"
  ];
  
  // Funcție pentru afișarea cele mai noi discuții
  function showLatestDiscussions() {
    var discussionList = document.getElementById("discussion-list");
    // Curățăm lista de discuții existentă
    discussionList.innerHTML = "";
    // Iterăm prin lista de cele mai recente discuții și le adăugăm la lista HTML
    latestDiscussions.forEach(function(discussion) {
      var listItem = document.createElement("li");
      var link = document.createElement("a");
      link.href = "#"; // Poți adăuga link-uri adevărate către discuții aici
      link.textContent = discussion;
      listItem.appendChild(link);
      discussionList.appendChild(listItem);
    });
  }
  
  // Apelăm funcția pentru afișarea inițială a discuțiilor
  showLatestDiscussions();
  

  var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 10000); // Schimbă imaginea la fiecare 2 secunde (2000 milisecunde)
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }


// Obținem meniul și butonul de meniu
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');

// Adăugăm un eveniment de clic butonului de meniu pentru a afișa sau ascunde meniul
menuBtn.addEventListener('click', function() {
    menu.classList.toggle('active');
});

// Adăugăm un eveniment de clic la document pentru a ascunde meniul când se face clic în afara acestuia
document.addEventListener('click', function(event) {
    // Verificăm dacă elementul pe care s-a făcut clic nu este meniul sau butonul de meniu
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
        // Ascundem meniul
        menu.classList.remove('active');
    }
});
