export class ListRolesModel {
  total: number | null;
  roles: {
      data: RolModel[],
  }
}

export class RolModel {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
