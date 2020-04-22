export interface Dialogo{
    titulo: 'Atención' | 'Error' | 'Mensaje',
    icono: 'warning' | 'error' | 'done',
    estado: boolean,
    mensaje: string 
}