import { getAuthToken } from './storage';
import { Role } from '../types/role';

const RoleType = {
  Role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
} as const;

const getRolesFromToken = (): string[] => {
  const token = getAuthToken();
  if (!token) return [];
  const [, payloadB64] = token.split('.');
  try {
    const json = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));

    const role = json[RoleType.Role];
    if (!role) return [];
    return [role];
  } catch {
    return [];
  }
}

export const isAdmin = (): boolean => {
  const roles = getRolesFromToken();
  if (roles.length === 0) return false;
  return roles.includes(Role.Admin);
}
