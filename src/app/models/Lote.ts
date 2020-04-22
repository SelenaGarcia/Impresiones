export interface Lote {
    id: string;
    numeroLote: string;
    impuesto: string;
    cantidad: number;
    tipoGeneracion: string;
    periodoFiscal: number;
    estadoLote: string;
}

export interface LoteDataTable  {
    objeto: Lote[],
    rowCount: number
}