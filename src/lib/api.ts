const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Type definitions for API responses
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  therapist?: string;
  date: string;
  time: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no-show";
  createdAt: string;
  updatedAt: string;
}

interface Availability {
  date: string;
  allSlots: string[];
  bookedSlots: string[];
  availableSlots: string[];
}

interface BookingStats {
  total: number;
  byStatus: {
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
    [key: string]: number;
  };
  popularServices: Array<{
    _id: string;
    count: number;
  }>;
}

interface DashboardStats {
  stats: {
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    totalContacts: number;
    unreadContacts: number;
    uniqueClients: number;
    estimatedRevenue: number;
  };
  recentBookings: Array<{
    _id: string;
    name: string;
    service: string;
    date: string;
    time: string;
    status: string;
    createdAt: string;
  }>;
  recentContacts: Array<{
    _id: string;
    name: string;
    email: string;
    subject?: string;
    date: string;
    status: string;
    createdAt: string;
  }>;
}

interface NewsletterSubscriber {
  _id: string;
  email: string;
  status: "subscribed" | "unsubscribed";
  createdAt: string;
  updatedAt: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred");
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unexpected error occurred");
    }
  }

  // Contact API
  async createContact(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<ApiResponse<{ id: string }>> {
    return this.request<{ id: string }>("/contacts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getContacts(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Contact[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.request<Contact[]>(`/contacts${query ? `?${query}` : ""}`);
  }

  async getContactById(id: string): Promise<ApiResponse<Contact>> {
    return this.request<Contact>(`/contacts/${id}`);
  }

  async updateContact(
    id: string,
    data: { status?: string; notes?: string }
  ): Promise<ApiResponse<Contact>> {
    return this.request<Contact>(`/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteContact(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/contacts/${id}`, {
      method: "DELETE",
    });
  }

  // Booking API
  async createBooking(data: {
    name: string;
    phone: string;
    email: string;
    service: string;
    therapist?: string;
    date: string;
    time: string;
    message?: string;
  }): Promise<ApiResponse<{ id: string }>> {
    return this.request<{ id: string }>("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getBookings(params?: {
    status?: string;
    date?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<Booking[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.date) queryParams.append("date", params.date);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.request<Booking[]>(`/bookings${query ? `?${query}` : ""}`);
  }

  async getBookingById(id: string): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${id}`);
  }

  async getAvailableSlots(date: string): Promise<ApiResponse<Availability>> {
    return this.request<Availability>(`/bookings/availability/${date}`);
  }

  async updateBooking(
    id: string,
    data: {
      status?: string;
      notes?: string;
      therapist?: string;
      time?: string;
      date?: string;
      cancellationReason?: string;
    }
  ): Promise<ApiResponse<Booking>> {
    return this.request<Booking>(`/bookings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteBooking(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/bookings/${id}`, {
      method: "DELETE",
    });
  }

  async resendBookingEmail(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/bookings/${id}/resend-email`, {
      method: "POST",
    });
  }

  async getBookingStats(): Promise<ApiResponse<BookingStats>> {
    return this.request<BookingStats>("/bookings/stats");
  }

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<DashboardStats>("/dashboard/stats");
  }

  // Newsletter API
  async subscribeToNewsletter(email: string): Promise<ApiResponse<{ email: string }>> {
    return this.request<{ email: string }>("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async unsubscribeFromNewsletter(email: string): Promise<ApiResponse<void>> {
    return this.request<void>("/newsletter/unsubscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async getNewsletterSubscribers(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<NewsletterSubscriber[]>> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());

    const query = queryParams.toString();
    return this.request<NewsletterSubscriber[]>(
      `/newsletter/subscribers${query ? `?${query}` : ""}`
    );
  }

  async getNewsletterCount(): Promise<
    ApiResponse<{
      subscribed: number;
      unsubscribed: number;
      total: number;
    }>
  > {
    return this.request("/newsletter/count");
  }

  async deleteSubscriber(id: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/newsletter/${id}`, {
      method: "DELETE",
    });
  }
}

export const api = new ApiService(API_URL);
export default api;
