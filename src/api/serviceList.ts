import { parseServices } from "./utils/parseServices";

const serviceOne = require("../../endpoints/serviceOne.json");
const serviceTwo = require("../../endpoints/serviceTwo.json");

export const serviceList = parseServices(serviceOne, serviceTwo);
