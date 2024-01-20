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
}
  
// database class
class Database {
    constructor() {
        this.accountMap = new Map();
        this.passwordMap = new Map();
        var fs = require("fs")
        fs.open('accounts.txt', 'r+', function(err, fd) {
            if (err) {
                return console.error(err);
            }  
        });
        fs.writeFile('accounts.txt', 'email,password,InternshipPreferences\n', function(err) {
            if (err) {
                return console.error(err);
            }
        fs.readFile('accounts.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log(data.toString);
            });
        });
    }
    addAccount(Account) {
        if (this.accountMap.has(Account.email)) {
            return EMAIL_IN_USE
        }
        this.accountMap.set(Account.email, Account);
        this.passwordMap.set(Account.email, Account.password)
    }
    deleteAccount(Account) {
        if (!this.accountMap.has(Account.email)) {
            return ACCOUNT_NOT_FOUND
        }
        this.accountMap.delete(Account.email)
        this.passwordMap.delete(Account.email)
    }
    verifyAccount(Account, password) {
        if (!this.accountMap.has(Account.email)) {
            return ACCOUNT_NOT_FOUND
        }
        if (this.passwordMap.get(Account.email) == password) {
            return VALID
        } else {
            return ACCOUNT_NOT_FOUND
        }
    }
    getPreferences(Account) {
        if (!this.accountMap.has(Account.email)) {
            return ACCOUNT_NOT_FOUND
        }
        return this.accountMap.get(Account.email).InternshipPreferences
    }
}

// main for test
let base = new Database()
base.addAccount(new Account("blah", "pass", null))
console.log(base.passwordMap.get("blah"))
