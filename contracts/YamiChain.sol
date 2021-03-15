// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import './customermanagement.sol';

contract YamiChain is CustomerManagement {
    struct Loan {
        uint256 totalAmount;
        uint256 totalToPay;
        uint256 amountReimbursed;
        uint256 contractedOn;
        uint256 expectedReimbursementDate;
        uint256 lastReimbursementDate;
    }

    using SafeMath for uint256;

    modifier agentOf(uint _providerId) {
        uint index = getAgentIndex(msg.sender);
        require (index > 0 && employeeToProvider[index] == _providerId);
        require(getAgentIndex(msg.sender) > 0);
        _;
    }

    event LoanCreated(uint indexed _index, uint indexed _customerId, uint indexed _providerId);
    event LoanReimbursed(uint indexed _index, uint indexed _customerId, uint indexed _providerId);

    Loan [] public loans;
    mapping (uint => uint) loanToCustomer;

    // Interest rate in %
    function addLoan(uint _customerId, uint _providerId, uint256 _amount, uint256 interestRate, uint256 _deadline) external agentOf(_providerId) {
        require(_deadline > block.timestamp);
        loans.push(Loan(_amount, _amount + (interestRate * _amount) / 100, 0, block.timestamp, _deadline, block.timestamp));
        uint index = loans.length - 1;
        loanToCustomer[index] = _customerId;
        customers[_customerId].loansCount = customers[_customerId].loansCount.add(1);
        customers[_customerId].ongoingLoans = customers[_customerId].ongoingLoans.add(1);
        emit LoanCreated(index, _customerId, _providerId);
    }

    function paySettlement(uint _loanId, uint _providerId, uint256 _amount) external agentOf(_providerId) {
        // Let us just loop the array and update once. We assume a provider cannot
        // have two unpaid loans for a customer
        require(loans[_loanId].amountReimbursed + _amount <= loans[_loanId].totalAmount);
        loans[_loanId].amountReimbursed = loans[_loanId].amountReimbursed.add(_amount);
        loans[_loanId].lastReimbursementDate = block.timestamp;

        if (loans[_loanId].amountReimbursed == loans[_loanId].totalToPay) {
            uint _customerId = loanToCustomer[_loanId];
            customers[_customerId].ongoingLoans = customers[_customerId].ongoingLoans.sub(1);
            emit LoanReimbursed(_loanId, _customerId, _providerId);
        }
    }

    function getCompleteLoanHistory(uint _customerId) external view onlyAgent returns (Loan[] memory)
    {
        uint ongoing = customers[_customerId].loansCount;
        Loan [] memory ongoingLoans = new Loan [] (ongoing);
        uint j = 0;
        for (uint i = 0; i < loans.length && j < ongoing - 1; ++i) {
            if (loanToCustomer[i] == _customerId) {
                ongoingLoans[j] = loans[i];
                j++;
            }
        }
        return ongoingLoans;
    }

    function getOngoingLoans(uint _customerId) external view onlyAgent returns (Loan[] memory) {
        uint ongoing = customers[_customerId].loansCount;
        Loan [] memory ongoingLoans = new Loan [] (ongoing);
        uint j = 0;
        for (uint i = 0; i < loans.length && j < ongoing - 1; ++i) {
            if (loanToCustomer[i] == _customerId && loans[i].amountReimbursed < loans[i].totalToPay) {
                ongoingLoans[j] = loans[i];
                j++;
            }
        }
        return ongoingLoans;    
    }

    function getPaidLoans(uint _customerId) external view onlyAgent returns (Loan[] memory) {
        uint ongoing = customers[_customerId].loansCount;
        Loan [] memory ongoingLoans = new Loan [] (ongoing);
        uint j = 0;
        for (uint i = 0; i < loans.length && j < ongoing - 1; ++i) {
            if (loanToCustomer[i] == _customerId && loans[i].amountReimbursed == loans[i].totalToPay) {
                ongoingLoans[j] = loans[i];
                j++;
            }
        }
        return ongoingLoans;
    }
}