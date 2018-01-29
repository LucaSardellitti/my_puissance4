// (function($){

// $.fn.puissance4 = function(){

    function Map(row, col){

      this.col = col; //Colonnes
      this.row = row; //Rangées
      this.player1 = "Joueur aux jetons rouges";
      this.player2 = "Joueur aux jetons jaunes";
      this.color = "yellow";//Couleur de base
      this.tour = 0; //Nombre de tour.

      var div = $('.container').append("<div id='div_principal'>");
      var new_div = $('#div_principal').append("<div id='coordonee'>");
      var new_div_msg_tour = $('#div_principal').append("<div id='messageTourJoueur'>");
      var new_div_cercle = $('#div_principal').append("<div id='cercle' class='col-md-offset-5'>");
      document.getElementById("cercle").style.backgroundImage = "url('../img/scoreRed.jpg')";
      document.getElementById("cercle").style.backgroundSize = "100%";

      var new_div_score_player1 = $('.container').append("<div id='scorePlayer1' class='col-md-3'>");
      var new_div_score_player2 = $('.container').append("<div id='scorePlayer2' class='col-md-offset-6 col-md-3'>");

      var new_div_msg = $('.container').append("<p id='messageGagnant'>");
      var new_div_col_full = $('#div_principal').append("<div id='col_full'>");


//Enregistrement du score à 0 dans la session storage.
      this.scorePlayer1 = 0;
      if(sessionStorage.getItem("Point(s) Rouge") == NaN || sessionStorage.getItem("Point(s) Rouge") == null){
          sessionStorage.setItem("Point(s) Rouge", parseInt(this.scorePlayer1)); //Enregistrement du score qui est égale à 0 dans le session storage.
      }

       this.scorePlayer2 = 0;
      if(sessionStorage.getItem("Point(s) Jaune") == NaN || sessionStorage.getItem("Point(s) Jaune") == null){
          sessionStorage.setItem("Point(s) Jaune", parseInt(this.scorePlayer2)); //Enregistrement du score qui est égale à 0 dans le session storage.
      }

//Affichage du score.
      document.getElementById("messageTourJoueur").innerText = "La partie commencera lorsque le premier joueur cliquera sur une case.\nLe joueur qui commencera aura les jetons rouges.";
      document.getElementById("scorePlayer1").innerText = "Score Joueur aux pions rouges : "+sessionStorage.getItem("Point(s) Rouge");
      document.getElementById("scorePlayer2").innerText = "Score Joueur aux pions jaunes : "+sessionStorage.getItem("Point(s) Jaune");


      this.last = null; //Pour récupérer la derniere position joué.

      var button = $('#div_principal').append('<button onclick="map.removeJeton();" id="btn" class="btn btn-primary col-md-offset-2">Annuler le dernier coup joué !</button>');
      document.getElementById("btn").style.display = "none";//Affichage de mon bouton.





//Génération de la map
      this.drawMap = function(){

        var monTableau = $('.container').append("<div id='map' class=''>");
        for(var y = 0; y <= row; y++ ){
          $("#map").append("<tr id='row'>");

          for(var x = 0; x <= col; x++){
                $("#map").append('<td onclick="map.addJeton('+y+','+x+');"  id="col['+y+']['+x+']"></td>');      
          }
         }
       }
      this.drawMap();


      

// Gestion de couleur du jetons + comptage des tours joué.
        this.colorCase = function(){
          if(this.color == "yellow"){
               this.color = "red";
               document.getElementById("messageTourJoueur").innerText = "C'est au "+this.player2+" de jouer !";
               document.getElementById("cercle").style.backgroundImage = "url('../img/scoreYellow.jpg')";
               document.getElementById("cercle").style.backgroundSize = "100%";
               document.getElementById("cercle").style.transform = "rotate3d(0, 2, 0 , 360deg)";
               document.getElementById("cercle").style.transition = "all 1s ease-out";
               this.tour++;
          }
          else{
               this.color = "yellow";
               document.getElementById("messageTourJoueur").innerText = "C'est au "+this.player1+" de jouer !";
               document.getElementById("cercle").style.backgroundImage = "url('../img/scoreRed.jpg')";
                document.getElementById("cercle").style.backgroundSize = "100%";
               document.getElementById("cercle").style.transform = "rotate3d(0, 2, 0 , 360deg)";
               document.getElementById("cercle").style.transition = "all 1s ease-out";
               this.tour++;
          }

//Condition de match nul
          if (this.tour == 42){
            document.getElementById("map").style.display = "none";
            document.getElementById("div_principal").style.display = "none";
            document.getElementById("scorePlayer1").style.display = "none";
            document.getElementById("scorePlayer2").style.display = "none";
            var new_div_animation = $('body').append("<img src='../gif/match_nul.gif' id='animationMatchNul' class='col-md-offset-5'>");
                document.getElementById("messageGagnant").innerText = "Mais comment vous avez fait pour faire un match nul :O";
                document.getElementById("messageGagnant").style.fontSize = "30px";
                document.getElementById("messageGagnant").style.transition = "0.8s";
                setTimeout(function(){
                  if(!confirm("La partie est finis ! Voulez-vous rejouer ?")){
                    document.location.href="../accueil.html";
                  }
                  else{
                    location.reload();
                  }
                }, 8000);
          }
        }




//Calcule de la position la plus basse de X de la couleur du jeton
      this.posXColorJeton = function(x, y){
        var i = 0;
        while(i < this.col) {
         if (document.getElementById("col["+i+"]["+y+"]").style.backgroundColor != "" || document.getElementById("col["+i+"]["+y+"]").style.backgroundColor == "white" ){
          return i - 1;
         }
          i++;
        }
        return i - 1;
      }




//Remplis en couleur la case selectionné
      this.colorThisCase = function(x, y){
          document.getElementById("col["+x+"]["+y+"]").style.backgroundColor = this.color;
          this.last = document.getElementById("col["+x+"]["+y+"]"); // this.last est egale a la derniere position joué.
            if(this.color == "yellow"){
               document.getElementById("coordonee").innerText = "Le "+this.player2+" a joué a sur la case ["+x+"]["+y+"]"; 
               this.last.style.transform = "rotate3d(0, 2, 0 , 360deg)";
               this.last.style.transition = "all 1s ease-out";   
              }
              else{
                   document.getElementById("coordonee").innerText = "Le "+this.player1+" a joué a sur la case ["+x+"]["+y+"]";  
                   this.last.style.transform = "rotate3d(0, 2, 0 , 360deg)";
                   this.last.style.transition = "all 1s ease-out";
              }
          
        document.getElementById("btn").style.display = "block";//Affichage de mon bouton.

      }




//Conditions pour le vainqueur avec les alertes pour les verticals.
        this.cdnVicVert = function(i, y, color){
          var thisClass = this;// thisClass = Toute ma class Map ce qui me permet de recuperer player1 et player2

              if (document.getElementById("col["+i+"]["+y+"]").style.backgroundColor == "red"){
                victoryRed();
                // setTimeout(function(){ alert("Le "+thisClass.player1+" a gagné"); }, 1000);
                var new_div_animation = $('.container').append("<img src='../gif/victoryRed.gif' id='animationRed'  class='col-md-3'>");
                document.getElementById("messageGagnant").innerText = "Le "+thisClass.player1+" a gagné";
                document.getElementById("messageGagnant").style.color = "red";                
                document.getElementById("messageGagnant").style.fontSize = "30px";
                document.getElementById("messageGagnant").style.transition = "1s";
                document.getElementById("scorePlayer1").style.transform = "rotate3d(0, 2, 0 , 360deg)";
                document.getElementById("scorePlayer1").style.transition = "all 1s ease-out";
                setTimeout(function(){
                  if(!confirm("La partie est finis ! Voulez-vous rejouer ?")){
                    document.location.href="../accueil.html";
                  }
                  else{
                    location.reload();
                  }
                }, 3000);
              }

              else if(document.getElementById("col["+i+"]["+y+"]").style.backgroundColor == "yellow") {
                victoryYellow();
                var new_div_animation = $('.container').append("<img src='../gif/victoryYellow.gif' id='animationYellow' class='col-md-offset-9 col-md-3'>");
                // setTimeout(function(){ alert("Le "+thisClass.player2+" a gagné"); }, 1000);
                document.getElementById("messageGagnant").innerText = "Le "+thisClass.player2+" a gagné";
                document.getElementById("messageGagnant").style.color = "yellow";   
                document.getElementById("messageGagnant").style.fontSize = "30px";
                document.getElementById("messageGagnant").style.transition = "0.8s";
                document.getElementById("scorePlayer2").style.transform = "rotate3d(0, 2, 0 , 360deg)";
                document.getElementById("scorePlayer2").style.transition = "all 1s ease-out";
                setTimeout(function(){
                   if(!confirm("La partie est finis ! Voulez-vous rejouer ?")){
                     document.location.href="../accueil.html";
                   }
                   else{
                     location.reload();
                   }
                }, 3000);
              }
        }




 //Conditions pour le vainqueur avec les alertes pour les horizontals.
        this.cdnVicHori = function(i, x, color){
          var thisClass = this;// thisClass = Toute ma class Map ce qui me permet de recuperer player1 et player2

              if (document.getElementById("col["+x+"]["+i+"]").style.backgroundColor == "red"){
                 victoryRed();
                 var new_div_animation = $('.container').append("<img src='../gif/victoryRed.gif' id='animationRed' class='col-md-3'>");
                 // setTimeout(function(){ alert("Le "+thisClass.player1+" a gagné"); }, 1000);
                 document.getElementById("messageGagnant").innerText = "Le "+thisClass.player1+" a gagné";
                 document.getElementById("messageGagnant").style.color = "red";   
                 document.getElementById("messageGagnant").style.fontSize = "30px";
                 document.getElementById("messageGagnant").style.transition = "0.8s";
                 document.getElementById("scorePlayer1").style.transform = "rotate3d(0, 2, 0 , 360deg)";
                 document.getElementById("scorePlayer1").style.transition = "all 1s ease-out";
                 setTimeout(function(){
                   if(!confirm("La partie est finis ! Voulez-vous rejouer ?")){
                     document.location.href="../accueil.html";
                   }
                   else{
                     location.reload();
                   }
                 }, 3000);
              }
              else if(document.getElementById("col["+x+"]["+i+"]").style.backgroundColor == "yellow") {
                victoryYellow();
                var new_div_animation = $('.container').append("<img src='../gif/victoryYellow.gif' id='animationYellow' class='col-md-offset-9 col-md-3'>");
                // setTimeout(function(){ alert("Le "+thisClass.player2+" a gagné"); }, 1000);
                document.getElementById("messageGagnant").innerText = "Le "+thisClass.player2+" a gagné";
                document.getElementById("messageGagnant").style.color = "yellow";   
                document.getElementById("messageGagnant").style.fontSize = "30px";
                document.getElementById("messageGagnant").style.transition = "0.8s";
                document.getElementById("scorePlayer2").style.transform = "rotate3d(0, 2, 0 , 360deg)";
                document.getElementById("scorePlayer2").style.transition = "all 1s ease-out";
                setTimeout(function(){
                   if(!confirm("La partie est finis ! Voulez-vous rejouer ?")){
                     document.location.href="../accueil.html";
                   }
                   else{
                     location.reload();
                   }
                }, 3000);
              }
        }



//Conditions pour le vainqueur avec les alertes pour les diagonales.
      this.cdnVicDiag = function(x, y){
           var thisClass = this;// thisClass = Toute ma class Map ce qui me permet de recuperer player1 et player2

        if (document.getElementById("col["+x+"]["+y+"]").style.backgroundColor == "red"){
              victoryRed();
              // setTimeout(function(){ alert("Le "+thisClass.player1+" a gagné"); }, 1000);
                var new_div_animation = $('.container').append("<img src='../gif/victoryRed.gif' id='animationRed' class='col-md-3'>");
                document.getElementById("messageGagnant").innerText = "Le "+thisClass.player1+" a gagné";
                document.getElementById("messageGagnant").style.color = "red";   
                document.getElementById("messageGagnant").style.fontSize = "30px";
                document.getElementById("messageGagnant").style.transition = "0.8s";
                document.getElementById("scorePlayer1").style.transform = "rotate3d(0, 2, 0 , 360deg)";
                document.getElementById("scorePlayer1").style.transition = "all 1s ease-out";
                setTimeout(function(){
                  if(!confirm("La partie est finis ! Voulez-vous rejouer ?")){
                    document.location.href="../accueil.html";
                  }
                  else{
                    location.reload();
                  }
                }, 3000);
          }
          else{
            victoryYellow();
            // setTimeout(function(){ alert("Le "+thisClass.player2+" a gagné"); }, 1000);
                var new_div_animation = $('.container').append("<img src='../gif/victoryYellow.gif' id='animationYellow' class='col-md-offset-9 col-md-3'>");
                document.getElementById("messageGagnant").innerText = "Le "+thisClass.player2+" a gagné";
                document.getElementById("messageGagnant").style.color = "yellow";   
                document.getElementById("messageGagnant").style.fontSize = "30px";
                document.getElementById("messageGagnant").style.transition = "0.8s";
                document.getElementById("scorePlayer2").style.transform = "rotate3d(0, 2, 0 , 360deg)";
                document.getElementById("scorePlayer2").style.transition = "all 1s ease-out";
                setTimeout(function(){
                   if(!confirm("La partie est finis ! Voulez-vous rejouer ?")){
                     document.location.href="../accueil.html";
                   }
                   else{
                     location.reload();
                   }
                }, 3000);
          }
        }




//Conditions de victoire vertical
      this.victoryVertical = function(y, color){;
        count = 0 
        var tab = [];
        for (var i = 0; i <= 5; i++) {
          //console.log("COLOR CASE==>"+document.getElementById("col["+i+"]["+y+"]").style.backgroundColor);
          // console.log("COLOR WANT==>"+color);
          if (document.getElementById("col["+i+"]["+y+"]").style.backgroundColor == color){
              count++;
              tab.push(document.getElementById("col["+i+"]["+y+"]")); //Envoie des coordonnées dans le tableau
          }
          else{
            count = 0;
            tab = [];
          }
          // console.log(count);
          if(count == 4){
            this.cdnVicVert(i, y, color);
            this.tableauJeton(tab);
          }
        }
      }




//Conditions de victoire horizontal
      this.victoryHorizontal = function(x, color){
        count = 0 
        var tab = [];
        for (var i = 0; i <= 6; i++) {
          if (document.getElementById("col["+x+"]["+i+"]").style.backgroundColor == color){
              count++;
              tab.push(document.getElementById("col["+x+"]["+i+"]")); //Envoie des coordonnées dans le tableau
          }
          else{
            count = 0;
            tab = [];
          }

          if(count == 4){
            this.cdnVicHori(i, x, color);
            this.tableauJeton(tab);
          }
        }
      }




//Conditions de victoire diagonal
      this.victoryDiagonal = function(x, y, type){

        var variable = false;
        var countR = 0;
        var countJ = 0;
        var emptyCaseR = true;
        var emptyCaseJ = true;

//type = sens de la diagonal
        while(variable != true){
          if (type == 0){
            x++; 
            y++;
          }
          else if(type == 1){
            x--;
            y--;
          }
          else if(type == 2){
            x++;
            y--;
          }
          else{
            x--;
            y++;
          }

//Incrémentation des jetons si la case existe.

          if (document.getElementById("col["+x+"]["+y+"]") != undefined){ //Check si ma case existe.
            if (emptyCaseJ != false){
              if (document.getElementById("col["+x+"]["+y+"]").style.backgroundColor == "yellow"){
                countJ++;
              }
              else{
                emptyCaseJ = false;
              }
            }

            if (emptyCaseR != false){
              if (document.getElementById("col["+x+"]["+y+"]").style.backgroundColor == "red"){
                countR++;
              }
              else{
                emptyCaseR = false;
              }
            }
          }
          else{
            variable = true;
          }
        }
          return {"JetonsRouges" : countR, "JetonsJaunes" : countJ};
       }



//Possibilité des diagonales.
        this.diagonalPossible = function(x, y, type){
          var diagonal0 = this.victoryDiagonal(x, y, 0);
          var diagonal1 = this.victoryDiagonal(x, y, 1);
          var diagonal2 = this.victoryDiagonal(x, y, 2);
          var diagonal3 = this.victoryDiagonal(x, y, 3);
          // console.log(diagonal0);
          // console.log(diagonal1);
          // console.log(diagonal2);
          // console.log(diagonal3 );

          if(this.color != "yellow"){
              if (diagonal0.JetonsRouges + diagonal1.JetonsRouges + 1 >= 4){
                this.cdnVicDiag(x, y);
              }

              else if(diagonal2.JetonsRouges + diagonal3.JetonsRouges + 1 >= 4){
                this.cdnVicDiag(x, y);
              }
            }
            else{
               if (diagonal0.JetonsJaunes + diagonal1.JetonsJaunes + 1 >= 4){
                this.cdnVicDiag(x, y);
              }

              else if(diagonal2.JetonsJaunes + diagonal3.JetonsJaunes + 1 >= 4){
                this.cdnVicDiag(x, y);
              }
            }
        }



//Parcour le tableau et met les 4 pions en vert.
        this.tableauJeton = function(tab){
          tab.forEach( function(value){ 
            value.style.backgroundColor = "#04B404";
            value.style.opacity = "0.7";
          })
        }




//Comptage de points.
        function victoryRed(){
          this.scorePlayer1 = parseInt(sessionStorage.getItem("Point(s) Rouge"))+1;
          sessionStorage.setItem("Point(s) Rouge", parseInt(this.scorePlayer1));     
        }

        function victoryYellow(){
          this.scorePlayer2 = parseInt(sessionStorage.getItem("Point(s) Jaune"))+1;
          sessionStorage.setItem("Point(s) Jaune", parseInt(this.scorePlayer2));     
        }



    

//Supprime le dernier pion joué
        this.removeJeton = function(){
          if(this.last != null){
              this.last.style.backgroundColor = "";
              document.getElementById("btn").style.display = "none";

              if(this.color == "yellow"){
                   this.color = "red";
                   document.getElementById("messageTourJoueur").innerText = "C'est au "+this.player2+" de jouer !";
                   document.getElementById("cercle").style.backgroundImage = "url('../img/scoreYellow.jpg')";
                   document.getElementById("cercle").style.backgroundSize = "100%";
              
              }
              else{
                   this.color = "yellow";
                   document.getElementById("messageTourJoueur").innerText = "C'est au "+this.player1+" de jouer !";
                   document.getElementById("cercle").style.backgroundImage = "url('../img/scoreRed.jpg')";
                   document.getElementById("cercle").style.backgroundSize = "100%";
              }
          }

          this.tour--;
        }



//Reset le score.
        var new_div_remove_score = $('.container').append("<button class='btn btn-lg reset col-md-offset-5' onclick='map.resetScore()'>Reset Score</button>");
        this.resetScore = function(){
          this.scorePlayer1 = 0;
          this.scorePlayer2 = 0;
            sessionStorage.setItem("Point(s) Rouge", parseInt(this.scorePlayer1));
            sessionStorage.setItem("Point(s) Jaune", parseInt(this.scorePlayer2));
            location.reload();
        }




//Ajoute les jetons
      this.addJeton = function(x, y){
       
        var posXColorJeton = this.posXColorJeton(x,y);
         if (posXColorJeton >= 0){
            this.colorCase();
            this.colorThisCase(posXColorJeton, y);   
            this.victoryVertical(y, this.color);
            this.victoryHorizontal(posXColorJeton, this.color);
            this.diagonalPossible(posXColorJeton, y, this.type);
          }
          else{
            document.getElementById("col_full").innerText = "Colonne pleine";
            setTimeout(function(){ document.getElementById("col_full").innerText = ""; }, 3000);
          }
      }

     


      $('body').append("<style>#scorePlayer1,#scorePlayer2{padding:.8%;text-align:center}.container{margin-top:2%;margin-bottom:2%}span{font-size:30px}.play{margin-top:50%;width:100%;height:90px}.fond1{background:url(../img/puissance4.jpg) no-repeat fixed;background-size:100% 100%}.fond2{background:url(../img/fond.jpg) no-repeat fixed;background-size:100% 100%}#div_principal,#map{height:100%;background:url(../img/td.jpg)}#map{border:1px solid #fff;border-radius:2%;padding:.5%;width:38%;margin:2.5% auto auto}td{width:60px;height:60px;border:3px solid #424242;border-radius:100px;background-color:#fff;box-shadow:1px 1px 10px 2px rgba(0,0,0,.4) inset}td:hover{background-color:#D8D8D8;transform:rotate3d(0,2,0 ,360deg);transition:all 1s ease-out}#div_principal{width:28%;margin:auto;text-align:center;border-radius:2%;color:#fff;font-weight:700;border:1px solid #fff}#cercle{padding:1.5%;width:10%;height:30px;border:1px solid #fff;border-radius:50%;margin-top:1%;margin-bottom:2%}#messageGagnant{text-align:center;color:#fff}#btn{margin-top:3%;margin-bottom:3%;background:url(../img/btn.jpg)}#btn:hover{box-shadow:12px 8px 12px 0 rgba(255,255,255,.3);font-size:16px;transition:1s}#scorePlayer1{border:1.5px solid #000;border-radius:5%;background:url(../img/scoreRed.jpg);color:#fff}#scorePlayer1:hover,#scorePlayer2:hover{box-shadow:24px 12px 12px 0 rgba(255,255,255,.3);font-size:16px;transition:1s}#scorePlayer2{border:1.5px solid #000;border-radius:5%;background:url(../img/scoreYellow.jpg);color:#000}#animationRed{width:25%;margin-top:-36%;transition:.8s}#animationYellow{width:25%;margin-top:-44%;transition:.8s}.reset{margin-top:5%;margin-left:44%}.reset:hover{box-shadow:12px 8px 12px 0 rgba(255,255,255,.3);font-size:20px;transition:1s}</style>");



    }

    var map = new Map(5,6);

// };
// })(jQuery);