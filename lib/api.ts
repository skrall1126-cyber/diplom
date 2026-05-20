// API Client for Frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Helper function for API calls with auto token refresh
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    let response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If 401 Unauthorized, try to refresh token
    if (response.status === 401 && endpoint !== '/api/auth/refresh' && endpoint !== '/api/auth/login') {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
      
      if (refreshToken) {
        try {
          // Try to refresh the token
          const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            
            // Save new token
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', refreshData.token);
            }

            // Retry original request with new token
            headers['Authorization'] = `Bearer ${refreshData.token}`;
            response = await fetch(`${API_BASE_URL}${endpoint}`, {
              ...options,
              headers,
            });
          } else {
            // Refresh failed, logout
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              window.location.href = '/admin/login';
            }
            return { error: 'Нэвтрэх хугацаа дууссан байна' };
          }
        } catch (refreshError) {
          console.error('Token refresh error:', refreshError);
          return { error: 'Нэвтрэх хугацаа дууссан байна' };
        }
      } else {
        // No refresh token, logout
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/admin/login';
        }
        return { error: 'Нэвтрэх хугацаа дууссан байна' };
      }
    }

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Алдаа гарлаа' };
    }

    return { data };
  } catch (error: any) {
    console.error('API Error:', error);
    return { error: error.message || 'Сүлжээний алдаа' };
  }
}

// ============================================
// AUTHENTICATION API
// ============================================

export const authApi = {
  // Нэвтрэх
  async login(username: string, password: string) {
    return apiCall<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  // Бүртгүүлэх
  async register(data: {
    email: string;
    username: string;
    password: string;
    role: string;
    first_name: string;
    last_name: string;
    phone?: string;
  }) {
    return apiCall<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Хэрэглэгчийн мэдээлэл авах
  async getCurrentUser() {
    return apiCall<{ user: any }>('/api/auth/me', {
      method: 'GET',
    });
  },

  // Гарах
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/admin/login';
    }
  },

  // Token хадгалах
  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  },
  
  // Refresh token хадгалах
  saveRefreshToken(refreshToken: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', refreshToken);
    }
  },

  // User хадгалах
  saveUser(user: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Token авах
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },
  
  // Refresh token авах
  getRefreshToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  },

  // User авах
  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
  
  // Refresh access token
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('Refresh token олдсонгүй');
    }
    
    return apiCall<{ token: string }>('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
};

// ============================================
// STUDENTS API
// ============================================

export const studentsApi = {
  // Бүх оюутнууд
  async getAll(filters?: { major_id?: string; class_id?: string; status?: string }) {
    const params = new URLSearchParams();
    if (filters?.major_id) params.append('major_id', filters.major_id);
    if (filters?.class_id) params.append('class_id', filters.class_id);
    if (filters?.status) params.append('status', filters.status);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall<{ students: any[] }>(`/api/students${query}`, {
      method: 'GET',
    });
  },

  // Нэг оюутан
  async getById(id: string) {
    return apiCall<{ student: any }>(`/api/students/${id}`, {
      method: 'GET',
    });
  },

  // Оюутан үүсгэх
  async create(data: any) {
    return apiCall<{ student: any }>('/api/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Оюутан шинэчлэх
  async update(id: string, data: any) {
    return apiCall<{ student: any }>(`/api/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Оюутан устгах
  async delete(id: string) {
    return apiCall<{ message: string }>(`/api/students/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// TEACHERS API
// ============================================

export const teachersApi = {
  // Бүх багш нар
  async getAll(filters?: { department_id?: string }) {
    const params = new URLSearchParams();
    if (filters?.department_id) params.append('department_id', filters.department_id);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall<{ teachers: any[] }>(`/api/teachers${query}`, {
      method: 'GET',
    });
  },

  // Багш үүсгэх
  async create(data: any) {
    return apiCall<{ teacher: any }>('/api/teachers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// PAYMENTS API
// ============================================

export const paymentsApi = {
  // Бүх төлбөрүүд
  async getAll(filters?: { status?: string; semester?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.semester) params.append('semester', filters.semester);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall<{ payments: any[] }>(`/api/payments${query}`, {
      method: 'GET',
    });
  },

  // Төлбөр үүсгэх
  async create(data: any) {
    return apiCall<{ payment: any }>('/api/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// SALARIES API
// ============================================

export const salariesApi = {
  // Бүх цалингууд
  async getAll(filters?: { status?: string; month?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.month) params.append('month', filters.month);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall<{ salaries: any[] }>(`/api/salaries${query}`, {
      method: 'GET',
    });
  },

  // Цалин үүсгэх
  async create(data: any) {
    return apiCall<{ salary: any }>('/api/salaries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// CLASSES API
// ============================================

export const classesApi = {
  // Бүх ангиуд
  async getAll(filters?: { major_id?: string }) {
    const params = new URLSearchParams();
    if (filters?.major_id) params.append('major_id', filters.major_id);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall<{ classes: any[] }>(`/api/classes${query}`, {
      method: 'GET',
    });
  },

  // Анги үүсгэх
  async create(data: any) {
    return apiCall<{ class: any }>('/api/classes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// COURSES API
// ============================================

export const coursesApi = {
  // Бүх хичээлүүд
  async getAll(filters?: { major_id?: string }) {
    const params = new URLSearchParams();
    if (filters?.major_id) params.append('major_id', filters.major_id);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall<{ courses: any[] }>(`/api/courses${query}`, {
      method: 'GET',
    });
  },

  // Хичээл үүсгэх
  async create(data: any) {
    return apiCall<{ course: any }>('/api/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// MAJORS API
// ============================================

export const majorsApi = {
  // Бүх мэргэжлүүд
  async getAll(filters?: { department_id?: string }) {
    const params = new URLSearchParams();
    if (filters?.department_id) params.append('department_id', filters.department_id);

    const query = params.toString() ? `?${params.toString()}` : '';
    return apiCall<{ majors: any[] }>(`/api/majors${query}`, {
      method: 'GET',
    });
  },

  // Мэргэжил үүсгэх
  async create(data: any) {
    return apiCall<{ major: any }>('/api/majors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// DEPARTMENTS API
// ============================================

export const departmentsApi = {
  // Бүх тэнхимүүд
  async getAll() {
    return apiCall<{ departments: any[] }>('/api/departments', {
      method: 'GET',
    });
  },

  // Тэнхим үүсгэх
  async create(data: any) {
    return apiCall<{ department: any }>('/api/departments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!authApi.getToken();
}

// Check if user has role
export function hasRole(role: string): boolean {
  const user = authApi.getUser();
  return user?.role === role;
}

// Format currency
export function formatCurrency(amount: number): string {
  return `₮ ${amount.toLocaleString('mn-MN')}`;
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('mn-MN');
}
