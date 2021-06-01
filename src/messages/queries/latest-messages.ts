export function latestMessagesByEmail(email: string) {
  return [
    {
      $group: {
        _id: {
          $cond: {
            if: {
              $eq: ['$toEmail', email],
            },
            then: '$fromEmail',
            else: '$toEmail',
          },
        },
        id: {
          $last: '$_id',
        },
        text: {
          $last: '$text',
        },
        toEmail: {
          $last: '$toEmail',
        },
        fromEmail: {
          $last: '$fromEmail',
        },
        sentAt: {
          $last: '$sentAt',
        },
      },
    },
    {
      $addFields: {
        _id: '$id',
      },
    },
  ];
}
