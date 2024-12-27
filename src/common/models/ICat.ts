import { IBreed } from './IBreed';

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
}

export interface IShortCat {
  id: string;
  name: string;
  gender: string;
  photoUrl: string;
  breed: IBreed;
}
