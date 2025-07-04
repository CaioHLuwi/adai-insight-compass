import { supabase } from "@/integrations/supabase/client";

export class ProfileService {
  private static async getAuthToken(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  }

  static async getProfile() {
    const token = await this.getAuthToken();
    if (!token) throw new Error("No authentication token");

    const response = await fetch("/api/profile", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.json();
  }

  static async updateProfile(data: any) {
    const token = await this.getAuthToken();
    if (!token) throw new Error("No authentication token");

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return response.json();
  }

  static async uploadAvatar(file: File) {
    const token = await this.getAuthToken();
    if (!token) throw new Error("No authentication token");

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch("/api/profile/avatar", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    });

    return response.json();
  }

  static async deleteAvatar() {
    const token = await this.getAuthToken();
    if (!token) throw new Error("No authentication token");

    const response = await fetch("/api/profile/avatar", {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    return response.json();
  }

  static async changePassword(currentPassword: string, newPassword: string) {
    const token = await this.getAuthToken();
    if (!token) throw new Error("No authentication token");

    const response = await fetch("/api/profile/change-password", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword
      })
    });

    return response.json();
  }
}


