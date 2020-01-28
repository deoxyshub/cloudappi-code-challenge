import { http } from "@/http-common";
import { User } from "@/app/models/models";

export abstract class UserApi {
  private static serviceAPI: string = process.env.VUE_APP_ROOT_API;

  static async getAllUsers(): Promise<User[]> {
    let response = await http.get<User[]>(`${this.serviceAPI}/users`);
    return response.data;
  }

  static async getUser(userId: number): Promise<User> {
    let response = await http.get<User>(`${this.serviceAPI}/users/${userId}`);
    return response.data;
  }

  static async createUser(user: User): Promise<void> {
    await http.post(`${this.serviceAPI}/users`, {
      user: user
    });
  }

  static async updateUser(user: User): Promise<void> {
    await http.put(`${this.serviceAPI}/users/${user.id}`, {
      user: user
    });
  }

  static async removeUsers(userIds: Array<number>): Promise<void> {
    let requests = userIds.map(userId =>
      http.delete(`${this.serviceAPI}/users/${userId}`)
    );

    await Promise.all(requests);
  }
}
