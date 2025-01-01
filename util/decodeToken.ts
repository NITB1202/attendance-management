import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decodedToken: any = jwtDecode(token);
    return {
      id: decodedToken.sub || "",
      role: decodedToken.role?.[0]?.authority || "",
      exp: decodedToken.exp,
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
