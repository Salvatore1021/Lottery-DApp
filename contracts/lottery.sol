// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleLottery {
    address public owner;
    address[] public players;
    address public lastWinner;

    // --- FIX 1: Price is now fixed to exactly 0.01 ETH ---
    uint256 public ticketPrice = 0.01 ether; 
    
    // --- FIX 2: Charity is set automatically (to owner) for simplicity ---
    address payable public charityAddress;
    uint256 public constant CHARITY_PERCENTAGE = 10;

    event TicketBought(address indexed player);
    event WinnerPicked(address indexed winner, uint256 amountWon);
    event CharitySent(address indexed charity, uint256 amount);

    constructor() {
        owner = msg.sender;
        // We set charity to the owner temporarily so deployment is easy
        charityAddress = payable(msg.sender);
    }

    function buyTicket() external payable {
        // FIX 3: Clearer error message
        require(msg.value == ticketPrice, "Send exactly 0.01 ETH to join");

        players.push(msg.sender);
        emit TicketBought(msg.sender);
    }

    function pickWinner() external {
        require(msg.sender == owner, "Only owner can pick winner");
        require(players.length > 0, "No players in lottery");

        // Simple Random Logic
        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, players, block.prevrandao))
        );

        uint256 winnerIndex = randomNumber % players.length;
        address payable winner = payable(players[winnerIndex]);

        // Calculate Splits
        uint256 totalPot = address(this).balance;
        uint256 charityAmount = (totalPot * CHARITY_PERCENTAGE) / 100;
        uint256 winnerAmount = totalPot - charityAmount;

        // Send Money
        (bool successCharity, ) = charityAddress.call{value: charityAmount}("");
        require(successCharity, "Charity transfer failed");
        emit CharitySent(charityAddress, charityAmount);

        (bool successWinner, ) = winner.call{value: winnerAmount}("");
        require(successWinner, "Winner transfer failed");
        
        lastWinner = winner;
        emit WinnerPicked(winner, winnerAmount);

        // Reset
        delete players;
    }

    function getPlayers() external view returns (address[] memory) {
        return players;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}