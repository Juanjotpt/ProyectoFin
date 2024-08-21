export class UsuarioModel {
  constructor(
    public id_usuario: number,
    public email: string,
    public nombre: string,
    public apellidos: string,
    public password: string,
    public direccion: string,
    public dni: string,
  ) {}
}
