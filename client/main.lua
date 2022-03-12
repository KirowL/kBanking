ESX = nil

print("Started")
local isMenuOpened = false

Citizen.CreateThread(function()
	while ESX == nil do
	  TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
	  Citizen.Wait(1)
    end

    while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
    end

    ESX.PlayerData = ESX.GetPlayerData()
end)




CreateThread(function()
    while true do
        timeout = 500
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        for _, Zone in pairs(Config.Zones) do
            local distance = GetDistanceBetweenCoords(playerCoords.x, playerCoords.y, playerCoords.z, Zone.x, Zone.y, Zone.z, false)
            if distance <= Zone.radius then 
                timeout = 1
                playerCoords = GetEntityCoords(playerPed)
                distance = GetDistanceBetweenCoords(playerCoords.x, playerCoords.y, playerCoords.z, Zone.x, Zone.y, Zone.z, false)
                ESX.ShowHelpNotification('Appuyez sur ~INPUT_PICKUP~ pour ~g~accéder à votre compte~s~.', false, true)
                if IsControlJustPressed(1, 38) then
                    ESX.TriggerServerCallback("kBanking:RequestPlayerData", function(playerInfos)
                        print(playerInfos.bank)
                        SetNuiFocus(true, true)
                        isMenuOpened = true
                        SendNuiMessage(json.encode({
                            type = "openBank",
                            playerData = playerInfos
                        }))
                    end)
                end
            end
        end
        
        Wait(timeout)
    end
end)


RegisterNUICallback("closeMenu", function()
    SetNuiFocus(false, false)
    isMenuOpened = false
end)