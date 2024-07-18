import { ClassValue } from "../../types";


export default function classNames(...args: ClassValue[]): string {
    return args
      .reduce((acc: string[], val: ClassValue) => {
        if (typeof val === "string") {
          return acc.concat(val.split(" "));
        } else if (typeof val === "object" && val !== null) {
          const classes = Object.entries(val).reduce((acc, [key, value]) => {
            if (value) {
              acc.push(key);
            }
            return acc;
          }, [] as string[]);
          return acc.concat(classes);
        }
        return acc;
      }, [])
      .join(" ");
  }