export function photosWithUserData() {
  return [
    {
      $lookup: {
        from: 'users',
        localField: 'userEmail',
        foreignField: 'loginData.email',
        as: 'user',
      },
    },
    {
      $unwind: {
        path: '$user',
      },
    },
    {
      $addFields: {
        userFullName: {
          $concat: [
            {
              $ifNull: [
                '$user.clientData.firstName',
                '$user.masterData.firstName',
              ],
            },
            ' ',
            {
              $ifNull: [
                '$user.clientData.lastName',
                '$user.masterData.lastName',
              ],
            },
          ],
        },
        userProfilePhoto: {
          $ifNull: [
            '$user.clientData.profilePhoto',
            '$user.masterData.profilePhoto',
          ],
        },
      },
    },
    {
      $project: {
        user: 0,
      },
    },
  ];
}
