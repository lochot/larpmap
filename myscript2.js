window.addEventListener('load', () => {

    WA.onInit().then(() => {
/*        WA.chat.sendChatMessage('Bonjour '+WA.player.name, 'Informations');
        WA.chat.sendChatMessage('Bienvenue sur le marché https://larp-place.com !', 'Informations');
        WA.chat.sendChatMessage('promenez vous et n\'hésitez pas à discuter avec les artisans', 'Informations');
        WA.chat.sendChatMessage('Si vous avez besoin d\'aide, tapez !aide', 'Informations');
*/
WA.player.setOutlineColor(255, 0, 0);
WA.player.onPlayerMove(function(e){
    console.log("x : " + e.x + " y : " + e.y);
  
    let x = Math.round(e.x/32);
    let y = Math.round(e.y/32);

        if(e.direction == 'up'){
            let tiled = [
                {x: x,     y: y - 1, tile: null, layer: 'black'},
                {x: x + 1, y: y - 1, tile: null, layer: 'black'},
                {x: x - 1, y: y - 1, tile: null, layer: 'black'},
                {x: x,     y: y - 2, tile: null, layer: 'black'},
                {x: x + 1, y: y - 2, tile: null, layer: 'black'},
                {x: x - 1, y: y - 2, tile: null, layer: 'black'}
                ];
            for(let i = 3; i < 10; i++) {
                tiled.push(
                        {x: x,     y: y + i, tile: 'black', layer: 'black'},
                        {x: x + 1, y: y + i, tile: 'black', layer: 'black'},
                        {x: x - 1, y: y + i, tile: 'black', layer: 'black'},
                        {x: x + 2, y: y + i, tile: 'black', layer: 'black'},
                        {x: x - 2, y: y + i, tile: 'black', layer: 'black'},
                        {x: x + 3, y: y + i, tile: 'black', layer: 'black'},
                        {x: x - 3, y: y + i, tile: 'black', layer: 'black'},
                );
            }
            WA.room.setTiles(tiled);
            }
            
        if(e.direction == 'down'){
            let tiled = [
                        {x: x, y: y + 1, tile: null, layer: 'black'},
                        {x: x + 1, y: y + 1, tile: null, layer: 'black'},
                        {x: x - 1, y: y + 1, tile: null, layer: 'black'},
                        {x: x, y: y + 2, tile: null, layer: 'black'},
                        {x: x + 1, y: y + 2, tile: null, layer: 'black'},
                        {x: x - 1, y: y + 2, tile: null, layer: 'black'}
                        ];
            for(let i = 3; i < 10; i++) {
                tiled.push(
                        {x: x,     y: y - i, tile: 'black', layer: 'black'},
                        {x: x + 1, y: y - i, tile: 'black', layer: 'black'},
                        {x: x - 1, y: y - i, tile: 'black', layer: 'black'},
                        {x: x + 2, y: y - i, tile: 'black', layer: 'black'},
                        {x: x - 2, y: y - i, tile: 'black', layer: 'black'},
                        {x: x + 3, y: y - i, tile: 'black', layer: 'black'},
                        {x: x - 3, y: y - i, tile: 'black', layer: 'black'},
                );
            }
            WA.room.setTiles(tiled);
    }
        if(e.direction == 'right'){

            let tiled = [
                {x: x + 1, y: y, tile: null, layer: 'black'},
                {x: x + 1, y: y + 1, tile: null, layer: 'black'},
                {x: x + 1, y: y - 1, tile: null, layer: 'black'},
                {x: x + 2, y: y, tile: null, layer: 'black'},
                {x: x + 2, y: y - 1, tile: null, layer: 'black'},
                {x: x + 2, y: y + 1, tile: null, layer: 'black'}
                ];
            for(let i = 3; i < 10; i++) {
                tiled.push(
                        {x: x - i, y: y + 1, tile: 'black', layer: 'black'},
                        {x: x - i, y: y - 1, tile: 'black', layer: 'black'},
                        {x: x - i, y: y + 2, tile: 'black', layer: 'black'},
                        {x: x - i, y: y - 2, tile: 'black', layer: 'black'},
                        {x: x - i, y: y + 3, tile: 'black', layer: 'black'},
                        {x: x - i, y: y - 3, tile: 'black', layer: 'black'},
                        {x: x - i, y: y, tile: 'black', layer: 'black'},
                );
            }
            WA.room.setTiles(tiled);
            }
        if(e.direction == 'left'){

            let tiled = [
                {x: x - 1, y: y, tile: null, layer: 'black'},
                {x: x - 1, y: y + 1, tile: null, layer: 'black'},
                {x: x - 1, y: y - 1, tile: null, layer: 'black'},
                {x: x - 2, y: y, tile: null, layer: 'black'},
                {x: x - 2, y: y - 1, tile: null, layer: 'black'},
                {x: x - 2, y: y + 1, tile: null, layer: 'black'}
                ];
            for(let i = 3; i < 10; i++) {
                tiled.push(
                        {x: x + i, y: y + 1, tile: 'black', layer: 'black'},
                        {x: x + i, y: y - 1, tile: 'black', layer: 'black'},
                        {x: x + i, y: y + 2, tile: 'black', layer: 'black'},
                        {x: x + i, y: y - 2, tile: 'black', layer: 'black'},
                        {x: x + i, y: y + 3, tile: 'black', layer: 'black'},
                        {x: x + i, y: y - 3, tile: 'black', layer: 'black'},
                        {x: x + i, y: y, tile: 'black', layer: 'black'},
                );
            }
            WA.room.setTiles(tiled);
            }
        console.log(e);     
});

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
