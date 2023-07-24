import { District } from "./districts.model";
import { Province } from "./provinces.model";
import { Ward } from "./wards.model";

export class Address {
    id: number;
    roadName: string;
    ward?: Ward
    district?: District
    province?: Province
}