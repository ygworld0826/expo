import { getCode } from "./api";
import { Contract, Transaction } from "../types/contract";

export const fetchContactDetails = async (address: string): Promise<Contract> => {
  const code = await getCode(address);
  if (code === "0x") throw new Error("Not a contract address");

  const interactions: Transaction[] = [];

  return {
    address,
    code,
    interactions,
  };
};