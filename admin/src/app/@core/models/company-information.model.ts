import { Address } from "./address/address.model";

export class CompanyInformation {
    companyInformationId: number;
    companyName: string;
    companyAddress: Address
    companyPhoneNumber: string;
    companyVatNumber: string;
}