const query = `query globalData {
  feature {
    questionTranslation
    subscription
    signUp
    discuss
    mockInterview
    contest
    store
    book
    chinaProblemDiscuss
    socialProviders
    studentFooter
    enableChannels
    dangerZone
    cnJobs
    cnAddons
    __typename
  }
  userStatus {
    isSignedIn
    isAdmin
    isStaff
    isSuperuser
    isTranslator
    isPremium
    isVerified
    checkedInToday
    username
    realName
    userSlug
    avatar
    optedIn
    requestRegion
    region
    activeSessionId
    permissions
    notificationStatus {
      lastModified
      numUnread
      __typename
    }
    completedFeatureGuides
    __typename
  }
}
`

export const fetchGlobalData = () =>
  fetch('/graphql', {
    body: JSON.stringify({
      query,
      variables: null,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
