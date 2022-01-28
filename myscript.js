window.addEventListener('load', () => {

    WA.onInit().then(() => {
        WA.chat.sendChatMessage('Bonjour '+WA.player.name, 'Informations');
        WA.chat.sendChatMessage('Bienvenue sur le marché https://larp-place.com !', 'Informations');
        WA.chat.sendChatMessage('promenez vous et n\'hésitez pas à discuter avec les artisans', 'Informations');
        WA.chat.sendChatMessage('Si vous avez besoin d\'aide, tapez !aide', 'Informations');

        WA.chat.onChatMessage(parseChat);

        function parseChat(message) {
            //if (!crewAwaitAnswer) return;
                var l_msg = message.toLowerCase();
            if (l_msg.includes('!aide')) {
                WA.chat.sendChatMessage('Eh oui, on peux programmer des robots dans le chat !', 'Aide');
            }
        }

        let currentPopup;
            //const today = new Date();
            //const time = today.getHours() + ":" + today.getMinutes();

            WA.room.onEnterLayer('doss-mobile/panneaux/panneauZone').subscribe(() => {
                console.log('toto');
                currentPopup =  WA.ui.openPopup("textPanneauZone","Vous lisez un panneau", [{
                    label: "Fermer",
                    className: "primary",
                    callback: (popup) => {
                        // Close the popup when the "Close" button is pressed.
                        popup.close();
                    }
                }]);
            });
            WA.room.onLeaveLayer('doss-mobile/panneaux/panneauZone').subscribe(closePopUp);

            WA.room.onEnterLayer('pnjs/pnjaccueil').subscribe(() => {
                console.log('toto');
                currentPopup =  WA.ui.openPopup("pnjaccueil","Salut, je suis un pnj, est ce que je peux interragir dans les panneaux ? Aucune idée, Lochot travaille dessus.", [{
                    label: "Fermer",
                    className: "primary",
                    callback: (popup) => {
                        // Close the popup when the "Close" button is pressed.
                        popup.close();
                    }
                }]);
            });
            WA.room.onLeaveLayer('pnjs/pnjaccueil').subscribe(closePopUp);
                        
            function closePopUp(){
                if (currentPopup !== undefined) {
                    currentPopup.close();
                    currentPopup = undefined;
                }
            }
    });
/*
    function myMap(){
        console.log('afficheMap');
        var parentDoc = window;
        while(parentDoc !== parentDoc.parent)
            {
                parentDoc = parentDoc.parent;
            }
        parentDoc = parentDoc.document;
            let mycontain = parentDoc.getElementById('game');
            let mypop = document.createElement('div');
            mypop.id = 'mymap';
            mypop.className= 'mymap';
            mypop.style.position = 'absolute';
            mypop.style.top = '0px';
            mypop.style.right = '0px';
            mypop.style.width = '30%';
            mypop.style.height = '30%';
            mypop.style.background = 'blue';
            mycontain.appendChild(mypop);
        console.log('fin');
    }
    myMap();*/
});
