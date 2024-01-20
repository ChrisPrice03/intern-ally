const EMAIL_IN_USE = -1
const ACCOUNT_NOT_FOUND = -2
const VALID = 1

// textfile format:
// email,password,prefSalary,prefSkills,prefDegree,prefLocation\n
// class InternshipPreferences
class InternshipPreferences {
    constructor(prefSalary, prefSkills, prefDegree, prefLocation) {
        this.prefSalary = prefSalary
        this.prefSkills = prefSkills
        this.prefDegree = prefDegree
        this.prefLocation = prefLocation
    }
    setSalary(salary) {
        this.prefSalary = salary
    }
    setSkills(skills) {
        this.prefSkills = skills
    }
    setDegree(degree) {
        this.prefDegree = degree
    }
    setLocation(location) {
        this.prefLocation = location
    }
    getSalary() {
        return this.prefSalary
    }
    getSkills() {
        return this.prefSkills
    }
    getDegree() {
        return this.prefDegree
    }
    getLocation() {
        return this.prefLocation
    }
    printPref() {
        return this.getSalary() + "," + this.getSkills() + "," + this.getDegree() + "," + this.getLocation() + "\n";
    }
}

// account class
class Account {
    constructor(email, password, InternshipPreferences) {
        this.email = email
        this.password = password
        this.InternshipPreferences = InternshipPreferences
    }
    getPreferences() {
        return this.InternshipPreferences
    }
    print() {
        return this.email + "," + this.password + "," + this.getPreferences().printPref();
    }
}
  
// database class
class Database {
    constructor() {
        this.accountMap = new Map(); // key: email / val: Account
        this.passwordMap = new Map(); // key: email / val: password
        var fs = require("fs")
        fs.open('accounts.txt', 'a+', function(err, fd) {
            if (err) {
                return console.error(err);
            }  
        });
        let buffer = new String;
        fs.readFile('accounts.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            buffer = data.toString();
        });
        let accounts = new Array;
        accounts = buffer.split('\n')
        for (let i = 0; accounts.size; i++) {
            this.addAccount(new Account(accounts[i].toString().split(',')[0], accounts[i].toString().split(',')[1]), new InternshipPreferences(accounts[i].toString().split(',')[2], accounts[i].toString().split(',')[3], accounts[i].toString().split(',')[4], accounts[i].toString().split(',')[5]))
        }
    }
    addAccount(Account) {
        if (this.accountMap.has(Account.email)) {
            return EMAIL_IN_USE
        }
        var fs = require("fs")
        fs.open('accounts.txt', 'a+', function(err, fd) {
            if (err) {
                return console.error(err);
            }  
        });
        fs.writeFile('accounts.txt', Account.print(), function(err) {
            if (err) {
                return console.error(err);
            }
        });
        this.accountMap.set(Account.email, Account)
        this.passwordMap.set(Account.email, Account.password)
    }
    deleteAccount(email) {
        if (!this.accountMap.has(email)) {
            return ACCOUNT_NOT_FOUND
        }
        let a = accountMap.get(email)
        var fs = require("fs")
        fs.open('accounts.txt', 'a+', function(err, fd) {
            if (err) {
                return console.error(err);
            }  
        });
        let buffer = new String;
        fs.readFile('accounts.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            buffer = data.toString();
        });
        buffer = buffer.split("\n")
        let i = 1;
        for (i; i < buffer.size; i++) {
            if (buffer[i] == a.print()) {
                break;
            }
        }
        // account on line i
        this.accountMap.delete(email)
        this.passwordMap.delete(email)
    }
    verifyAccount(email, password) {
        if (!this.accountMap.has(email)) {
            return ACCOUNT_NOT_FOUND
        }
        if (this.passwordMap.get(email) == password) {
            return VALID
        } else {
            return ACCOUNT_NOT_FOUND
        }
    }
    getPreferences(email) {
        if (!this.accountMap.has(email)) {
            return ACCOUNT_NOT_FOUND
        }
        return this.accountMap.get(email).InternshipPreferences
    }
}

// main for test
let base = new Database()
base.addAccount(new Account("blah", "pass", new InternshipPreferences("a","b","c","d")))
console.log(base.passwordMap.get("blah"))
console.log(base.accountMap.get("blah").print())
//console.log(base.verifyAccount())
