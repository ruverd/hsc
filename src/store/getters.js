const getters = {
   statusUser: state => {
      return state.auth.user.status;
   },
   logged: state => state.auth.user.logged,
   userProfile: state => state.auth.user.profile_id,
   userName: state => state.auth.user.name,
   activeNotification: state => state.navbar.notification,
   activeSearch: state => state.navbar.search,
   activeBackground: state => state.navbar.background,
  // name: state => state.user.info.name,
  // profile: state => state.user.profile
}
export default getters
