$(function () {
    window.addEventListener('message', function (event) {
        let playerData = event.data.playerData;
        if (event.data.type === "openBank") {
            $('#container').fadeIn(500);
            let balance = document.getElementById('self-account-balance');
            let bal = `<p>$ ${playerData.bank}</p>`;
            balance.innerHTML = bal;

            let cardDisplay = document.getElementById('card-display');
            let name = `<p class="card-number">**** **** **** 5555</p>
                        <p class="card-name">${playerData.fullName}<span class="padleft">05/2164</span></p>`;
            cardDisplay.innerHTML = name;

            let welcomeMessage = document.getElementById('home-welcoming');
            let firstName = `<h1>Bienvenue, ${playerData.firstName}.`;
            welcomeMessage.innerHTML = firstName;

            let accountID = document.getElementById('account-id');
            accountID.innerHTML = `<p><i class="fa-solid fa-credit-card"></i> ID: ${playerData.accountID}</p>`;






            let exitButton = document.getElementById('exit');
            exitButton.onClick = function() {
                $.post('https://kBanking/closeMenu', JSON.stringify({}));
                $('#container').fadeOut(500);
                return
            }
        } 




        document.onkeyup = function (data) {
            if (data.which == 27) {
                $.post('https://kBanking/closeMenu', JSON.stringify({}));
                $('#container').fadeOut(500);
                return
            }
        };



    });
});

$('#container').hide();

