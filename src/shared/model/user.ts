export interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const mockUserResponse: UserResponse = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  createdAt: "2021-01-01",
  updatedAt: "2021-01-01",
};