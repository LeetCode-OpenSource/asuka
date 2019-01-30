export type Maybe<T> = T | null

// ====================================================
// Documents
// ====================================================

export namespace GlobalData {
  export interface Variables {}

  export interface Query {
    readonly __typename?: 'Query'

    readonly feature: Maybe<Feature>

    readonly userStatus: Maybe<UserStatus>
  }

  export interface Feature {
    readonly __typename: 'FeatureNode'

    readonly questionTranslation: boolean

    readonly subscription: boolean

    readonly signUp: boolean

    readonly discuss: boolean

    readonly mockInterview: boolean

    readonly contest: boolean

    readonly store: boolean

    readonly book: boolean

    readonly chinaProblemDiscuss: boolean

    readonly socialProviders: string

    readonly studentFooter: boolean

    readonly enableChannels: boolean

    readonly dangerZone: boolean

    readonly cnJobs: boolean

    readonly cnAddons: boolean
  }

  export interface UserStatus {
    readonly __typename: 'MeNode'

    readonly isSignedIn: boolean

    readonly isAdmin: boolean

    readonly isStaff: boolean

    readonly isSuperuser: boolean

    readonly isTranslator: boolean

    readonly isPremium: boolean

    readonly isVerified: boolean

    readonly checkedInToday: boolean

    readonly username: string

    readonly realName: string

    readonly userSlug: string

    readonly avatar: string

    readonly optedIn: boolean

    readonly requestRegion: string

    readonly region: string

    readonly activeSessionId: string

    readonly permissions: ReadonlyArray<Maybe<string>>

    readonly notificationStatus: Maybe<NotificationStatus>

    readonly completedFeatureGuides: ReadonlyArray<Maybe<string>>
  }

  export interface NotificationStatus {
    readonly __typename: 'NotificationStatus'

    readonly lastModified: string

    readonly numUnread: number
  }
}

// hi!
