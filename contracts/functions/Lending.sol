// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import '../access/Ownable.sol';
import './Provider.sol';

contract MicroLending is Ownable {

    struct Loan {
        address providerAddress;
        uint totalAmount;
        uint totalToPay;
        uint amountReimbursed;
        uint contractedOn;
        uint expectedReimbursementDate;
        uint lastReimbursementDate;
    }

    modifier agentOf(address _provider, address _user) {
        Provider provider = Provider(_provider);
        require (provider.isEmployee(_user));
        _;
    }

    mapping (address => Loan[]) private loans;
    mapping (address => uint) private ongoingLoanCounts;

    event LoanCreated(uint indexed index, address indexed account, address indexed sender);
    event LoanReimbursed(uint indexed index, address indexed account, address indexed sender);

    // Interest rate in %
    function addLoan (address _customer, address _provider, uint _amount, uint interestRate, uint _deadline) external agentOf(_provider, _msgSender()){

        loans[_customer].push(Loan(_provider, _amount, _amount + (interestRate * _amount)/100, 0, block.timestamp, _deadline, block.timestamp));
        ongoingLoanCounts[_customer] += 1;
        emit LoanCreated(loans[_customer].length - 1, _customer, _msgSender());
    }

    function paySettlement (address _customer, address _provider, uint _amount) external agentOf(_provider, _msgSender()) {
        // Let us just loop the array and update once. We assume a provider cannot 
        // have two unpaid loans for a customer
        for (uint i = 0; i < loans[_customer].length; ++i) {
            Loan storage record = loans[_customer][i];
           if (record.totalAmount - record.amountReimbursed >= _amount) {
               // Only the provider can request for the payment
               require(record.providerAddress == _provider);
               record.amountReimbursed += _amount;
               if (record.amountReimbursed == record.totalToPay) {
                   ongoingLoanCounts[_customer] -= 1;
                   emit LoanReimbursed(i, _customer, _msgSender());
               }
               break;
           }
        }
    }

    function getCompleteLoanHistory (address _provider, address _customer) external view agentOf(_provider, _msgSender()) returns (Loan [] memory){
        return loans[_customer];
    }

    function getOngoingLoans (address _provider, address _customer) external view agentOf(_provider, _msgSender()) returns (Loan [] memory){
        uint _count = ongoingLoanCounts[_customer];
        Loan [] memory records = new Loan[](_count);
        Loan [] memory history = loans[_customer];

        uint j = 0;
        for (uint i = 0; i < history.length && j - 1 < _count; ++i) {
            if (history[i].amountReimbursed < history[i].totalToPay) {
                records[j] = history[i];
                j++;
            }
        }
        return records;
    }

    function getPaidLoans (address _provider, address _customer) external view agentOf(_provider, _msgSender()) returns (Loan [] memory){
        Loan [] memory history = loans[_customer];
        uint _count = history.length - ongoingLoanCounts[_customer];
        Loan [] memory records = new Loan[](_count);

        uint j = 0;
        for (uint i = 0; i < history.length && j - 1 < _count; ++i) {
            if (history[i].amountReimbursed == history[i].totalToPay) {
                records[j] = history[i];
                j++;
            }
        }
        return records;
    }
}