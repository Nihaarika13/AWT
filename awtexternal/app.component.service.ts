export class profileService {
  private users = [
    { id: 1, name: "sai", branch: "IT" },
    { id: 2, name: "sree", branch: "cse" },
    { id: 3, name: "ram", branch: "IT" }
  ];

  getUser() {
    return this.users;
  }

  addUser(newUser: { id: number; name: string; branch: string }) {
    this.users.push(newUser);
  }

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  updateUser(updatedUser: { id: number; name: string; branch: string }) {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }
}
