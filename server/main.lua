ESX = nil

print("Started")

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback("kBanking:RequestPlayerData", function(source, cb)
    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)

    cb({
        bank = ESX.Math.GroupDigits(xPlayer.getAccount("bank").money)
    })
end)