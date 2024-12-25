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
  isCattery: boolean;
}

export interface ICatPedigree {
  mother: IShortCat;
  father: IShortCat;
  children: Array<IShortCat>;
  partner: IShortCat;
}

export interface IShortCat {
  id: string;
  name: string;
  gender: string;
  photoUrl: string;
}
