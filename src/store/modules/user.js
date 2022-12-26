
const state = {
  token: "",
  companyId: -1,
  llsIdentify: "",
  userId: -1,
  name: "",
  organName: ""
}

const mutations = {
  // 设置 token
  SET_TOKEN(state, value){
    state.token = value;
    localStorage.setItem("token", value);
  },
  // 设置 公司ID
  SET_COMPANY_ID(state, value){
    state.companyId = value;
    localStorage.setItem("companyId", value);
  },
  // 设置身份
  SET_IDENTIFY(state, value){
    state.llsIdentify = value;
    localStorage.setItem("identify", value);
  },
  // 设置 userId
  SET_USER_ID(state, value){
    state.userId = value;
    localStorage.setItem("userId", value);
  },
  // 设置 name
  SET_NAME(state, value){
    state.name = value;
    localStorage.setItem("lls_name", value);
  },
  // 设置 organName
  SET_ORGAN_NAME(state, value){
    state.organName = value;
    localStorage.setItem("organName", value);
  }
}

const actions = {
  setToken(context, value){
    context.commit("SET_TOKEN", value);
  },
  setCompanyId(context, value){
    context.commit("SET_COMPANY_ID", value);
  },
  setUserId(context, value){
    context.commit("SET_USER_ID", value);
  },
  setIdentify(context, value){
    context.commit("SET_IDENTIFY", value);
  },
  setName(context, value){
    context.commit("SET_NAME", value);
  },
  setOrganName(context, value){
    context.commit("SET_ORGAN_NAME", value);
  }
}

const getters = {
  getToken: state => {
    let tokenRes = ""
    if (state.token !== "".trim())
      tokenRes = state.token
    else {
      tokenRes = localStorage.getItem("token")
      state.token = tokenRes
    }
    return tokenRes
  },

  getCompanyId: state => {
    let cId = -1
    if (state.companyId !== -1)
      cId = state.companyId
    else {
      cId = +localStorage.getItem("companyId")
      state.companyId = cId
    }
    // console.log("cId = ", cId)
    return cId
  },

  getIdentify: state => {
    let llsIdentifyRes = ""
    if (state.llsIdentify !== "".trim())
      llsIdentifyRes = state.llsIdentify
    else {
      llsIdentifyRes = localStorage.getItem("identify")
      state.llsIdentify = llsIdentifyRes
    }
    return llsIdentifyRes
  },

  getUserId: state => {
    let uId = -1
    if (state.userId !== -1)
      uId = state.userId
    else {
      uId = +localStorage.getItem("userId")
      state.userId = uId
    }
    // console.log("uId = ", uId)
    return uId
  },

  getName: state => {
    let uN = ""
    if (state.name !== "".trim()){
      uN = state.name
    }
    else {
      uN = localStorage.getItem("lls_name")
      state.name = uN
    }
    return uN
  },

  getOrganName: state => {
    let uN = ""
    if (state.organName !== "".trim()){
      uN = state.organName
    }
    else {
      uN = localStorage.getItem("organName")
      state.organName = uN
    }
    return uN
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}


