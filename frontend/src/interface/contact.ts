export default interface IContact {
  id: string;
  fullname: string;
  phone?: string;
  birthday?: string;
  address?: string;
  email?: string;
  note?: string;
  tags?: string[];
  imageUrl?: string;
}
