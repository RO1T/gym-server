export interface EmailRequest {
  email: string;
}

export interface EmailResponse {
  id: string;
  email: string;
}

export interface ConfirmCodeRequest {
  id: string;
  email: string;
}

export interface ConfirmCodeResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  token: string;
  email: string;
}

