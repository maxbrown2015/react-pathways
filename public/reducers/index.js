import _ from 'lodash';
import axios from 'axios';


const mainReducer = (state, action) => {
  switch (action.type) {
     case 'NETWORK_SELECT': {
       console.log(action.selected);
       // console.log(_.assign({}, state, {connected: action.connected, selected: action.selected}))
       return _.assign({}, state, {selected: action.selected, selectionUpdateOptions: {
         networkSelect: true, catalogSelect: false, legenedSelect: false, searchSelect: false}});
     }

     case 'CATALOG_SELECT': {
      console.log(action.selected);
      // console.log(_.assign({}, state, {connected: action.connected, selected: action.selected}))
      return _.assign({}, state, {selected: action.selected, selectionUpdateOptions: {
        networkSelect: false, catalogSelect: true, legendSelect: false, searchSelect: false}});
    }

    case 'SEARCH_SELECT': {
      console.log(action.selected);
      return _.assign({}, state, {selected: action.selected, selectionUpdateOptions: {
    networkSelect: false, catalogSelect: false, legendSelect: false, searchSelect: true}});
    }

     case 'BUILD_CATALOG': {
      return _.assign({}, state, {connected: action.connected});
     }

     case 'LEGEND_SELECT': {
      return _.assign({}, state, {activePathways: [action.pathway], selectionUpdateOptions: {
        networkSelect: false, catalogSelect: false, legendSelect: true, searchSelect: false}});
     }

     case 'SET_ACTIVE_PATHWAYS': {
      console.log(action.activePathways);
      return _.assign({}, state, {activePathways: action.activePathways});
     }
     
     case 'RESET_SELECTION_OPTIONS': {
      return _.assign({}, state, {selectionUpdateOptions: {
        networkSelect: false, catalogSelect:false, legendSelect: false, searchSelect: false
      }});
     }
  }
  return state;
};

export {mainReducer};
