import Vue from "vue";
const viewManage = {
  namespaced: true,
  state: {
    scene: null,
    viewimge: "",
  },
  getters: {
    curView:(state)=>{
      return state.scene.view;
    }
  },
  mutations: {
    setScene(state, scene) {
      state.scene = Object.assign({}, scene);
    },
    setView(state, view) {
      if(state.scene.view){
        state.scene.view = [{$:Object.assign(state.scene.view[0].$, view)}];
      }
    },
    setViewImage(state, viewimgeBase64) {
      state.viewimge = viewimgeBase64;
    },
    updateHotSpot(state, hotspot) {
      if (state.scene.hotspot) {
        let index = state.scene.hotspot.findIndex((item) => {
          return item.$.name === hotspot.name;
        });
        state.scene.hotspot.splice(
          index < 0 ? state.scene.hotspot.length : index,
          1,
          { $: hotspot }
        );
      } else {
        //重新设置监听
        Vue.set(state.scene, "hotspot", []);
        state.scene.hotspot = [{ $: hotspot }];
      }
    },
    // updateView(state, view) {
    //    if(state.scene.view){

    //    }
    // },
    delHotSpot(state, hotspot) {
      debugger
      if (state.scene.hotspot) {
        let index = state.scene.hotspot.findIndex((item) => {
          return item.$.name === hotspot.name;
        });
        state.scene.hotspot.splice(index, 1);
      }
    }
  },
  actions: {
    setScene({ commit }, scene) {
      commit("setScene", scene);
    },
    // 设置初始视角，传入参数view
    setView({ commit }, view) {
      commit("setView", view);
    },
    setOtherView({ commit,rootGetters}, {view,targetScenes}) {
      let selectedPanoCofing = rootGetters["sceneManage/selectedPanoCofing"];
      if(selectedPanoCofing){
        let scenes = selectedPanoCofing.xmlOBj.krpano.scene;
        if(targetScenes&&targetScenes.length>0){
            targetScenes.forEach((item)=>{
               let selectScene =  scenes.find(PanoScene=>{
                  return PanoScene.$.name === item.name;
                })
                if(selectScene){
                  selectScene.view = [{$:Object.assign(selectScene.view[0].$, view)}];
                }else{
                  console.warn(item.name+`场景不存在`);
                }
            })
         }

      }
    },
    setViewImage({ commit }, viewimgeBase64) {
      commit("setViewImage", viewimgeBase64);
    },
  },
};

export default viewManage;
