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



            let depositButton = document.getElementById('deposit');
            depositButton.addEventListener('click', function() {
                showDepositForm(playerData);
            });


            let exitButton = document.getElementById('exit');
            exitButton.addEventListener('click', function() {
                $.post('https://kBanking/closeMenu', JSON.stringify({}));
                $('#container').fadeOut(500);
                return
            });

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

function showDepositForm(playerData) {
    hideActions();


    depositForm = document.getElementById('deposit-form');
    depositForm.innerHTML = `
    <form>
        <p>Montant prédéfini<p>
        <button onClick="deposit(500)">500$</button> 
        <button onClick="deposit(1000)">1000$</button> 
        <button onClick="deposit(2500)">2500$</button> 
        <button onClick="deposit(5000)">5000$</button> 
        <button onClick="deposit(10000)">10000$</button> 
        <button onClick="deposit(${playerData.money})">${playerData.money}$</button> 
        <p>Montant personnalisé<p><br>
        <input type="text", id="deposit-amount" name="deposit-amount" placeholder="Montant..."><br>
        <input type="submit" value ="Déposer" onClick="deposit("custom_amount")">
    </form> `;



    $('#deposit-form').show();
}

function deposit(amount) {
    if (amount === "custom_amount") {
        var amount = parseInt(document.getElementById("deposit-amount").value, 10);
        if (typeof amount !== 'number') return;
    }
    $('#container').hide();
    $.post('https://kBanking/closeMenu', JSON.stringify({}));
    $.post('https://kBanking/deposit', JSON.stringify({
        amount: amount
    }));
    return;
}

function hideActions() {
    $('#deposit').hide();
    $('#withdraw').hide();
    $('#transfer').hide();
}

$('#container').hide();

