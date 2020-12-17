// Chercher le bouton html pour écouter les clicks.
var boutonSwitch = document.getElementById("bouton-switch");

// Chercher la balise du lien css pour la changer dynamiquemen.
var lienCss = document.getElementById("lien-css");

// Chercher le div avec id centre pour le déplacer lors de la transition au gabarit 8.
var divCentre = document.getElementById("centre");

// Variable temporaire qui garde le div avec id secondaire en mémoire pour le déplacer lors de la transition au gabarit 8.
var tempSecondaire = document.getElementById("secondaire");

// Variable temporaire qui garde le div avec id principal en mémoire.
var tempPrincipal = document.getElementById("principal");

// Selectionne le block avec id centre-bis pour le supprimer lors de la transition au gabarit 8.
var centreBis = document.getElementById("centre-bis");

// Sélectionne le block avec id navigation pour le déplacer lors de la transition au gabarit 8.
var divNavigation = document.getElementById("navigation");

// Sélectionne le block avec id global
var divGlobal = document.getElementById("global");

// Sélectionne le div avec un id pied pour le supprimer lors de la transition au gabarit 8
var divPied = document.getElementById("pied");

/** Permet de garder en valeur le navigation pour la supprimer dans le modele 11
    et le rajouter dans le modele 8 **/
var nouvelleNavigation = document.createElement("div");
nouvelleNavigation.id = "navigation";
nouvelleNavigation.innerHTML = divNavigation.innerHTML;

/** Permet de garder en valeur le centreBis pour la supprimer dans le modele 8
    et le rajouter dans le modele 11 **/
var centreBisTemp = document.createElement("div");
centreBisTemp.id = "centre-bis";
centreBisTemp.innerHTML = centreBis.innerHTML;

// Petit paragraphe de copyright présent dans le div avec un id secondaire.
var pCopyright = document.createElement("p");
pCopyright.id = "copyright";
pCopyright.innerText = "Mise en page © 2008 Elephorm et Alsacréations & Nicolas Roy / William Stancu";

// Variable pour déterminer si le css est au modèle 11 ou non.
var estModele11 = true;

// Écoute pour un click du bouton.
boutonSwitch.addEventListener("click", () => {
  if (estModele11) {
    changerCss("styles/modele08.css");
    changerHtmlMod8();
  } else {
    changerCss("styles/modele11.css");
    changerHtmlMod11();
  }

  // Alterner le booléen estModele11.
  estModele11 = !estModele11;

});

/**
 * Fonction qui change le lien css dans le html pour le chemin du gabarit choisi.
 *
 * @param {string} valeur - Le chemin vers le fichier css.
 */
function changerCss(valeur) {
  lienCss.href = valeur;
}

/**
 * Fonction qui change les différents div qui sont affectés par le changement
 * de gabarit pour le numéro 8 (centre-bis, navigation...).
 */
function changerHtmlMod8() {
  enleverShadow();
  centreBis = document.getElementById("centre-bis");

  divGlobal.insertBefore(nouvelleNavigation, divCentre);
  divNavigation.remove();
  centreBis.remove();
  divCentre.appendChild(tempPrincipal);
  tempSecondaire.appendChild(pCopyright);
  divCentre.appendChild(tempSecondaire);
  divPied.remove();
  galery();
  shadow();
}

/**
 * Fonction qui change les différents div qui sont affectés par le changement
 * de gabarit pour le numéro 11 (centre-bis, navigation...).
 */
function changerHtmlMod11() {
  enleverShadow();
  nouvelleNavigation.remove();
  tempPrincipal.remove();
  tempSecondaire.remove();
  divCentre.appendChild(centreBisTemp);
  global.appendChild(divPied);
  galery();
  shadow();
}

//--------------------------------- TP6 (jQuery) --------------------------------------//

// Appelle les deux fonctions qui activent l'ombrage et la galery sur les pages.
// lorsque le document charge.
$(document).ready(function () { shadow(); galery(); });

/*-----------------------------------GALLERIE---------------------------------*/
/**
 * Fonction qui s'occupe de la galerie d'image. Elle est appelée lorsque la
 * page télécharge et lorsqu'on change de css pour s'assurer qu'elle s'applique
 * aux composantes html.
 */
function galery() {
  $(function () {
    // Mettre la première image en gros et entourer la miniature d'une bordure.
    $('.mini').css('border', '5px solid white');
    $('#grande-img').attr('src', $('.images-site img:first').attr('src'));
    $('.images-site img:first').css('border', '5px solid lime');

    // Fonction qui s'active lorsqu'on click sur la miniature
    $('.mini').click(function () {
      // Remettre les autres miniatures à un fond blanc.
      $('.images-site .mini').css('border', '5px  white solid');

      // Affecter l'image cliquée d'une bordure verte.
      $(this).css('border', '5px solid lime');
      var nom = $(this).attr('src');
      // Petite animation d'opacité de la grande image
      $('#grande-img').fadeOut(2000, function () {
        //Attribuer la source de la miniature à la grande image.
        $('#grande-img').attr('src', nom);
        $('#grande-img').fadeIn(2000);
      });
    });
  });
}

/* ----------------------------------SHADOW---------------------------------- */
/**
 * Fonction qui s'occupe des effets de bon et d'ombrage des éléments 
 * du menu de navigation. Elle est appelée lorsque la
 * page télécharge et lorsqu'on change de css pour s'assurer qu'elle s'applique
 * aux composantes html.
 */
function shadow() {
  /* Attache l'ombre a tout les éléments de la liste du menu anime */
  $("#menu-anime > li").append('<img class="shadow" src="../images/icon-shadow.png" width="150" height="20" alt="" />');

  /* Fonction qui fait lever l'éléments lorsqu'on le survole pour crééer un effet de bon */
  $("#menu-anime > li").hover(
    function () {
      var e = this;
      $(e).find("a").animate({ marginTop: "-20px" }, 250,

        function () {
          $(e).find("a").animate({ marginTop: "-15px" }, 250);
        });

      $(e).find("img.shadow").animate({ width: "80%", height: "20px", marginLeft: "16px", opacity: 0.25 }, 250);
    },

    /* Fonction qui fait raptisser et réduire l'opacité de l'ombre pour créer l'effet de bon */
    function () {
      var e = this;
      $(e).find("a").animate({ marginTop: "5px" }, 250,
        function () {
          $(e).find("a").animate({ marginTop: "0px" }, 250);
        });
      $(e).find("img.shadow").animate({ width: "100%", height: "27px", marginLeft: "0", opacity: 1 }, 250);

    }
  );
}
/* Fonction qui enlève le shadow lorsqu'on change de css pour pas qui se duplique */
function enleverShadow() {
  $("img").remove(".shadow");
}