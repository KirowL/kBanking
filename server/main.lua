ESX = nil

print("Started")

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback("kBanking:RequestPlayerData", function(source, cb)
    local source = source
    local xPlayer = ESX.GetPlayerFromId(source)
    local pFirstName = Split(xPlayer.name, " ")[1]
    cb({
        bank = ESX.Math.GroupDigits(xPlayer.getAccount("bank").money),
        firstName = pFirstName,
        fullName = xPlayer.name,
        bankID = playerBankId,
        accountID = xPlayer.get("account_id")
    })
end)

function Split(s, delimiter)
    result = {};
    for match in (s..delimiter):gmatch("(.-)"..delimiter) do
        table.insert(result, match);
    end
    return result;
end


--RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
    local source = playerId
    --local xPlayer = ESX.GetPlayerFromId(source)
    local playerAccountId = MySQL.Sync.fetchScalar("SELECT account_id FROM users WHERE identifier = @id", {['@id'] = xPlayer.identifier})
    if playerAccountId ~= nil then
        xPlayer.set("account_id", playerAccountId)
    else 
        MySQL.Sync.execute("UPDATE users SET account_id = @accountID WHERE identifier = @id", {['@accountID'] = generateAccountId(), ['@id'] = xPlayer.identifier})
    end
end)

generateAccountId = function()
    randomNumber =  math.random(00000000, 99999999)
    if DoesNumberExist(randomNumber) then return generateAccountId()
    else return randomNumber end
end

DoesNumberExist = function(number)
    local result = MySQL.Sync.fetchScalar("SELECT account_id FROM users WHERE account_id = @accountID", {['@accountID'] = number})
    return result ~= nil
end