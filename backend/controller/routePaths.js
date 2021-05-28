module.exports = {
  //auth
  LOGIN: '/login',
  REGISTER: '/register',
  //event note
  GET_EVENT_NOTES: '/eventnote/list',
  GET_EVENT_NOTE_DETAIL: '/eventnote/detail',
  CREATE_EVENT_NOTE: '/eventnote/create',
  UPDATE_EVENT_NOTE: '/eventnote/update',
  DELETE_EVENT_NOTE: '/eventnote/delete/',
  //admin
  SEARCH_USER: '/user/search',
  SEARCH_ROLE: '/role/search',
  SEARCH_PERMISSION: '/permission/search',
  UPDATE_USER: '/user/update',
  ADD_OR_UPDATE_ROLE: '/role/update',
  //novals
  GET_NOVAL: '/noval/get/:id',
  SEARCH_NOVALS: '/noval/search',
  ADD_NOVAL: '/noval/add',
  UPDATE_NOVAL: '/noval/update',
  //crawler
  CRAWL_FULL_SITE: '/crawl/full-site',
  CRAWL_CHAPTER: '/crawl/chapter',
  CRAWL_NOVAL: '/crawl/noval',
  CRAWL_ALL_NEW_CHAPTER: '/crawl/all-chapter',
  CRAWL_SUMMARY: '/crawl/summary-site'
}