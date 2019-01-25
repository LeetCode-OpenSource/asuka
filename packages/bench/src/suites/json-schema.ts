export const jsonSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        feature: {
          type: 'object',
          properties: {
            questionTranslation: {
              type: 'boolean',
            },
            subscription: {
              type: 'boolean',
            },
            signUp: {
              type: 'boolean',
            },
            discuss: {
              type: 'boolean',
            },
            mockInterview: {
              type: 'boolean',
            },
            contest: {
              type: 'boolean',
            },
            store: {
              type: 'boolean',
            },
            book: {
              type: 'boolean',
            },
            chinaProblemDiscuss: {
              type: 'boolean',
            },
            socialProviders: {
              type: 'string',
            },
            studentFooter: {
              type: 'boolean',
            },
            enableChannels: {
              type: 'boolean',
            },
            dangerZone: {
              type: 'boolean',
            },
            cnJobs: {
              type: 'boolean',
            },
            cnAddons: {
              type: 'boolean',
            },
            __typename: {
              type: 'string',
            },
          },
          required: [
            '__typename',
            'book',
            'chinaProblemDiscuss',
            'cnAddons',
            'cnJobs',
            'contest',
            'dangerZone',
            'discuss',
            'enableChannels',
            'mockInterview',
            'questionTranslation',
            'signUp',
            'socialProviders',
            'store',
            'studentFooter',
            'subscription',
          ],
        },
        userStatus: {
          type: 'object',
          properties: {
            isSignedIn: {
              type: 'boolean',
            },
            isAdmin: {
              type: 'boolean',
            },
            isStaff: {
              type: 'boolean',
            },
            isSuperuser: {
              type: 'boolean',
            },
            isTranslator: {
              type: 'boolean',
            },
            isPremium: {
              type: 'boolean',
            },
            isVerified: {
              type: 'boolean',
            },
            checkedInToday: {
              type: 'boolean',
            },
            username: {
              type: 'string',
            },
            realName: {
              type: 'string',
            },
            userSlug: {
              type: 'string',
            },
            avatar: {
              type: 'string',
            },
            optedIn: {
              type: 'boolean',
            },
            requestRegion: {
              type: 'string',
            },
            region: {
              type: 'string',
            },
            activeSessionId: {
              type: 'string',
            },
            permissions: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            notificationStatus: {
              type: 'object',
              properties: {
                lastModified: {
                  type: 'string',
                },
                numUnread: {
                  type: 'integer',
                },
                __typename: {
                  type: 'string',
                },
              },
              required: ['__typename', 'lastModified', 'numUnread'],
            },
            completedFeatureGuides: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            __typename: {
              type: 'string',
            },
          },
          required: [
            '__typename',
            'activeSessionId',
            'avatar',
            'checkedInToday',
            'completedFeatureGuides',
            'isAdmin',
            'isPremium',
            'isSignedIn',
            'isStaff',
            'isSuperuser',
            'isTranslator',
            'isVerified',
            'notificationStatus',
            'optedIn',
            'permissions',
            'realName',
            'region',
            'requestRegion',
            'userSlug',
            'username',
          ],
          title: 'UserStatus',
        },
      },
    },
  },
}
