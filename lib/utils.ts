import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import ms from "ms";

import { env } from "@/env.mjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}


// Utils from precedent.dev

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const mapping = { "asst_cNad0b2mQe1bvj3HAMPgrld3" : { 
  'logo' : "/images/video-creator-logo.png",
  'description' : 'I can help you creating videos', 
  "name" : "Video Creator"},
"asst_zefiro" : { 'logo' : "/images/zefiro_small.png", 
                  'description' : "I m an open source model that speack Italian", 
                  "name" : "Maestrale"},
"ci" : { 'logo' : "/images/zefiro_small.png", 
                  'description' : "I m an open source model that speack Italian", 
                  "name" : "Maestrale"},
"asst_p7n265weAL7Wv0aKNscuP25q" : { 
  'logo' : "/images/chart-creator-logo.png",
  'description' : 'I can read data and provide insides and charts', 
  "name" : "Chart Creator"},  
"asst_YxvBcmhcuMPEHdyh8Vesdj4I" :  {
  'logo' : "/images/hoodie_creator_logo_small.png",
  'description' : 'I can help you creating personalized hoodies',
  "name" : "Hoodie Creator"}  
}