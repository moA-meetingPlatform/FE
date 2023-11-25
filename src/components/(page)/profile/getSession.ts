// import { options } from '@/app/api/auth/[...nextauth]/options';
// import { ProfileResDataType } from '@/types/ProfileResDataType';
// import { getServerSession } from 'next-auth';
// import React from 'react'


// const getSession = async () => {
//   const session = await getServerSession(options)
//   const url =`https://moa-backend.duckdns.org/api/v1/user/profile/${session?.user.userUuid}`
//   const profile = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${session?.user.token}`,
//     },
//   });
//   if (!profile.ok) {
//     throw new Error(await profile.message())
//   }
//   return profile.json() as Promise<ProfileResDataType>
// }