export interface LoteImpresion {
    id?: string;
    numeroLote: string;
    desde: number;
    hasta: number;
    impresora: string;
    cantidad: number;
    estado: string;
    fecha: string;
}