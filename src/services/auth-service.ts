
import React from "react";

export const baseUrl = `https://chillmode-backend.onrender.com/api/v1`;

async function register(body: any) {
  const res = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }
  return json;
}


async function login(body: any) {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    throw json;
  }
 return  json;
}

export const Auth = { register, login };

// export class Auth {
//   static register(params: RegisterRequest) {}
// }
