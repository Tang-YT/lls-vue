import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  menuList: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },

  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },

  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },

  // 设置 menuList
  SET_MENU_LIST(state, value){
    state.menuList = value;
    localStorage.setItem("menuList", JSON.stringify(value));
  }
}

const actions = {
  ToggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },

  setMenuList(context, value){
    context.commit("SET_MENU_LIST", value);
  },

  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
}
}

const getters = {
  getMenuList: state => {
    let mlRes = null
    if (state.menuList && state.menuList !== 'undefined' && state.menuList.length > 0)
      mlRes = state.menuList
    else {
      mlRes = JSON.parse(localStorage.getItem("menuList"))
      state.menuList = mlRes
    }
    return mlRes
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
