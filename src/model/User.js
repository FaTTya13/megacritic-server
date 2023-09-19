class User {
    constructor(id, username, email, password, registryDate, lastLoginDate, role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.registryDate = registryDate;
        this.lastLoginDate = lastLoginDate;
        this.role = role;
    }
}

module.exports = User;