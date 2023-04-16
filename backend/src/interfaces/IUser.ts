interface IUser {
  _id?: string,
  username: string,
  password: string,
  bytes?: number,
  availableCategories?: string[];
}

export default IUser;
