export interface Documento {
    Id: number;
    CPF: string;
    RG: number;
    DtEmissaoRG?: string | null | undefined;
    OrgaoExpeditor?: string | null | undefined;
    UF_RG?: string | null | undefined;
    CTPS?: number | null | undefined;
    SerieCTPS?: number | null | undefined;
    DtEmissaoCTPS?: string | null | undefined;
    UF_CTPS?: string | null | undefined;
    PIS?: string;
}