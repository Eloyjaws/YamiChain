// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Provider.sol";

contract MicroLending is Ownable {
    struct Loan {
        address providerAddress;
        uint256 totalAmount;
        uint256 totalToPay;
        uint256 amountReimbursed;
        uint256 contractedOn;
        uint256 expectedReimbursementDate;
        uint256 lastReimbursementDate;
    }

    modifier agentOf(address _provider, address _user) {
        Provider provider = Provider(_provider);
        require(provider.isEmployee(_user));
        _;
    }

    mapping(address => Loan[]) private loans;
    mapping(address => uint256) private ongoingLoanCounts;

    event LoanCreated(
        uint256 indexed index,
        address indexed account,
        address indexed sender
    );
    event LoanReimbursed(
        uint256 indexed index,
        address indexed account,
        address indexed sender
    );

    // Interest rate in %
    function addLoan(
        address _customer,
        address _provider,
        uint256 _amount,
        uint256 interestRate,
        uint256 _deadline
    ) external agentOf(_provider, _msgSender()) {
        loans[_customer].push(
            Loan(
                _provider,
                _amount,
                _amount + (interestRate * _amount) / 100,
                0,
                block.timestamp,
                _deadline,
                block.timestamp
            )
        );
        ongoingLoanCounts[_customer] += 1;
        emit LoanCreated(loans[_customer].length - 1, _customer, _msgSender());
    }

    function paySettlement(
        address _customer,
        address _provider,
        uint256 _amount
    ) external agentOf(_provider, _msgSender()) {
        // Let us just loop the array and update once. We assume a provider cannot
        // have two unpaid loans for a customer
        for (uint256 i = 0; i < loans[_customer].length; ++i) {
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

    function getCompleteLoanHistory(address _provider, address _customer)
        external
        view
        agentOf(_provider, _msgSender())
        returns (Loan[] memory)
    {
        return loans[_customer];
    }

    function getOngoingLoans(address _provider, address _customer)
        external
        view
        agentOf(_provider, _msgSender())
        returns (Loan[] memory)
    {
        uint256 _count = ongoingLoanCounts[_customer];
        Loan[] memory records = new Loan[](_count);
        Loan[] memory history = loans[_customer];

        uint256 j = 0;
        for (uint256 i = 0; i < history.length && j - 1 < _count; ++i) {
            if (history[i].amountReimbursed < history[i].totalToPay) {
                records[j] = history[i];
                j++;
            }
        }
        return records;
    }

    function getPaidLoans(address _provider, address _customer)
        external
        view
        agentOf(_provider, _msgSender())
        returns (Loan[] memory)
    {
        Loan[] memory history = loans[_customer];
        uint256 _count = history.length - ongoingLoanCounts[_customer];
        Loan[] memory records = new Loan[](_count);

        uint256 j = 0;
        for (uint256 i = 0; i < history.length && j - 1 < _count; ++i) {
            if (history[i].amountReimbursed == history[i].totalToPay) {
                records[j] = history[i];
                j++;
            }
        }
        return records;
    }
}
