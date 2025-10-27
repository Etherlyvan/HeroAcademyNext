// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth-helper";

export const { GET, POST } = handlers;

export const runtime = 'nodejs';