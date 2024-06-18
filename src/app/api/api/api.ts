export * from './identity.service';
import { IdentityService } from './identity.service';
export * from './members.service';
import { MembersService } from './members.service';
export const APIS = [IdentityService, MembersService];
