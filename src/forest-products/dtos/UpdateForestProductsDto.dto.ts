import { Prisma } from '@prisma/client';

export class UpdateForestProductsDto {
  ownerName?: string;
  ownerPhone?: string;
  ownerEmail?: string;
  ownerIdentity?: string;
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
  guestIdentity?: string;
  ownerAddress?: Prisma.AddressCreateNestedOneWithoutOwnerAddressesInput;
  guestAddress?: Prisma.AddressCreateNestedOneWithoutOwnerAddressesInput;
}
