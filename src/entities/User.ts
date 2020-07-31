import {uuid} from 'uuidv4';

export class User {
  public readonly id: string;

  public name: string;
  public email: string;
  public passwor: string;

  constructor(props: Omit<User, id>, id? : string){
    Object.assign(props, this);

    if(!id) {
      this.id = uuid();
    }
  };
}