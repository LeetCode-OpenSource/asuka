extern crate js_sys;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
extern crate wasm_bindgen;
extern crate wee_alloc;

use std::fmt::Debug;

use serde_json::{from_slice, to_string};
use wasm_bindgen::prelude::*;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub enum FeatureTypename {
  #[serde(rename = "FeatureNode")]
  FeatureNode,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub enum FeatureGuideType {
  #[serde(rename = "OTHER")]
  Other,

  #[serde(rename = "QUESTION_DETAIL_TOUR")]
  QuestionDetailTour,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub enum NotificationStatusTypename {
  #[serde(rename = "NotificationStatus")]
  NotificationStatus,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub enum UserStatusTypename {
  #[serde(rename = "MeNode")]
  MeNode,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub enum Permission {
  #[serde(rename = "authentication_ignore_beta_user_flow")]
  AuthenticationIgnoreBetaUserFlow,

  #[serde(rename = "authentication_see_user_email")]
  AuthenticationSeeUserEmail,

  #[serde(rename = "authentication_see_user_id")]
  AuthenticationSeeUserId,

  #[serde(rename = "columns_add_article")]
  ColumnsAddArticle,

  #[serde(rename = "columns_change_article")]
  ColumnsChangeArticle,

  #[serde(rename = "columns_delete_article")]
  ColumnsDeleteArticle,

  #[serde(rename = "columns_pick_article")]
  ColumnsPickArticle,

  #[serde(rename = "columns_review_article")]
  ColumnsReviewArticle,

  #[serde(rename = "columns_see_columns")]
  ColumnsSeeColumns,

  #[serde(rename = "contest_private_access_dashboard")]
  ContestPrivateAccessDashboard,

  #[serde(rename = "contest_see_private")]
  ContestSeePrivate,

  #[serde(rename = "discuss_change_contest_post")]
  DiscussChangeContestPost,

  #[serde(rename = "discuss_change_post")]
  DiscussChangePost,

  #[serde(rename = "discuss_delete_contest_post")]
  DiscussDeleteContestPost,

  #[serde(rename = "discuss_delete_post")]
  DiscussDeletePost,

  #[serde(rename = "discuss_pin_contest_topic")]
  DiscussPinContestTopic,

  #[serde(rename = "discuss_pin_topic")]
  DiscussPinTopic,

  #[serde(rename = "discuss_review_contest_post")]
  DiscussReviewContestPost,

  #[serde(rename = "discuss_review_post")]
  DiscussReviewPost,

  #[serde(rename = "discuss_see_contest_hiden_post")]
  DiscussSeeContestHidenPost,

  #[serde(rename = "discuss_see_hiden_post")]
  DiscussSeeHidenPost,

  #[serde(rename = "library_change_question")]
  LibraryChangeQuestion,

  #[serde(rename = "library_see_all_fields")]
  LibrarySeeAllFields,

  #[serde(rename = "library_see_all_problems")]
  LibrarySeeAllProblems,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Response {
  data: GlobalResp,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct UserStatus {
  #[serde(rename = "__typename")]
  typename: UserStatusTypename,

  #[serde(rename = "activeSessionId")]
  active_session_id: String,

  #[serde(rename = "avatar")]
  avatar: String,

  #[serde(rename = "checkedInToday")]
  pub checked_in_today: bool,

  #[serde(rename = "completedFeatureGuides")]
  completed_feature_guides: Vec<FeatureGuideType>,

  #[serde(rename = "isAdmin")]
  pub is_admin: bool,

  #[serde(rename = "isPremium")]
  pub is_premium: bool,

  #[serde(rename = "isSignedIn")]
  pub is_signed_in: bool,

  #[serde(rename = "isStaff")]
  pub is_staff: bool,

  #[serde(rename = "isSuperuser")]
  pub is_superuser: bool,

  #[serde(rename = "isTranslator")]
  pub is_translator: bool,

  #[serde(rename = "isVerified")]
  pub is_verified: bool,

  #[serde(rename = "notificationStatus")]
  notification_status: FluffyNotificationStatus,

  #[serde(rename = "optedIn")]
  pub opted_in: bool,

  #[serde(rename = "permissions")]
  permissions: Vec<Permission>,

  #[serde(rename = "realName")]
  real_name: String,

  #[serde(rename = "region")]
  region: String,

  #[serde(rename = "requestRegion")]
  request_region: String,

  #[serde(rename = "username")]
  username: String,

  #[serde(rename = "userSlug")]
  user_slug: String,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct FluffyNotificationStatus {
  #[serde(rename = "__typename")]
  typename: NotificationStatusTypename,

  #[serde(rename = "lastModified")]
  last_modified: String,

  #[serde(rename = "numUnread")]
  pub num_unread: f64,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct GlobalResp {
  #[serde(rename = "userStatus")]
  user_status: UserStatus,
  feature: Feature,
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Feature {
  #[serde(rename = "__typename")]
  typename: FeatureTypename,

  #[serde(rename = "book")]
  pub book: bool,

  #[serde(rename = "chinaProblemDiscuss")]
  pub china_problem_discuss: bool,

  #[serde(rename = "cnJobs")]
  pub cn_jobs: bool,

  #[serde(rename = "contest")]
  pub contest: bool,

  #[serde(rename = "discuss")]
  pub discuss: bool,

  #[serde(rename = "mockInterview")]
  pub mock_interview: bool,

  #[serde(rename = "questionTranslation")]
  pub question_translation: bool,

  #[serde(rename = "signUp")]
  pub sign_up: bool,

  #[serde(rename = "socialProviders")]
  social_providers: String,

  #[serde(rename = "store")]
  pub store: bool,

  #[serde(rename = "studentFooter")]
  pub student_footer: bool,

  #[serde(rename = "subscription")]
  pub subscription: bool,
}

#[inline]
fn unwrap_abort<T>(o: Option<T>) -> T {
  use std::process;
  match o {
    Some(t) => t,
    None => process::abort(),
  }
}

#[inline]
fn unwrap_result_abort<T, E: Debug>(o: Result<T, E>) -> T {
  use std::process;
  match o {
    Ok(t) => t,
    Err(_e) => process::abort(),
  }
}

#[wasm_bindgen]
pub fn parse(v: Box<[u8]>) -> Response {
  unwrap_result_abort(from_slice(v.as_ref()))
}

#[wasm_bindgen]
pub fn stringify(v: &Response) -> String {
  unwrap_result_abort(to_string(v))
}
