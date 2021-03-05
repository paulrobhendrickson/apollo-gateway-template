import { NODE_ENV, currentEnv } from "../config/nodeEnv";

import dotenv from "dotenv";
dotenv.config();

type serviceType = {
  name: string;
  maintainer: string;
  git_repo: string;
  dev_url: string;
  stage_url: string;
  prod_url: string;
};

export const parseServices = (...service: serviceType[] | any[]) => {
  const filtered: serviceType[] = service.filter((ser) => checkService(ser));

  return filtered.map((srv) => ({
    url: getURL(srv),
    name: srv.name,
  }));
};

const checkService = (service: serviceType) => {
  if (
    !service.hasOwnProperty("name") ||
    !service.hasOwnProperty("maintainer") ||
    !service.hasOwnProperty("git_repo") ||
    !service.hasOwnProperty("dev_url") ||
    !service.hasOwnProperty("stage_url") ||
    !service.hasOwnProperty("prod_url")
  ) {
    return false;
  }

  if (
    typeof service.name !== "string" ||
    service.name.length < 1 ||
    typeof service.maintainer !== "string" ||
    service.maintainer.length < 1 ||
    !validURL(service.git_repo)
  ) {
    return false;
  }

  switch (currentEnv) {
    case NODE_ENV.DEV:
      return validURL(service.dev_url);

    case NODE_ENV.STAGE:
      return validURL(service.stage_url);

    case NODE_ENV.PROD:
      return validURL(service.prod_url);

    default:
      return validURL(service.dev_url);
  }
};

// got from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
const validURL = (str: any) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return (
    !!pattern.test(str) ||
    (typeof str === "string" && str.startsWith("http://localhost:"))
  );
};

const getURL = (service: serviceType) => {
  switch (currentEnv) {
    case NODE_ENV.DEV:
      return service.dev_url;
    case NODE_ENV.STAGE:
      return service.stage_url;
    case NODE_ENV.PROD:
      return service.prod_url;
    default:
      return service.dev_url;
  }
};
