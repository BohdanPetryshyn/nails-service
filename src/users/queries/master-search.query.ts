import { ServiceType } from '../entities/service-type';
import { MasterSearchResult } from '../entities/master-search-result';
import { City } from '../entities/city';

export function masterSearchAggregation(services: ServiceType[], city: City) {
  return [
    {
      $match: {
        'masterData.city': city,
      },
    },
    {
      $addFields: {
        availableServices: {
          $filter: {
            input: '$masterData.services',
            as: 'service',
            cond: {
              $in: ['$$service.serviceType', services],
            },
          },
        },
      },
    },
    {
      $match: {
        availableServices: {
          $ne: [],
        },
      },
    },
    {
      $project: {
        duration: {
          $sum: '$availableServices.duration',
        },
        price: {
          $sum: '$availableServices.price',
        },
        masterEmail: '$loginData.email',
        profilePhoto: '$masterData.profilePhoto',
        fullName: {
          $concat: ['$masterData.firstName', ' ', '$masterData.lastName'],
        },
        address: '$masterData.address',
        availableServices: {
          $map: {
            input: '$availableServices',
            as: 'service',
            in: '$$service.serviceType',
          },
        },
        workingHours: '$masterData.workingHours',
      },
    },
    {
      $lookup: {
        from: 'appointments',
        localField: 'masterEmail',
        foreignField: 'masterEmail',
        as: 'appointments',
      },
    },
    {
      $addFields: {
        appointments: {
          $map: {
            input: '$appointments',
            as: 'appointment',
            in: {
              from: '$$appointment.from',
              to: {
                $add: [
                  '$$appointment.from',
                  {
                    $multiply: [
                      {
                        $sum: '$$appointment.services.duration',
                      },
                      60000,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ];
}
