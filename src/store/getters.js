const getters = {
  statusUser: state => {
    return state.auth.user.status;
  },
  logged: state => state.auth.user.logged,
  userProfile: state => state.auth.user.profile_id,
  userName: state => state.auth.user.name,
  userLogged: state => state.auth.user,
  registerComment: state => state.auth.user.comment,
  activeNotification: state => state.navbar.notification,
  activeSearch: state => state.navbar.search,
  activeBackground: state => state.navbar.background
};

export default getters;
