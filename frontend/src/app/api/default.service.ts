import Axios from "axios";
import { User } from "@/app/models/models";

export abstract class UserApi {
  private static usersAxios = Axios.create({
    timeout: 10000,
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  static async getAllUsers(): Promise<User[]> {
    let response = await this.usersAxios.get<User[]>(
      "http://localhost:8082/users"
    );
    return response.data;
  }

  static async getUser(userId: number): Promise<User> {
    let response = await this.usersAxios.get<User>(
      `http://localhost:8082/users/${userId}`
    );
    return response.data;
  }

  static async createUser(user: User): Promise<void> {
    let response = await this.usersAxios.post(`http://localhost:8082/users`, {
      user: user
    });
  }

  static async updateUser(user: User): Promise<void> {
    let response = await this.usersAxios.put(
      `http://localhost:8082/users/${user.id}`,
      { user: user }
    );
  }

  static async removeUsers(userIds: Array<number>): Promise<void> {
    let requests = userIds.map(userId =>
      this.usersAxios.delete(`http://localhost:8082/users/${userId}`)
    );
    let responses = await Promise.all(requests);

    //TODO: catch errors
  }
}
