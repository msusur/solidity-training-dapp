pragma solidity ^0.4.18;

contract Training {

    address owner;
    string participationUrl;
    uint256 deposit;
    uint studentLimit;
    uint registeredUserCount;
    bool isActive;
    mapping(address => Student) students;
    mapping(uint => address) studentsIndex;

    struct Student {
        string email;
        bool validated;
        address addr;
    }

    event StudentRegistered(address addr, string email);

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function Training(uint256 _deposit, uint _studentLimit) public {
        owner = msg.sender;
        isActive = true;

        if(_deposit != 0) {
            deposit = _deposit;
        } else {
            deposit = 5 ether;
        }

        if(_studentLimit != 0) {
            studentLimit = _studentLimit;
        } else {
            studentLimit = 30;
        }
    }

    /* Student Stuff */

    function registerToEvent(string email) payable public {
        require(msg.value == deposit);
        require(!isRegistered(msg.sender));
        require(registeredUserCount < studentLimit);

        registeredUserCount++;
        students[msg.sender] = Student(email, false, msg.sender);
        studentsIndex[registeredUserCount] = msg.sender;

        StudentRegistered(msg.sender, email);
    }

    function isRegistered(address _addr) public constant returns (bool) {
		return students[_addr].addr != address(0);
	}

	function getMeParticipationUrl() public constant returns (string) {
	    require(isRegistered(msg.sender));
	    Student storage student = students[msg.sender];
	    require(student.validated);
	    return participationUrl;
	}

	/* Admin Stuff */

	function getStudent(uint idx) public constant onlyOwner returns (uint index, string email) {
	    address studentAddr = studentsIndex[idx];
	    Student storage student = students[studentAddr];
	    return (idx, student.email);
	}

	function validateStudentStatus(uint idx, bool isValidated) public onlyOwner {
	    address studentAddr = studentsIndex[idx];
	    Student storage student = students[studentAddr];
	    student.validated = isValidated;
	}

	function setParticipationLink(string url) public onlyOwner {
	    participationUrl = url;
	}

}
