export type Member = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  membershipDate: string;
  status: "ACTIVE" | "INACTIVE";
};