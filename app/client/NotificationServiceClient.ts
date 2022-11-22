export interface Notification {
  _id: string;
  title: string;
  message: string;
  link: string;
  userId: string;
  read: boolean;
  unixTime: number;
}

export class NotificationServiceClient {
  constructor(private baseUrl: string) {}

  async vapidPublicKey() {
    const response = await fetch(`${this.baseUrl}/vapidPublicKey`);
    return await response.text();
  }

  async getNotifications(userId: number) {
    const response = await fetch(`${this.baseUrl}/notification`, {
      headers: {
        "User-Id": `${userId}`,
      },
    });
    const notifications: Notification[] = await response.json();
    return notifications;
  }

  async markNotificationAsRead(userId: number, notificationId: string) {
    await fetch(`${this.baseUrl}/notification/${notificationId}`, {
      method: "PATCH",
      headers: {
        "User-Id": `${userId}`,
      },
      body: JSON.stringify({
        read: true,
      }),
    });
  }

  async notificationSubscribe(userId: number, subscription: string) {
    await fetch(`${this.baseUrl}/notificationSubscribe`, {
      method: "POST",
      headers: {
        "User-Id": `${userId}`,
      },
      body: subscription,
    });
  }
}
