export const CONTRACT_ADDRESS = "0x757EF6931Af10DaD63F0Cd428B643B3a91bd47f7";

export const ABI = [
    { "inputs": [], "name": "buyTicket", "outputs": [], "stateMutability": "payable", "type": "function" },
    { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "charity", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "CharitySent", "type": "event" },
    { "inputs": [], "name": "pickWinner", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "player", "type": "address" } ], "name": "TicketBought", "type": "event" },
    { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "winner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amountWon", "type": "uint256" } ], "name": "WinnerPicked", "type": "event" },
    { "inputs": [], "name": "CHARITY_PERCENTAGE", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "charityAddress", "outputs": [ { "internalType": "address payable", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getPlayers", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "lastWinner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "players", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "ticketPrice", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }
];