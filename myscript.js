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

            WA.room.onEnterLayer('panneauZone').subscribe(() => {
                console.log('toto');
                currentPopup =  WA.ui.openPopup("textPanneauZone","<b>Vous lisez un panneau</b>", [{
                    label: "Fermer",
                    className: "primary",
                    callback: (popup) => {
                        // Close the popup when the "Close" button is pressed.
                        popup.close();
                    }
                }]);
            });

            WA.room.onLeaveLayer('panneauZone').subscribe(closePopUp);

            function closePopUp(){
                if (currentPopup !== undefined) {
                    currentPopup.close();
                    currentPopup = undefined;
                }
            }
    });
});