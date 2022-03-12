$(function () {
    window.addEventListener('message', function (event) {
        let playerData = event.data.playerData;
        if (event.data.type === "openBank") {
            $('#container').fadeIn(500);
            let balance = document.getElementById('self-account-balance');
            let bal = `<p class="account-balance" id="self-balance">
            Solde: <span class="balance">${playerData.bank}$</span>
        </p>`;
            balance.innerHTML = bal;
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