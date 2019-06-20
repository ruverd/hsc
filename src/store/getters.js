const getters = {
   statusUser: state => {
      return state.auth.user.status;
   },
   userProfile: state => state.auth.user.profile,
   activeNotification: state => state.navbar.notification,
   activeSearch: state => state.navbar.search,
   activeBackground: state => state.navbar.background,
  // name: state => state.user.info.name,
  // profile: state => state.user.profile
}
export default getters
