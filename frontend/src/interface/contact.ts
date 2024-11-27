interface Person {
  id: string;
  name: string;
}

export interface Contact extends Person {
  phone?: string;
  website?: string;
  birthday?: string;
  address?: string;
  email?: string;
  company?: string;
  notes?: string[];
  tags?: string[];
  groups?: string[];
  imageUrl?: string;
}

export interface OuterContactData extends Person {
  groups?: string[];
  tags?: string[];
}
