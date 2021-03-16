// SPDX-License-Identifier: Unlicensed
pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "./customermanagement.sol";

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

    modifier agentOf(uint256 _providerId) {
        uint256 index = getAgentIndex(msg.sender);
        require(index > 0 && employeeToProvider[index] == _providerId);
        require(getAgentIndex(msg.sender) > 0);
        _;
    }

    event LoanCreated(
        uint256 indexed _index,
        uint256 indexed _customerId,
        uint256 indexed _providerId
    );
    event LoanReimbursed(
        uint256 indexed _index,
        uint256 indexed _customerId,
        uint256 indexed _providerId
    );

    Loan[] public loans;
    mapping(uint256 => uint256) loanToCustomer;

    // Interest rate in %
    function addLoan(
        uint256 _customerId,
        uint256 _providerId,
        uint256 _amount,
        uint256 interestRate,
        uint256 _deadline
    ) external agentOf(_providerId) {
        require(_deadline > block.timestamp);
        loans.push(
            Loan(
                _amount,
                _amount + (interestRate * _amount) / 100,
                0,
                block.timestamp,
                _deadline,
                block.timestamp
            )
        );
        uint256 index = loans.length - 1;
        loanToCustomer[index] = _customerId;
        customers[_customerId].loansCount = customers[_customerId]
            .loansCount
            .add(1);
        customers[_customerId].ongoingLoans = customers[_customerId]
            .ongoingLoans
            .add(1);
        emit LoanCreated(index, _customerId, _providerId);
    }

    function paySettlement(
        uint256 _loanId,
        uint256 _providerId,
        uint256 _amount
    ) external agentOf(_providerId) {
        // Let us just loop the array and update once. We assume a provider cannot
        // have two unpaid loans for a customer
        require(
            loans[_loanId].amountReimbursed + _amount <=
                loans[_loanId].totalAmount
        );
        loans[_loanId].amountReimbursed = loans[_loanId].amountReimbursed.add(
            _amount
        );
        loans[_loanId].lastReimbursementDate = block.timestamp;

        if (loans[_loanId].amountReimbursed == loans[_loanId].totalToPay) {
            uint256 _customerId = loanToCustomer[_loanId];
            customers[_customerId].ongoingLoans = customers[_customerId]
                .ongoingLoans
                .sub(1);
            emit LoanReimbursed(_loanId, _customerId, _providerId);
        }
    }

    function getCompleteLoanHistory(uint256 _customerId)
        external
        view
        onlyAgent
        returns (Loan[] memory)
    {
        uint256 ongoing = customers[_customerId].loansCount;
        Loan[] memory ongoingLoans = new Loan[](ongoing);
        uint256 j = 0;
        for (uint256 i = 0; i < loans.length && j < ongoing - 1; i++) {
            if (loanToCustomer[i] == _customerId) {
                ongoingLoans[j] = loans[i];
                j++;
            }
        }
        return ongoingLoans;
    }

    function getOngoingLoans(uint256 _customerId)
        external
        view
        onlyAgent
        returns (Loan[] memory)
    {
        uint256 ongoing = customers[_customerId].loansCount;
        Loan[] memory ongoingLoans = new Loan[](ongoing);
        uint256 j = 0;
        for (uint256 i = 0; i < loans.length && j < ongoing - 1; ++i) {
            if (
                loanToCustomer[i] == _customerId &&
                loans[i].amountReimbursed < loans[i].totalToPay
            ) {
                ongoingLoans[j] = loans[i];
                j++;
            }
        }
        return ongoingLoans;
    }

    function getPaidLoans(uint256 _customerId)
        external
        view
        onlyAgent
        returns (Loan[] memory)
    {
        uint256 ongoing = customers[_customerId].loansCount;
        Loan[] memory ongoingLoans = new Loan[](ongoing);
        uint256 j = 0;
        for (uint256 i = 0; i < loans.length && j < ongoing - 1; ++i) {
            if (
                loanToCustomer[i] == _customerId &&
                loans[i].amountReimbursed == loans[i].totalToPay
            ) {
                ongoingLoans[j] = loans[i];
                j++;
            }
        }
        return ongoingLoans;
    }

    function getAllLoans() external view returns (Loan [] memory, uint256 [] memory customerIds) {
        customerIds = new uint256[] (loans.length);
        for (uint i = 0; i < loans.length; i++) {
            customerIds[i] = loanToCustomer[i];
        }
        return (loans, customerIds);
    }
}
