export interface Room {
  adults: number;
  seniors: number;
  children: number;
}

export function distribute(
  rooms: number,
  adults: number,
  seniors: number,
  children: number
): Room[] {
  const total = adults + seniors + children;
  const capacity = rooms * 4;

  if (total > capacity) return [];
  if (total < rooms) return [];

  const result: Room[] = Array.from({ length: rooms }, () => ({
    adults: 0,
    seniors: 0,
    children: 0,
  }));

  let roomIndex = 0;

  while (seniors >= 4 && roomIndex < rooms) {
    result[roomIndex].seniors = 4;
    seniors -= 4;
    roomIndex++;
  }
  while (seniors > 0 && roomIndex < rooms) {
    const take = Math.min(4, seniors);
    result[roomIndex].seniors = take;
    seniors -= take;
    roomIndex++;
  }

  while (children > 0) {
    let r = result.find((room) => room.adults + room.seniors + room.children < 4);
    if (!r) break;

    if (adults > 0) {
      r.adults++;
      r.children++;
      adults--;
      children--;
    } else if (r.seniors > 0) {
      r.children++;
      children--;
    } else if (seniors > 0) {
      r.seniors++;
      r.children++;
      seniors--;
      children--;
    } else {
      return [];
    }
  }

  while (adults > 0) {
    let r = result.find((room) => room.adults + room.seniors + room.children < 4);
    if (!r) break;
    const space = 4 - (r.adults + r.seniors + r.children);
    const take = Math.min(space, adults);
    r.adults += take;
    adults -= take;
  }

  while (seniors > 0) {
    let r = result.find((room) => room.adults + room.seniors + room.children < 4);
    if (!r) break;
    const space = 4 - (r.adults + r.seniors + r.children);
    const take = Math.min(space, seniors);
    r.seniors += take;
    seniors -= take;
  }

  for (let i = 0; i < result.length; i++) {
    const count = result[i].adults + result[i].seniors + result[i].children;
    if (count === 0) {
      const donor = result.find((room) => room.adults + room.seniors + room.children > 1);
      if (!donor) return [];
      if (donor.adults > 0) {
        donor.adults--;
        result[i].adults++;
      } else {
        donor.seniors--;
        result[i].seniors++;
      }
    }
  }

  result.sort((a, b) => {
    if (b.adults !== a.adults) return b.adults - a.adults;
    if (b.seniors !== a.seniors) return b.seniors - a.seniors;
    return b.children - a.children;
  });

  return result;
}
