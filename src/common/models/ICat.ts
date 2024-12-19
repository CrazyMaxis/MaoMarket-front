export interface ICat {
  id: string;
  name: string;
  gender: string;
  breed: string;
  birthDate: string;
  description: string;
  photos: [
    {
      id: string;
      url: string;
    },
  ];
}

export interface ICatPedigree {
  mother: IUserCat;
  father: IUserCat;
  children: Array<IUserCat>;
  partner: IUserCat;
}

export interface IUserCat {
  id: string;
  name: string;
  gender: string;
  photoUrl: string;
}
