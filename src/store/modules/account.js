// import  {authService}  from 'src/services/auth';

// const user = JSON.parse(localStorage.getItem('user'));
// const state = user
//     ? { status: { loggedIn: true }, user }
//     : { status: {}, user: null };

// const actions = {
//     login({ dispatch, commit }, { email, password }) {

//         commit('loginRequest', { email });

//         authService.login(email, password)
//             .then(
//                 user => {
//                     console.log('user')
//                     commit('loginSuccess', user);
//                     router.push('/');
//                 },
//                 error => {
//                     console.log(error.response.data)
//                     commit('loginFailure', error);
//                     dispatch('alert/error', error, { root: true });
//                 }
//             );
//     },
//     logout({ commit }) {
//         authService.logout();
//         commit('logout');
//     },
//     register({ dispatch, commit }, user) {
//         commit('registerRequest', user);

//         authService.register(user)
//             .then(
//                 user => {
//                     commit('registerSuccess', user);
//                     router.push('/login');
//                     setTimeout(() => {
//                         // display success message after route change completes
//                         dispatch('alert/success', 'Registration successful', { root: true });
//                     })
//                 }
//             )
//             .catch((error) => {
//               console.log('errooo')
//               commit('registerFailure', error);
//               dispatch('alert/error', error, { root: true });
//             });
//     }
// };

// const mutations = {
//     loginRequest(state, user) {
//         state.status = { loggingIn: true };
//         state.user = user;
//     },
//     loginSuccess(state, user) {
//         state.status = { loggedIn: true };
//         state.user = user;
//     },
//     loginFailure(state) {
//         state.status = {};
//         state.user = null;
//     },
//     logout(state) {
//         state.status = {};
//         state.user = null;
//     },
//     registerRequest(state, user) {
//         state.status = { registering: true };
//     },
//     registerSuccess(state, user) {
//         state.status = {};
//     },
//     registerFailure(state, error) {
//         state.status = {};
//     }
// };

// export const account = {
//     namespaced: true,
//     state,
//     actions,
//     mutations
// };
